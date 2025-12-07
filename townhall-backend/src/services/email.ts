import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export const emailService = {
  async sendEventRegistrationConfirmation(data: {
    to: string;
    firstName: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
  }): Promise<void> {
    const { to, firstName, eventTitle, eventDate, eventTime, eventLocation } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0064B4; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background: #E1000F; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>You're Registered! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for registering for <strong>${eventTitle}</strong>!</p>
              
              <h3>Event Details:</h3>
              <ul>
                <li><strong>Date:</strong> ${eventDate}</li>
                <li><strong>Time:</strong> ${eventTime}</li>
                <li><strong>Location:</strong> ${eventLocation}</li>
              </ul>

              <p>We're excited to see you there! If you have any questions, feel free to reply to this email.</p>
              
              <p>Best regards,<br>Town Hall Newark Team</p>
            </div>
            <div class="footer">
              <p>Town Hall Newark | Newark AI Community</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: fromEmail,
        to,
        subject: `Confirmed: ${eventTitle}`,
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send confirmation email');
    }
  },

  async sendVolunteerApplicationConfirmation(data: {
    to: string;
    firstName: string;
  }): Promise<void> {
    const { to, firstName } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0064B4; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Volunteering! 🙌</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for your interest in volunteering with Town Hall Newark!</p>
              
              <p>We've received your application and will review it within 3-5 business days. A team member will reach out to you soon to discuss next steps.</p>

              <p>In the meantime, feel free to explore our upcoming events and join our community Discord.</p>
              
              <p>Best regards,<br>Town Hall Newark Team</p>
            </div>
            <div class="footer">
              <p>Town Hall Newark | Newark AI Community</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: fromEmail,
        to,
        subject: 'Thank You for Volunteering with Town Hall Newark',
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send volunteer confirmation email');
    }
  },

  async sendContactFormNotification(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const { name, email, subject, message } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
      </html>
    `;

    try {
      // Send to team email (you can configure this)
      await resend.emails.send({
        from: fromEmail,
        to: fromEmail, // Change to your team email
        subject: `Contact Form: ${subject}`,
        html,
        reply_to: email,
      });

      // Send confirmation to user
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'We received your message',
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for contacting Town Hall Newark. We've received your message and will respond within 24 hours.</p>
          <p>Best regards,<br>Town Hall Newark Team</p>
        `,
      });
    } catch (error) {
      console.error('Failed to send contact form email:', error);
      throw new Error('Failed to send contact form notification');
    }
  },
};
