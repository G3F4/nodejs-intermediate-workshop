const webPush = require('web-push');

const publicVapidKey = 'BBSBOIj17PEWrpy6vO6DI0voM1186Mv3VKaD2k91fCnKD1F8uEo6LMIk-aqSx3sF-glNrHYE1cpcA1YowLyh4BY';
const privateVapidKey = 'ZfA5Lf5MCv6CQLDCdA653GiWm9CYjt9vtrInRcaEKfg';

webPush.setVapidDetails(
  'mailto:g3f4.lifeapp@gmail.com',
  publicVapidKey,
  privateVapidKey,
);
