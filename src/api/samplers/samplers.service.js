const asyncHandler = require ('express-async-handler');
const Sampler = require ('./samplers.model');

const getSamplers = async () => {
  const samplers = await Sampler.query ()
    .select (
      'id',
      'name',
      'url',
      'created_by',
      'runtime',
      'upload_date',
      'created_at',
      'updated_at'
    )
    .where ('deleted_at', null);
  if (samplers) return samplers;
};

const getSamplerById = async id => {
  const sampler = await Sampler.query ()
    .where ('deleted_at', null)
    .andWhere ('id', id)
    .first ()
    .withGraphFetched ('scenes');
  return sampler;
};

module.exports = {
  getSamplers,
  getSamplerById,
};
