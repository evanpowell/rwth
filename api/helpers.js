const mailList = process.env.MG_EMAIL;

const validateForm = (req, res, next) => {
  const form = JSON.parse(req.query.sendForm);
  const { name, email, subject, message } = form;

  for (let key in form) {
    if(form[key] === '') {
      return res.status(400).send('incomplete');
    }
  }

  if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
    return res.status(400).send('invalidEmail');
  }

  req.contactForm = {
    from: `${name} <${email}>`,
    to: mailList,
    subject,
    text: message
  };
  
  next();
};

const getShows = (cal) => {
  return Object.entries(cal).filter(([key, { start }]) => {
    return new Date(start).valueOf() > Date.now();
  })
  .sort((a, b) => {
    return new Date(a[1].start).valueOf() > new Date(b[1].start).valueOf();
  })
  .map(([key, { summary, location, description }]) => {
    const { venue, link, date, time } = JSON.parse(description);
    return {
      title: summary,
      location,
      date,
      time,
      venue,
      link,
      moreInfo: false
    }
  });
};

module.exports = {
  validateForm,
  getShows
};