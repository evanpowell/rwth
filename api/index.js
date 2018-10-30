const express = require('express');
const { fromURL } = require('ical');
const Mailgun = require('mailgun-js');
const axios = require('axios');

const {
  MG_API,
  MG_DOMAIN,
  CAL_URL,
  YOUTUBE_API
} = process.env;

const mg = Mailgun({ apiKey: MG_API, domain: MG_DOMAIN });

const { validateForm, getShows } = require('./helpers');

const app = express();

app.post('/send', validateForm, (req, res) => {
  mg.messages().send(req.contactForm, (err, body) => {
    if (err) {
      console.log(err);
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

app.get('/videos', (req, res) => {
  const config = {
    params: {
      key: YOUTUBE_API,
      part: 'snippet',
      playlistId: 'UUZ9ZJxRri6B6mqAdIEliJAA',
      maxResults: 10
    }
  };
  axios.get('https://www.googleapis.com/youtube/v3/playlistItems', config)
    .then(({data}) => {
      res.send(data.items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

module.exports = {
  path: '/api',
  handler: app
};