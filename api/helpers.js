const Mailgun = require('mailgun-js');
const { google } = require('googleapis');
const axios = require('axios');

const {
  MG_API: mgApiKey,
  MG_DOMAIN: domain,
  MG_EMAIL: mailList,
  CAL_ID: calendarId,
  GCAL_API: gcalApiKey
} = process.env;

const mg = Mailgun({ apiKey: mgApiKey, domain });

const sendContactForm = (contactForm) => {
  const form = JSON.parse(contactForm);
  return new Promise((resolve, reject) => {
    for(let key in form) {
      if(form[key] === '') {
        reject({
          statusCode: 400,
          message: 'incomplete'
        });
      }
    }

    const { name, email, subject, message } = form;

    if(!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
      reject({
        statusCode: 400,
        message: 'invalidEmail'
      });
    }

    const data = {
      from: `${name} <${email}>`,
      to: mailList,
      subject,
      text: message
    };

    mg.messages().send(data, (err, body) => {
      if (err) {
        reject({
          statusCode: 400,
          message: 'mailgunError'
        });
      } else {
        resolve();
      }
    });
  });
};

const formatDateTime = (dateTime) => {
  const d = new Date(dateTime);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = days[d.getDay()];
  const month = months[d.getMonth()];
  const dateOfMonth = d.getDate();
  const year = d.getFullYear();
  const date = `${day} ${month} ${dateOfMonth}, ${year}`;

  let meridian;
  let hours = d.getHours();
  if (hours >= 12) {
    hours = hours - 12;
    meridian = 'pm';
  } else if (hours === 0) {
    hours = '12';
    meridian = 'am';
  } else {
    meridian = 'am'
  }

  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  const time = `${hours}:${minutes} ${meridian}`;

  return {
    date,
    time
  }
}

const getCalendarEvents = async () => {
  let eventsObj = await axios({
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    method: 'get',
    params: {
      key: gcalApiKey,
      singleEvents: true,
      orderBy: 'startTime',
      timeMin: new Date().toISOString()
    }
  });
  return eventsObj.data.items;
};

const getShows = async () => {
  let events = await getCalendarEvents();
  let shows = events.map(({ summary, location, description, start }) => {
    const { venue, link } = JSON.parse(description);
    const { date, time } = formatDateTime(start.dateTime || start.date);
    return {
      title: summary,
      location,
      date,
      time,
      venue,
      link
    }
  });
  return shows;
};

module.exports = {
  sendContactForm,
  getShows
};