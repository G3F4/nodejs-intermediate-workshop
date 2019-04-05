const { Router } = require('express');

const router = Router();

router.get('/api/calendar', async function (req, res) {
  res.json({
    data: [{ date: '2019-04-01', events: [] }, { date: '2019-04-02', events: [] }, {
      date: '2019-04-03',
      events: [{ 'title': 'test pierwszy', id: '5ca48f38838382998f903e36' }],
    }, { date: '2019-04-04', events: [] }, {
      date: '2019-04-05',
      events: [{ 'title': 'asdasdasd', id: '5ca713caf3a8a00031740b6b' }],
    }, { date: '2019-04-06', events: [] }, { date: '2019-04-07', events: [] }, {
      date: '2019-04-08',
      events: [],
    }, { date: '2019-04-09', events: [] }, {
      date: '2019-04-10',
      events: [{ 'title': 'nowe zadanie!', id: '5ca71459f3a8a00031740b6c' }],
    }, {
      date: '2019-04-11',
      events: [{ 'title': 'tetijnijnijnjinijn', id: '5ca4925a385642003103fc14' }],
    }, {
      date: '2019-04-12',
      events: [{ 'title': 'marchewkowe polejjjj', id: '5ca5ea7a3353960031b8b5eb' }],
    }, { date: '2019-04-13', events: [] }, { date: '2019-04-14', events: [] }, {
      date: '2019-04-15',
      events: [],
    }, { date: '2019-04-16', events: [] }, { date: '2019-04-17', events: [] }, {
      date: '2019-04-18',
      events: [],
    }, { date: '2019-04-19', events: [] }, { date: '2019-04-20', events: [] }, {
      date: '2019-04-21',
      events: [],
    }, { date: '2019-04-22', events: [] }, { date: '2019-04-23', events: [] }, {
      date: '2019-04-24',
      events: [],
    }, {
      date: '2019-04-25',
      events: [{ 'title': '123', id: '5ca5ea8b3353960031b8b5ec' }],
    }, { date: '2019-04-26', events: [] }, { date: '2019-04-27', events: [] }, {
      date: '2019-04-28',
      events: [],
    }, { date: '2019-04-29', events: [] }, { date: '2019-04-30', events: [] }, {
      date: '2019-05-01',
      events: [],
    }, { date: '2019-05-02', events: [] }, { date: '2019-05-03', events: [] }, {
      date: '2019-05-04',
      events: [],
    }, { date: '2019-05-05', events: [] }, { date: '2019-05-06', events: [] }, {
      date: '2019-05-07',
      events: [],
    }, { date: '2019-05-08', events: [] }, { date: '2019-05-09', events: [] }, {
      date: '2019-05-10',
      events: [],
    }, { date: '2019-05-11', events: [] }, { date: '2019-05-12', events: [] }],
  });
});

router.get('/api/day', async function (req, res) {
  res.json({
    data: [{
      id: '5ca713caf3a8a00031740b6b',
      description: 'asdadasd',
      time: '2019-04-05T12:00',
      title: 'asdasdasd',
      notification: false,
    }],
  });
});

router.post('/api/event', async function (req, res) {
  res.send({ id: req.body.id });
});

router.put('/api/event/:id', async function (req, res) {
  res.send({ id: req.params.id });
});

router.delete('/api/event/:id', async function (req, res) {
  res.send({ id: req.params.id });
});

router.post('/api/notifications', async function (req, res) {
  res.status(201);
});

module.exports = router;
