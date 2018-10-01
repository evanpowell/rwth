const express = require('express');
const { fromURL } = require('ical');
const Mailgun = require('mailgun-js');

const {
  MG_API,
  MG_DOMAIN,
  CAL_URL
} = process.env;

const mg = Mailgun({ apiKey: MG_API, domain: MG_DOMAIN });

const { validateForm, getShows } = require('./helpers');

const app = express();

app.use('/send', validateForm);

app.post('/send', (req, res) => {
  mg.messages().send(req.contactForm, (err, body) => {
    if (err) {
      return res.status(500).send('mailgunError');
    }
    res.send('success');
  });
});

app.get('/shows', (req, res) => {
  fromURL(CAL_URL, {}, (err, cal) => {
    if (err) {
      return res.status(500).send(err);
    }
    const shows = getShows(cal);
    res.send(shows);
  });
});

module.exports = {
  path: '/api',
  handler: app
};