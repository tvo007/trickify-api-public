const express = require ('express');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');
const samplers = require('./samplers/samplers.routes')
const scenes = require('./scenes/scenes.routes')

const router = express.Router ();

router.get ('/', (req, res) => {
  res.json ('Hi');
});

//route for paypal??????
// router.use('/config/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID)
// })
router.use('/users', users);
router.use('/samplers', samplers);
router.use('/scenes', scenes);
router.use('/auth', auth);

module.exports = router;
