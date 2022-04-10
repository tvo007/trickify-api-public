const asyncHandler = require ('express-async-handler');
const Sampler = require ('./samplers.model');
const express = require ('express');
const {getSamplers, getSamplerById} = require ('./samplers.service');
const {NotFoundError} = require ('objection');
const e = require ('cors');
// const getAddresses = asyncHandler(async (req, res, next) => {

//   })

const router = express.Router ();
//todo: actuially call queries

router.get (
  '/',
  asyncHandler (async (req, res, next) => {
    try {
      const samplers = await getSamplers ();
      res.json (samplers);
    } catch (error) {
      res.send (500);
      console.log (error);
      throw new Error ('Something went wrong.');
    }
  })
);

// router.get (
//   '/',
//   asyncHandler (async (req, res, next) => {
//     try {
//       const samplers = await Sampler.query ().where ('deleted_at', null);
//       res.json (samplers);
//     } catch (error) {
//       next (error);
//     }
//   })
// );

router.get (
  '/:id',
  asyncHandler (async (req, res, next, error) => {
    try {
      const sampler = await getSamplerById (req.params.id);
      res.json (sampler);
    } catch (error) {
      res.status (404);
      console.log (error);
      throw new Error ('Sampler does not exist.');
    }
  })
);

router.post (
  '/',
  asyncHandler (async (req, res, next) => {
    try {
      const sampler = await Sampler.query ().insert (req.body);
      res.json (sampler);
    } catch (error) {
      next (error);
    }
  })
);

router.patch (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      const sampler = await Sampler.query ().patchAndFetchById (
        req.params.id,
        req.body
      );
      res.json (sampler);
    } catch (error) {
      next (error);
    }
  })
);

router.delete (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      await Sampler.query ().deleteById (req.params.id);
      const samplers = await Sampler.query ().where ('deleted_at', null);
      res.json (samplers);
    } catch (error) {
      next (error);
    }
  })
);

module.exports = router;
