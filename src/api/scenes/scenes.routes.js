const asyncHandler = require ('express-async-handler');
const Scene = require ('./scenes.model');
const express = require ('express');
// const getAddresses = asyncHandler(async (req, res, next) => {

//   })

const router = express.Router ();
//todo: actuially call queries

router.get (
  '/',
  asyncHandler (async (req, res, next) => {
    try {
      const scenes = await Scene.query ().where ('deleted_at', null);
      res.json (scenes);
    } catch (error) {
      next (error);
    }
  })
);

router.get (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      const scenes = await Scene.query ()
        .where ('deleted_at', null)
        .andWhere ('id', req.params.id)
        .first ();
      // .withGraphFetched('product_infos')
      res.json (scenes);
    } catch (error) {
      next (error);
    }
  })
);

router.post (
  '/',
  asyncHandler (async (req, res, next) => {
    try {
      const scene = await Scene.query ().insert (req.body);
      res.json (scene);
    } catch (error) {
      next (error);
    }
  })
);

router.patch (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      const scene = await Scene.query ().patchAndFetchById (
        req.params.id,
        req.body
      );
      res.json (scene);
    } catch (error) {
      next (error);
    }
  })
);

router.delete (
  '/:id',
  asyncHandler (async (req, res, next) => {
    try {
      await Scene.query ().deleteById (req.params.id);
      const scenes = await Scene.query ().where ('deleted_at', null);
      res.json (scenes);
    } catch (error) {
      next (error);
    }
  })
);

module.exports = router