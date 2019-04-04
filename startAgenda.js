const Agenda = require('agenda');
const moment = require('moment-timezone');
const webPush = require('web-push');
const { DB_HOST } = require('./constans');
const api = require('./db/api');

moment.tz.setDefault('Europe/Warsaw');

const SEND_NOTIFICATIONS_JOB = 'SEND_NOTIFICATIONS_JOB';

const agenda = new Agenda({ db: { address: DB_HOST } });

const sendUserNotification = async (userId, title, notification) => {
  try {
    const subscriptions = await api.getSubscriptions(userId);

    const payload = JSON.stringify({
      title,
      notification: {
        icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
        ...notification,
      },
    });

    await Promise.all(subscriptions.map(async subscription => {
      try {
        await webPush.sendNotification(subscription.data, payload);
      } catch (e) {
        await api.deleteSubscription(subscription._id);
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
    }));
  } catch (e) {
    throw new Error(`error sendUserNotification | ${e}`);
  }
};

agenda.on('ready', async () => {
  try {
    await agenda.start();
    await agenda.cancel({ name: SEND_NOTIFICATIONS_JOB });

    await agenda.define(SEND_NOTIFICATIONS_JOB, async () => {
      const events = await api.getEventsWithinNextMinuteWithActiveNotification();
      console.info(['SEND_NOTIFICATIONS_JOB'], events);

      events.forEach(async event => {
        await sendUserNotification(event.userId, event.title, { body: event.description });
        await api.updateEvent(event._id, { ...event, notification: false });
      });
    });

    await agenda.every('10 second', SEND_NOTIFICATIONS_JOB, {}, {
      timezone: 'Europe/Warsaw',
    });
  }
  catch (e) {
    console.error(`error starting agenda | ${e}`);
  }
});

const graceful = async () => {
  await agenda.stop();

  process.exit(0);
};

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);
