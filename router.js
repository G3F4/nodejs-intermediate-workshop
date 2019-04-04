const { Router } = require('express');
const webPush = require('web-push');
const passport = require('passport');
const api = require('./db/api');

const router = Router();

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/github');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' }),
);

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/github');
  }
});

router.get('/calendar', async function (req, res) {
  const data = await api.getMonth(req.user.userId, req.query.month);

  res.json({ data });
});

router.get('/day', async function (req, res) {
  const data = await api.getDayEvents(req.user.userId, req.query.date);

  res.json({ data });
});

router.post('/event', async function (req, res) {
  const id = await api.addEvent(req.user.userId, req.body);

  res.send({ id });
});

router.put('/event', async function (req, res) {
  const id = await api.updateEvent(req.query.id, req.body);

  res.send({ id });
});

router.delete('/event', async function (req, res) {
  const id = await api.deleteEvent(req.query.id);

  res.send({ id });
});

router.post('/notifications', async function (req, res) {
  try {
    const payload = JSON.stringify({
      title: 'Notifications enabled!',
      notification: {
        icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
        body: 'Notifications are great!',
      },
    });

    await webPush.sendNotification(req.body.data, payload);
    await api.addSubscription(req.user.userId, req.body.data);

    res.status(201);
    res.send();
  } catch (e) {
    res.status(403);
    res.send(`
      webPush.sendNotification error |
      name | ${e.name}
      message | ${e.message}
      statusCode | ${e.statusCode}
      headers | ${JSON.stringify(e.headers)}
      body | ${e.body}
      endpoint | ${e.endpoint}
    `);

    throw new Error(`
      webPush.sendNotification error |
      name | ${e.name}
      message | ${e.message}
      statusCode | ${e.statusCode}
      headers | ${JSON.stringify(e.headers)}
      body | ${e.body}
      endpoint | ${e.endpoint}
    `);
  }
});

module.exports = router;
