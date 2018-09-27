const express = require('express');
const Mailgun = require('mailgun-js');

const app = express();

const apiKey = process.env.MG_API;
const domain = process.env.MG_DOMAIN;
const mailList = process.env.MG_EMAIL;


const mg = Mailgun({ apiKey, domain });

app.post('/send', (req, res) => {
  const form = JSON.parse(req.query.sendForm);
  console.log(typeof form);
  for(let key in form) {
    if (!form[key]) {
      res.status(400).send('incomplete');
    }
  }

  if(!form.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
    res.status(400).send('invalidEmail');
  }

  const { name, email, subject, message } = form;
  const data = {
    from: `${name} <${email}>`,
    to: mailList,
    subject,
    text: message
  };

  mg.messages().send(data, (err, body) => {
    if (err) {
      res.status(500).send('mailgunError');
    } else {
      res.send('success');
    }
  })
});

module.exports = {
  path: '/api',
  handler: app
};