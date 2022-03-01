const router = require('express').Router();
const { validationUpdateProfile } = require('../middlewares/validations');
const { getMyProfile, updateProfile } = require('../controllers/users');

router.get('/me', getMyProfile);

router.patch('/me', validationUpdateProfile, updateProfile);

module.exports = router;
