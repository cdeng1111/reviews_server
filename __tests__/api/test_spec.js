const frisby = require('frisby');

const { Joi } = frisby;

const randProduct = Math.floor(Math.random() * 1000010);

console.log('randProduct:', randProduct);

it('Get reviews should return expected fields', () => {
  return frisby
    .get(`http://localhost:3000/reviews?product_id=${randProduct}`)
    .expect('json', 'product', `${randProduct}`)
    .expect('jsonTypes', 'count', Joi.number())
    .expect('jsonTypes', 'results.*', {
      id: Joi.number().required(),
      rating: Joi.number().required(),
      summary: Joi.string(),
      recommend: Joi.boolean(),
      body: Joi.string(),
      date: Joi.date().iso().required(),
      reviewer_name: Joi.string().required(),
      helpfulness: Joi.number().required(),
    });
});
