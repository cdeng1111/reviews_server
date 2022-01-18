const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.getReviews);
router.get('/meta', controller.getMeta);
router.post('/', controller.postReview);
module.exports = router;
