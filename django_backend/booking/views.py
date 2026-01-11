from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Destination, Booking, MpesaTransaction
from .services import MpesaService
import json


@api_view(['GET'])
def destination_list(request):
    """Get all destinations"""
    destinations = Destination.objects.all()
    data = []
    for dest in destinations:
        data.append({
            'id': dest.id,
            'name': dest.name,
            'description': dest.description,
            'price': float(dest.price),
            'image': dest.image,
            'location': dest.location,
            'duration': dest.duration,
            'rating': float(dest.rating)
        })
    return Response(data)


@api_view(['GET'])
def destination_detail(request, pk):
    """Get destination details"""
    destination = get_object_or_404(Destination, pk=pk)
    data = {
        'id': destination.id,
        'name': destination.name,
        'description': destination.description,
        'price': float(destination.price),
        'image': destination.image,
        'location': destination.location,
        'duration': destination.duration,
        'rating': float(destination.rating)
    }
    return Response(data)


@api_view(['POST'])
def create_booking(request):
    """Create a new booking"""
    try:
        data = request.data

        # Calculate total amount
        destination = get_object_or_404(Destination, pk=data['destination_id'])
        total_guests = data['adults'] + data['children']
        total_amount = float(destination.price) * total_guests * 1.15  # 15% service fee

        # Create booking
        booking = Booking.objects.create(
            destination=destination,
            customer_name=data['customer_name'],
            customer_email=data['customer_email'],
            customer_phone=data['customer_phone'],
            adults=data['adults'],
            children=data['children'],
            check_in_date=data['check_in_date'],
            check_out_date=data['check_out_date'],
            special_requests=data.get('special_requests', ''),
            payment_method=data['payment_method'],
            total_amount=total_amount,
            status='confirmed' if data.get('transaction_id') else 'pending'
        )

        # Link transaction if provided
        if data.get('transaction_id'):
            try:
                transaction = MpesaTransaction.objects.get(checkout_request_id=data['transaction_id'])
                transaction.booking = booking
                transaction.save()
            except MpesaTransaction.DoesNotExist:
                pass

        return Response({
            'success': True,
            'booking_id': booking.id,
            'reference': f"BK{booking.id:06d}",
            'total_amount': total_amount
        })

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def initiate_mpesa_payment(request):
    """Initiate M-Pesa STK Push payment"""
    try:
        data = request.data
        phone_number = data['phone_number']
        amount = data['amount']
        account_reference = data.get('account_reference', 'Booking Payment')
        transaction_desc = data.get('transaction_desc', 'Payment for booking')

        # Validate input
        if not phone_number or not amount:
            return Response({
                'success': False,
                'error': 'Phone number and amount are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate phone number format
        import re
        phone_regex = r'^(\+254|254|0)[17]\d{8}$'
        if not re.match(phone_regex, phone_number.replace(' ', '')):
            return Response({
                'success': False,
                'error': 'Invalid phone number format. Use format: 0712345678 or 254712345678'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate amount
        if amount < 1 or amount > 150000:
            return Response({
                'success': False,
                'error': 'Amount must be between KSh 1 and KSh 150,000'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Initiate STK Push
        result = MpesaService.initiate_stk_push(
            phone_number,
            amount,
            account_reference,
            transaction_desc
        )

        if result['success']:
            # Save transaction to database
            transaction = MpesaTransaction.objects.create(
                checkout_request_id=result['checkout_request_id'],
                phone_number=phone_number,
                amount=amount,
                account_reference=account_reference,
                transaction_desc=transaction_desc,
                merchant_request_id=result.get('merchant_request_id', ''),
                status='pending'
            )

            return Response(result)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def query_mpesa_transaction(request):
    """Query M-Pesa transaction status"""
    try:
        checkout_request_id = request.data.get('checkout_request_id')

        if not checkout_request_id:
            return Response({
                'success': False,
                'error': 'Checkout request ID is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        result = MpesaService.query_transaction_status(checkout_request_id)

        # Update transaction status in database
        try:
            transaction = MpesaTransaction.objects.get(checkout_request_id=checkout_request_id)
            transaction.result_code = result.get('result_code', '')
            transaction.result_desc = result.get('result_desc', '')

            if result.get('result_code') == '0':
                transaction.status = 'success'
            elif result.get('result_code') == '1032':
                transaction.status = 'cancelled'
            elif result.get('result_code') and result.get('result_code') != '1037':
                transaction.status = 'failed'

            transaction.save()
        except MpesaTransaction.DoesNotExist:
            pass

        return Response(result)

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def mpesa_callback(request):
    """Handle M-Pesa callback"""
    try:
        callback_data = request.data
        result = MpesaService.process_callback(callback_data)

        # Update transaction in database
        try:
            transaction = MpesaTransaction.objects.get(checkout_request_id=result['checkout_request_id'])
            transaction.result_code = result['result_code']
            transaction.result_desc = result['result_desc']

            if result['result_code'] == 0:
                transaction.status = 'success'
                transaction.mpesa_receipt_number = result.get('mpesa_receipt_number', '')
                if result.get('transaction_date'):
                    # Convert transaction date to datetime
                    from datetime import datetime
                    transaction.transaction_date = datetime.strptime(str(result['transaction_date']), '%Y%m%d%H%M%S')
            elif result['result_code'] == 1032:
                transaction.status = 'cancelled'
            else:
                transaction.status = 'failed'

            transaction.save()
        except MpesaTransaction.DoesNotExist:
            pass

        # Acknowledge receipt
        return Response({
            'ResultCode': 0,
            'ResultDesc': 'Accepted'
        })

    except Exception as e:
        return Response({
            'ResultCode': 1,
            'ResultDesc': f'Failed to process callback: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_transaction(request, checkout_request_id):
    """Get transaction details"""
    try:
        transaction = get_object_or_404(MpesaTransaction, checkout_request_id=checkout_request_id)

        data = {
            'success': True,
            'transaction': {
                'merchant_request_id': transaction.merchant_request_id,
                'checkout_request_id': transaction.checkout_request_id,
                'status': transaction.status,
                'phone_number': transaction.phone_number,
                'amount': float(transaction.amount),
                'result_code': transaction.result_code,
                'result_desc': transaction.result_desc,
                'mpesa_receipt_number': transaction.mpesa_receipt_number,
                'transaction_date': transaction.transaction_date.isoformat() if transaction.transaction_date else None,
                'created_at': transaction.created_at.isoformat(),
                'updated_at': transaction.updated_at.isoformat()
            }
        }

        return Response(data)

    except MpesaTransaction.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Transaction not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def health_check(request):
    """API health check"""
    return Response({
        'success': True,
        'message': 'Booking API is running',
        'environment': 'django'
    })
