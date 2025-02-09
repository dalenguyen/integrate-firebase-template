import * as React from 'react'
import {
  Html,
  Text,
  Button,
  Section,
} from '@react-email/components'

interface EmailTemplateProps {
  verificationLink: string
  userEmail: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  verificationLink,
  userEmail,
}) => (
  <Html lang="en">
    <Section style={container}>
      <Text style={heading}>Email Verification</Text>
      <Text style={paragraph}>Hi {userEmail},</Text>
      <Text style={paragraph}>
        Please verify your email address by clicking the button below:
      </Text>
      <Button style={button} href={verificationLink}>
        Verify Email
      </Button>
      <Text style={paragraph}>
        If you didn't request this verification, you can safely ignore this
        email.
      </Text>
    </Section>
  </Html>
)

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const heading: React.CSSProperties = {
  fontSize: '32px',
  lineHeight: 1.3,
  fontWeight: 700,
  color: '#484848',
}

const paragraph: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: 1.4,
  color: '#484848',
}

const button: React.CSSProperties = {
  backgroundColor: '#5469d4',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  marginTop: '16px',
  padding: '12px 20px',
} 