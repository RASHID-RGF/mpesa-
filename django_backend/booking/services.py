import requests
import base64
from datetime import datetime
from django.conf import settings


class MpesaService:
    """M-Pesa Lipa na M-Pesa service"""

    @staticmethod
    def get_base_url():
        """Get M-Pesa API base URL based on environment"""
        if settings.MPESA_ENVIRONMENT == 'production':
            return 'https://api.safaricom.co.ke'
        return 'https://sandbox.safaricom.co.ke'

    @staticmethod
    def get_access_token():
        """Get OAuth access token from M-Pesa"""
        url = f"{MpesaService.get_base_url()}/oauth/v1/generate?grant_type=client_credentials"

        auth = base64.b64encode(
            f"{settings.MPESA_CONSUMER_KEY}:{settings.MPESA_CONSUMER_SECRET}".encode()
        ).decode()

        headers = {
            'Authorization': f'Basic {auth}',
            'Content-Type': 'application/json'
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        return response.json()['access_token']

    @staticmethod
    def generate_timestamp():
        """Generate timestamp in YYYYMMDDHHMMSS format"""
        now = datetime.now()
        return now.strftime('%Y%m%d%H%M%S')

    @staticmethod
    def generate_password(timestamp):
        """Generate password for STK Push"""
        str_to_encode = f"{settings.MPESA_BUSINESS_SHORT_CODE}{settings.MPESA_PASSKEY}{timestamp}"
        return base64.b64encode(str_to_encode.encode()).decode()

    @staticmethod
    def format_phone_number(phone):
        """Format phone number to international format (254XXXXXXXXX)"""
        # Remove spaces, dashes, and plus signs
        cleaned = ''.join(c for c in phone if c not in [' ', '-', '+'])

        # If starts with 0, replace with 254
        if cleaned.startswith('0'):
            cleaned = '254' + cleaned[1:]

        # If doesn't start with 254, add it
        if not cleaned.startswith('254'):
            cleaned = '254' + cleaned

        return cleaned

    @staticmethod
    def initiate_stk_push(phone_number, amount, account_reference='Booking Payment', transaction_desc='Payment for booking'):
        """Initiate STK Push (Lipa na M-Pesa Online)"""
        try:
            access_token = MpesaService.get_access_token()
            timestamp = MpesaService.generate_timestamp()
            password = MpesaService.generate_password(timestamp)
            formatted_phone = MpesaService.format_phone_number(phone_number)

            url = f"{MpesaService.get_base_url()}/mpesa/stkpush/v1/processrequest"

            headers = {
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json'
            }

            payload = {
                'BusinessShortCode': settings.MPESA_BUSINESS_SHORT_CODE,
                'Password': password,
                'Timestamp': timestamp,
                'TransactionType': 'CustomerPayBillOnline',
                'Amount': int(amount),
                'PartyA': formatted_phone,
                'PartyB': settings.MPESA_BUSINESS_SHORT_CODE,
                'PhoneNumber': formatted_phone,
                'CallBackURL': settings.MPESA_CALLBACK_URL,
                'AccountReference': account_reference,
                'TransactionDesc': transaction_desc
            }

            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()

            data = response.json()

            # Check if request was successful
            if data.get('ResponseCode') != '0':
                raise Exception(data.get('ResponseDescription', 'Failed to initiate payment'))

            return {
                'success': True,
                'merchant_request_id': data.get('MerchantRequestID'),
                'checkout_request_id': data.get('CheckoutRequestID'),
                'response_code': data.get('ResponseCode'),
                'response_description': data.get('ResponseDescription'),
                'customer_message': data.get('CustomerMessage')
            }

        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    @staticmethod
    def query_transaction_status(checkout_request_id):
        """Query STK Push transaction status"""
        try:
            access_token = MpesaService.get_access_token()
            timestamp = MpesaService.generate_timestamp()
            password = MpesaService.generate_password(timestamp)

            url = f"{MpesaService.get_base_url()}/mpesa/stkpushquery/v1/query"

            headers = {
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json'
            }

            payload = {
                'BusinessShortCode': settings.MPESA_BUSINESS_SHORT_CODE,
                'Password': password,
                'Timestamp': timestamp,
                'CheckoutRequestID': checkout_request_id
            }

            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()

            data = response.json()

            return {
                'success': True,
                'merchant_request_id': data.get('MerchantRequestID'),
                'checkout_request_id': data.get('CheckoutRequestID'),
                'response_code': data.get('ResponseCode'),
                'response_description': data.get('ResponseDescription'),
                'result_code': data.get('ResultCode'),
                'result_desc': data.get('ResultDesc')
            }

        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    @staticmethod
    def process_callback(callback_data):
        """Process M-Pesa callback"""
        try:
            body = callback_data.get('Body', {})
            stk_callback = body.get('stkCallback', {})

            result = {
                'merchant_request_id': stk_callback.get('MerchantRequestID'),
                'checkout_request_id': stk_callback.get('CheckoutRequestID'),
                'result_code': stk_callback.get('ResultCode'),
                'result_desc': stk_callback.get('ResultDesc')
            }

            # If payment was successful, extract metadata
            if stk_callback.get('ResultCode') == 0 and stk_callback.get('CallbackMetadata'):
                metadata = {}
                for item in stk_callback['CallbackMetadata']['Item']:
                    metadata[item['Name']] = item['Value']

                result.update({
                    'amount': metadata.get('Amount'),
                    'mpesa_receipt_number': metadata.get('MpesaReceiptNumber'),
                    'transaction_date': metadata.get('TransactionDate'),
                    'phone_number': metadata.get('PhoneNumber')
                })

            return result

        except Exception as e:
            raise Exception(f'Failed to process callback: {str(e)}')