import { google } from 'googleapis';

class CalendarService {
  constructor() {
    this.calendar = null;
  }

  async initialize(credentials) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials(credentials);
    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async addInterviewEvent(interviewDetails) {
    if (!this.calendar) throw new Error('Calendar not initialized');

    const event = {
      summary: `Interview with ${interviewDetails.company}`,
      description: interviewDetails.notes,
      start: {
        dateTime: interviewDetails.startTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: interviewDetails.endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    try {
      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding calendar event:', error);
      throw error;
    }
  }

  async getUpcomingInterviews() {
    if (!this.calendar) throw new Error('Calendar not initialized');

    const now = new Date();
    const response = await this.calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      q: 'Interview',
    });

    return response.data.items;
  }
}

export default new CalendarService();
