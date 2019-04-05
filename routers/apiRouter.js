const { Router } = require('express');
const api = require('../db/api');

const router = Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.send('Unauthorized. Please refresh page to set new session.');
  }
});

router.get('/api/calendar', async function (req, res) {
  const data = await api.getMonth(req.user.userId, req.query.month);

  res.json({ data });
});

router.get('/api/day', async function (req, res) {
  const data = await api.getDayEvents(req.user.userId, req.query.date);

  res.json({ data });
});

router.post('/api/event', async function (req, res) {
  const id = await api.addEvent(req.user.userId, req.body);

  res.send({ id });
});

router.put('/api/event/:id', async function (req, res) {
  const id = await api.updateEvent(req.params.id, req.body);

  res.send({ id });
});

router.delete('/api/event/:id', async function (req, res) {
  const id = await api.deleteEvent(req.params.id);

  res.send({ id });
});

router.post('/api/notifications', async function (req, res) {
  res.status(201);
});

module.exports = router;
