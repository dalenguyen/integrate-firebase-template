/**
 * Example of triggering email verification for users
 * This code assumes you have already initialized Firebase and have the Integrate Firebase PRO plugin installed
 */

;(function ($) {
  'use strict'

  $(function () {
    console.log('send-verification-email.js loaded')
    // Example usage with a form
    document
      .getElementById('verification-form')
      ?.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = document.getElementById('email-input').value
        const statusElement = document.getElementById('status-message')

        console.log('email', email)

        try {
          statusElement.textContent = 'Sending verification email...'
          const result = await sendVerificationEmail(email)
          statusElement.textContent = result.message
        } catch (error) {
          statusElement.textContent = `Error: ${error.message}`
        }
      })
  })
})(jQuery)

// Function to trigger email verification
async function sendVerificationEmail(email) {
  try {
    // Call the Firebase Function
    const response = await fetch(
      // TODO: change to your region and project
      'http://localhost:5000/integrate-firebase-pro-qa/us-central1/sendVerificationEmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send verification email')
    }

    // Handle success
    console.log('Verification email sent successfully')
    return data
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

// Example HTML structure:
/*
<form id="verification-form">
    <input type="email" id="email-input" required>
    <button type="submit">Send Verification Email</button>
    <div id="status-message"></div>
</form>
*/
