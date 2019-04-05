const { Router } = require('express');
const apiRouter = require('./routers/apiRouter');

const router = Router();

router.use(apiRouter);

module.exports = router;
