# Integrate Firebase Template PLugin

Contributors: dalenguyen

Tags: firebase, wordpress

Requires at least: 4.0.0

Tested up to: 5.5

Stable tag: 1.2.0

Requires PHP: 5.2.4

Integrate Firebase Template is an extention that helps to expand [Integrate Firebase PRO](https://techcater.com) plugin.

## Description

If you are an Integrate Firebase PRO user, and want to add more feature to your site, you can utilize this template.

### Links

- [Project page](https://techcater.com/)

## Installation

This extension requires [Integrate Firebase PRO](https://techcater.com) plugin.

If you want to change the name of this extension, you can search for the string `template`, and repalce it with your desired name.

## Email Verification Setup

To enable email verification functionality:

1. Sign up for a [Resend](https://resend.com) account and get your API key
2. Set up your environment variables:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   VERIFICATION_REDIRECT_URL=https://your-wordpress-site.com/my-account # Where to redirect after verification
   CUSTOM_VERIFICATION_BASE_URL=https://your-wordpress-site.com # Your WordPress site domain
   ```
3. Configure Firebase Console:
   - Go to Authentication > Settings > Authorized domains
   - Add your WordPress domain (e.g., your-wordpress-site.com)
4. Create a WordPress page for email verification (e.g., /verify-email)
5. Add the verification HTML to your page:
   ```html
   <div class="email-verification-container">
       <h2>Email Verification</h2>
       <div id="verification-status">Checking verification status...</div>
   </div>
   ```
6. Enqueue the verification script on your verification page
7. Deploy your Firebase functions

The email verification system includes:
- Custom email templates using Resend
- Direct WordPress verification handling (no Firebase redirect)
- Secure verification links with proper URL parameters
- Automatic verification status tracking
- Configurable redirect after verification

### WordPress Integration

The verification process happens directly on your WordPress site:
1. User receives verification email with a direct link to your WordPress site
2. Link includes all necessary Firebase parameters
3. WordPress page handles verification using Firebase SDK
4. On success, user is redirected to VERIFICATION_REDIRECT_URL

#### URL Configuration

The verification system uses two main URLs:
1. `CUSTOM_VERIFICATION_BASE_URL`: Your WordPress site's domain (e.g., https://example.com)
2. `VERIFICATION_REDIRECT_URL`: Where to redirect after successful verification

The verification link will be constructed as:
```
${CUSTOM_VERIFICATION_BASE_URL}/verify-email?oobCode=xxx&mode=verifyEmail&lang=en
```

Example configuration:
```
# Base domain for verification
CUSTOM_VERIFICATION_BASE_URL=https://example.com

# Redirect to account page after verification
VERIFICATION_REDIRECT_URL=https://example.com/my-account
```

Note: Make sure to create a WordPress page at `/verify-email` path to handle the verification process.

The verification handler includes security measures:
- Validates all URLs to prevent open redirects
- Only allows redirects to same domain
- Falls back to default URLs if validation fails

## Examples

- [Trigger custom functions and save data to Firebase (Realtime / Firestore)](js/firebase-trigger-functions.js)
- [Email actions after register / login)](js/email-action-handler.js)
- [Retrieve data from firestore and display it](js/retrieve-from-firestore-and-display.js)
- [Call cloud functions](js/call-cloud-functions.js)
- [Send email verification](js/send-verification-email.js) - Example of triggering email verification for users
- [Handle email verification](js/verify-email.js) - Example of handling verification on WordPress

## [Changelog](/CHANGELOG.md)

## Requests / Issues

Please use [github issues](https://github.com/dalenguyen/integrate-firebase-template/issues) when submitting your logs. Please do not post to the forums.
