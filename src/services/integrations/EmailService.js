import nodemailer from 'nodemailer';
import { Client } from '@microsoft/microsoft-graph-client';

class EmailService {
  constructor() {
    this.graphClient = null;
    this.emailTransporter = null;
  }

  async initialize(credentials) {
    // Initialize Microsoft Graph client for Outlook
    this.graphClient = Client.init({
      authProvider: (done) => {
        done(null, credentials.accessToken);
      }
    });

    // Initialize Gmail SMTP for sending emails
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: credentials.email,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: credentials.refreshToken,
        accessToken: credentials.accessToken,
      },
    });
  }

  async trackEmail(emailId) {
    try {
      const message = await this.graphClient
        .api(`/me/messages/${emailId}`)
        .get();
      return message;
    } catch (error) {
      console.error('Error tracking email:', error);
      throw error;
    }
  }

  async sendFollowUpEmail(to, applicationDetails) {
    const emailContent = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: `Follow-up regarding ${applicationDetails.position} position at ${applicationDetails.company}`,
      text: `Dear Hiring Manager,

I hope this email finds you well. I am writing to follow up on my application for the ${applicationDetails.position} position at ${applicationDetails.company}, which I submitted on ${applicationDetails.applicationDate}.

I remain very interested in this opportunity and would appreciate any updates regarding the status of my application.

Thank you for your time and consideration.

Best regards,
${applicationDetails.candidateName}`,
    };

    try {
      const info = await this.emailTransporter.sendMail(emailContent);
      return info;
    } catch (error) {
      console.error('Error sending follow-up email:', error);
      throw error;
    }
  }

  async getRecentResponses(searchQuery) {
    try {
      const messages = await this.graphClient
        .api('/me/messages')
        .filter(`contains(subject,'${searchQuery}')`)
        .orderby('receivedDateTime desc')
        .top(10)
        .get();
      return messages.value;
    } catch (error) {
      console.error('Error fetching email responses:', error);
      throw error;
    }
  }
}

export default new EmailService();
