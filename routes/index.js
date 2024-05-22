// server -> routes/index.js -> api/index.js -> departments.js
//                                           -> roles.js
//                                           -> employees.js

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;