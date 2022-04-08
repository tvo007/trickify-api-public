const express = require ('express');

const User = require ('./users.model');

const router = express.Router ();
//todo: actuially call queries

router.get ('/', async (req, res) => {
  const users = await User.query ()
    .select ('id', 'email', 'name', 'created_at', 'updated_at')
    .where ('deleted_at', null);
  res.json (users);
});

// router.post('/', async(req, res) => {
//   //runs through validator first
//   try {
//     const user = await User
//     .query()
//     .insert(req.body)
//   } catch(error) {
//     res.json({message: error})
//   }
  
// })

module.exports = router;
