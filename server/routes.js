const router = require('express').Router();
const controller = require('./controller');

router.get('/reviews', controller.getReviews);
router.get('/reviews/meta', controller.getMeta);
router.post('/reviews', controller.postReview);
module.exports = router;
