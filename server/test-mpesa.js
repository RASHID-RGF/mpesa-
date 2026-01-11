import dotenv from 'dotenv'
import mpesaService from './services/mpesaService.js'

// Load environment variables
dotenv.config()

console.log('=================================================')
console.log('  M-Pesa Configuration Test')
console.log('=================================================\n')

// Check environment variables
console.log('✓ Checking environment variables...\n')

const checks = [
  { name: 'Consumer Key', value: process.env.MPESA_CONSUMER_KEY, required: true },
  { name: 'Consumer Secret', value: process.env.MPESA_CONSUMER_SECRET, required: true },
  { name: 'Business Short Code', value: process.env.MPESA_BUSINESS_SHORT_CODE, required: true },
  { name: 'Passkey', value: process.env.MPESA_PASSKEY, required: true },
  { name: 'Callback URL', value: process.env.MPESA_CALLBACK_URL, required: true },
  { name: 'Environment', value: process.env.MPESA_ENVIRONMENT, required: false }
]

let allPassed = true

checks.forEach(check => {
  const status = check.value ? '✅' : '❌'
  const value = check.value ? (check.value.length > 20 ? check.value.substring(0, 20) + '...' : check.value) : 'NOT SET'
  console.log(`${status} ${check.name}: ${value}`)
  if (check.required && !check.value) {
    allPassed = false
  }
})

if (!allPassed) {
  console.log('\n❌ Configuration incomplete! Please update your .env file.')
  console.log('\nMissing credentials? Get them from:')
  console.log('https://developer.safaricom.co.ke/\n')
  process.exit(1)
}

console.log('\n✅ All required environment variables are set!\n')

// Test M-Pesa authentication
console.log('=================================================')
console.log('  Testing M-Pesa API Authentication')
console.log('=================================================\n')

console.log('⏳ Attempting to get access token...\n')

try {
  const accessToken = await mpesaService.getAccessToken()
  console.log('✅ SUCCESS! M-Pesa authentication working!')
  console.log(`   Token received: ${accessToken.substring(0, 20)}...\n`)
  
  console.log('=================================================')
  console.log('  Configuration Test Complete')
  console.log('=================================================\n')
  console.log('✅ Your M-Pesa integration is properly configured!\n')
  console.log('Next steps:')
  console.log('1. Start ngrok: ngrok http 3000')
  console.log('2. Update MPESA_CALLBACK_URL in .env with ngrok URL')
  console.log('3. Run: npm run dev')
  console.log('4. Test a payment!\n')
  
} catch (error) {
  console.log('❌ FAILED! Could not authenticate with M-Pesa\n')
  console.log('Error:', error.message, '\n')
  console.log('Common issues:')
  console.log('• Wrong Consumer Key or Secret')
  console.log('• App not active on developer portal')
  console.log('• Network connectivity issues')
  console.log('• Using production credentials in sandbox mode\n')
  console.log('Double-check your credentials at:')
  console.log('https://developer.safaricom.co.ke/MyApps\n')
  process.exit(1)
}