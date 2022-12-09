const router = require('express').Router();

const userRoutes = require('./user-routes');
//book routes
router.use('/users', userRoutes);

module.exports = router;
