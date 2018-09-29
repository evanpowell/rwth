const express = require('express');

const { sendContactForm, getShows } = require('./helpers');

const app = express();

app.post('/send', (req, res) => {
  sendContactForm(req.query.sendForm)
    .then(() => {
      res.send('success');
    })
    .catch(({ statusCode, message }) => {
      res.status(statusCode).send(message);
    });
});

app.get('/shows', async (req, res) => {
  let shows = await getShows();
  res.send(shows);
});

module.exports = {
  path: '/api',
  handler: app
};