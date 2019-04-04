const { Router } = require('express');
const api = require('./db/api');
const passport = require('passport');

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
  await api.addSubscription(req.user.userId, req.body.data);

  res.status(201);
  res.send();
});

module.exports = router;
