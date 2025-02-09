import * as admin from 'firebase-admin'
import * as logger from 'firebase-functions/logger'
import { onRequest } from 'firebase-functions/v2/https'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Resend } from 'resend'
import { EmailTemplate } from './templates/verification-email'

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

// Initialize Firebase Admin
admin.initializeApp()

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}
const resend = new Resend(resendApiKey)

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const sendVerificationEmail = onRequest(async (request, response) => {
  try {
    const { email } = request.body

    if (!email) {
      response.status(400).json({ error: 'Email is required' })
      return
    }

    // Check if user exists and is already verified
    const auth = admin.auth()
    try {
      const userRecord = await auth.getUserByEmail(email)
      if (userRecord.emailVerified) {
        response.status(200).json({ message: 'Email is already verified' })
        return
      }
    } catch (error) {
      response.status(404).json({ error: 'User not found' })
      return
    }

    // Generate verification link
    const actionCodeSettings = {
      // The URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: `${process.env.VERIFICATION_REDIRECT_URL || ''}`,
      handleCodeInApp: true, // This must be true
    }

    const verificationLink = await auth.generateEmailVerificationLink(
      email,
      actionCodeSettings
    )

    // Log the verification link for debugging
    logger.info('Generated verification link:', verificationLink)

    // Replace the base URL while keeping all parameters
    const firebaseUrl = new URL(verificationLink)
    const customUrl = new URL(
      firebaseUrl.search, // Use our custom path with Firebase's query parameters
      process.env.CUSTOM_VERIFICATION_BASE_URL ||
        'https://firebase-pro.local/verify-email'
    )

    logger.info('Custom verification URL:', customUrl.toString())

    // Generate email HTML using the template
    const htmlEmail = ReactDOMServer.renderToStaticMarkup(
      React.createElement(EmailTemplate, {
        verificationLink: customUrl.toString(),
        userEmail: email,
      })
    )

    // Send email using Resend
    const data = await resend.emails.send({
      // TODO: change to your email
      from: 'dale@techcater.com',
      to: email,
      subject: 'Verify Your Email',
      html: htmlEmail,
    })

    logger.info('Verification email sent successfully', {
      email,
      messageId: data.data?.id,
    })

    response.status(200).json({
      message: 'Verification email sent successfully',
      messageId: data.data?.id,
    })
  } catch (error) {
    logger.error('Error sending verification email', error)
    response.status(500).json({
      error: 'Error sending verification email',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})
