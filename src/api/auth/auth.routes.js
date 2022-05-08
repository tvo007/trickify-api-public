//jwt
//bcrypt

const express = require ('express');

const router = express.Router ();

const yup = require ('yup');

const User = require ('../users/users.model');

const bcrypt = require ('bcrypt');
//TODO: extract to general hashing util
const jwt = require ('../../lib/jwt');

const errorMessages = {
  invalidLogin: 'Invalid login',
  emailInUse: 'Email in use',
};

const schema = yup.object ().shape ({
  // name: yup.string ().trim ().min (2).required (),
  email: yup.string ().trim ().email ().required (),
  password: yup
    .string ()
    .min (8)
    .max (100)
    .matches (/[^A-Za-z0-9]/, 'Password must contain a special character')
    .matches (/[A-Z]/, 'Password must contain an uppercase letter')
    .matches (/[a-z]/, 'Password must contain a lowercase character')
    .matches (/[0-9]/, 'Password must contain a number')
    .required (),
});

// function validPassword (password, username) {
//   return (
//     password.toLowerCase () !== username.toLowerCase () &&
//     yup
//       .string ()
//       .min (8)
//       .max (100)
//       .matches (/[^A-Za-z0-9]/)
//       .matches (/[A-Z]/)
//       .matches (/[a-z]/)
//       .matches (/[0-9]/)
//       .validate (password)
//   );
// }

router.post ('/signup', async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const createUser = {
      name,
      email,
      password,
    };

    await schema.validate (createUser, {
      abortEarly: false,
    });

    const existingUser = await User.query ().where ({email}).first ();

    if (existingUser) {
      const error = new Error ('Email in use');
      res.status (403);
      throw error;
    }

    //TODO: get rounds from config
    const hashedPassword = await bcrypt.hash (password, 12);
    const insertedUser = await User.query ().insert ({
      name,
      email,
      password: hashedPassword,
    });

    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      name,
      email,
    };

    const token = await jwt.sign (payload);

    res.json ({
      user: payload,
      token,
    });
  } catch (error) {
    console.log (error);
    next (error);
  }
});

router.post ('/signin', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    await schema.validate (
      {
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );

    const user = await User.query ().where ({email}).first ();

    if (!user) {
      const error = new Error (errorMessages.invalidLogin);
      res.status (403);
      throw error;
    }

    const validPassword = await bcrypt.compare (password, user.password);

    if (!validPassword) {
      const error = new Error (errorMessages.invalidLogin);
      res.status (403);
      throw error;
    }

    const payload = {
      id: user.id,
      email,
    };

    const token = await jwt.sign (payload);

    res.json ({
      user: payload,
      token,
    });
  } catch (error) {
    console.log (error);
    next (error);
  }
});



module.exports = router;
