const express = require('express');
const Mailgun = require('mailgun-js');

const app = express();

const apiKey = process.env.MAILGUN_API;
const domain = process.env.MAILGUN_DOMAIN;

const mg = Mailgun({ apiKey, domain });

app.post('/send', (req, res) => {
  const { sendForm } = req.query;
  
  for(let key in sendForm) {
    if (!sendForm[key]) {
      res.send('incomplete');
      return;
    }
  }

  if(sendForm[email].match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) === null) {
    res.send('invalidEmail');
    return;
  }


  // mg.messages().send(data, (err, body) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Mailgun success', body)
  //   }
  // })
  res.send(sendForm);
});

module.exports = {
  path: '/api',
  handler: app
};