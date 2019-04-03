const Chance = require('chance');
const moment = require('moment-timezone');

const chance = new Chance();

module.exports.getMonth = (userId, month) => {
  const startDateMoment = moment(month).startOf('month').startOf('week');

  return Array.from({ length: 7 * 6 }).map(() => ({
    date: startDateMoment.add(1, 'day').format('YYYY-MM-DD'),
    events: Array.from({ length: chance.integer({ min: 0, max: 3 }) }).map(() => ({
      id: chance.guid(),
      time: startDateMoment.startOf('day').add(chance.integer({ min: 6, max: 24 }), 'hour').format('YYYY-MM-DDThh:mm'),
      title: chance.sentence({ words: chance.integer({ min: 2, max: 8 }) }),
      description: chance.paragraph({ sentences: chance.integer({ min: 1, max: 3 }) }),
    })),
  }));
};

module.exports.getDayEvents = (userId, day) => {
  const startDate = moment(day).startOf('day').add(6, 'hour');

  return Array.from({ length: chance.integer({ min: 0, max: 10 }) }).map(() => ({
    time: startDate.add(chance.integer({ min: 1, max: 2 }), 'hour').format('YYYY-MM-DDThh:mm'),
    id: chance.guid(),
    title: chance.sentence({ words: chance.integer({ min: 2, max: 8 }) }),
    description: chance.paragraph({ sentences: chance.integer({ min: 1, max: 3 }) }),
  }));
};
