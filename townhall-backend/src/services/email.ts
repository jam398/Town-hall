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

  async sendEventReminder(data: {
    to: string;
    firstName: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventAddress: string;
  }): Promise<void> {
    const { to, firstName, eventTitle, eventDate, eventTime, eventLocation, eventAddress } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E1000F; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Event Tomorrow! ⏰</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>This is a friendly reminder that <strong>${eventTitle}</strong> is happening tomorrow!</p>
              
              <div class="highlight">
                <h3>📅 Event Details:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li><strong>Date:</strong> ${eventDate}</li>
                  <li><strong>Time:</strong> ${eventTime}</li>
                  <li><strong>Location:</strong> ${eventLocation}</li>
                  <li><strong>Address:</strong> ${eventAddress}</li>
                </ul>
              </div>

              <p><strong>What to bring:</strong></p>
              <ul>
                <li>A notebook and pen for taking notes</li>
                <li>Your laptop if you want to follow along</li>
                <li>Questions and curiosity!</li>
              </ul>

              <p>We're excited to see you tomorrow! If you can no longer attend, please reply to let us know.</p>
              
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
        subject: `Reminder: ${eventTitle} is Tomorrow!`,
        html,
      });
    } catch (error) {
      console.error('Failed to send event reminder:', error);
      throw new Error('Failed to send event reminder');
    }
  },

  async sendPostEventFollowUp(data: {
    to: string;
    firstName: string;
    eventTitle: string;
    recordingUrl?: string;
    summaryUrl?: string;
    nextEvents?: Array<{ title: string; date: string; slug: string }>;
  }): Promise<void> {
    const { to, firstName, eventTitle, recordingUrl, summaryUrl, nextEvents } = data;

    const nextEventsHtml = nextEvents && nextEvents.length > 0
      ? `
        <h3>🎯 Upcoming Events You Might Like:</h3>
        <ul>
          ${nextEvents.map(event => `
            <li>
              <strong>${event.title}</strong><br>
              ${event.date}<br>
              <a href="${process.env.FRONTEND_URL}/events/${event.slug}">Learn more →</a>
            </li>
          `).join('')}
        </ul>
      `
      : '';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0064B4; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background: #E1000F; color: white; text-decoration: none; border-radius: 4px; margin: 10px 10px 10px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Attending! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for attending <strong>${eventTitle}</strong>! We hope you found it valuable and enjoyed connecting with the community.</p>
              
              ${recordingUrl ? `
                <h3>📹 Event Recording:</h3>
                <p>Missed something or want to review? The recording is now available:</p>
                <a href="${recordingUrl}" class="button">Watch Recording</a>
              ` : ''}

              ${summaryUrl ? `
                <h3>📝 Event Summary:</h3>
                <p>We've written a summary with key takeaways from the event:</p>
                <a href="${summaryUrl}" class="button">Read Summary</a>
              ` : ''}

              ${nextEventsHtml}

              <h3>💬 Stay Connected:</h3>
              <p>Join our community to stay updated on future events and connect with other members!</p>
              <ul>
                <li>Join our Discord community</li>
                <li>Follow us on social media</li>
                <li>Share your feedback by replying to this email</li>
              </ul>

              <p>We'd love to hear your thoughts! What did you enjoy most? What topics would you like to explore next?</p>
              
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
        subject: `Thanks for attending ${eventTitle}!`,
        html,
      });
    } catch (error) {
      console.error('Failed to send post-event follow-up:', error);
      throw new Error('Failed to send post-event follow-up');
    }
  },

  async sendVolunteerApprovedNotification(data: {
    to: string;
    firstName: string;
    discordInviteUrl?: string;
  }): Promise<void> {
    const { to, firstName, discordInviteUrl } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background: #5865F2; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to the Team! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Great news! Your volunteer application has been approved. Welcome to the Town Hall Newark team!</p>
              
              <h3>🚀 Next Steps:</h3>
              <ol>
                <li><strong>Join our Discord:</strong> This is where all team communication happens</li>
                <li><strong>Attend the volunteer orientation:</strong> We'll send details soon</li>
                <li><strong>Get assigned to your first task:</strong> Based on your interests</li>
              </ol>

              ${discordInviteUrl ? `
                <p>Click the button below to join our volunteer Discord channel:</p>
                <a href="${discordInviteUrl}" class="button">Join Discord</a>
              ` : ''}

              <h3>📋 What to Expect:</h3>
              <ul>
                <li>Weekly team check-ins</li>
                <li>Flexible volunteering hours</li>
                <li>Opportunity to lead workshops and events</li>
                <li>Skill development and networking</li>
                <li>Recognition for your contributions</li>
              </ul>

              <p>We're excited to have you on board! If you have any questions, feel free to reply to this email.</p>
              
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
        subject: '🎉 Your volunteer application has been approved!',
        html,
      });
    } catch (error) {
      console.error('Failed to send volunteer approved notification:', error);
      throw new Error('Failed to send volunteer approved notification');
    }
  },
};
