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

const getShows = (cal) => {
  return Object.entries(cal).filter(([key, { start }]) => {
    return new Date(start).valueOf() > Date.now();
  }).map(([key, { summary, location, start, description }]) => {
    const { date, time } = formatDateTime(start);
    const { venue, link } = JSON.parse(description);
    return {
      title: summary,
      location,
      date,
      time,
      venue,
      link
    }
  }).reverse();
};

module.exports = {
  validateForm,
  getShows
};