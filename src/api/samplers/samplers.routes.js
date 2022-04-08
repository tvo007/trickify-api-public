const asyncHandler = require ('express-async-handler');
const Sampler = require ('./samplers.model');
const express = require ('express');
// const getAddresses = asyncHandler(async (req, res, next) => {

//   })

const router = express.Router ();
//todo: actuially call queries

router.get ('/', async (req, res) => {
  const samplers = await Sampler.query ()
    .select ('id', 'name', 'url', 'created_by', 'runtime', 'upload_date', 'created_at', 'updated_at')
    .where ('deleted_at', null);
  res.json (samplers);
});

router.get (
  '/',
  asyncHandler (async (req, res, next) => {
    try {
      const samplers = await Sampler.query ().where ('deleted_at', null);
      res.json (samplers);
    } catch (error) {
      next (error);
    }
  })
);

router.get (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      const samplers = await Sampler.query ()
        .where ('deleted_at', null)
        .andWhere ('id', req.params.id)
        .first ();
      // .withGraphFetched('product_infos')
      res.json (samplers);
    } catch (error) {
      next (error);
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

module.exports = router