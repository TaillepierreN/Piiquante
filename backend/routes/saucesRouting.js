// 6  routes
const {Router} = require('express');
const { displaySauces, displaySauce, postSauce, updateSauce, deleteSauce, likeSauce } = require('../controllers/saucesController');

const router = Router();

router.get('/', displaySauces)

router.get('/:id', displaySauce)

router.post('/', postSauce)

router.put('/:id', updateSauce)

router.delete('/:id', deleteSauce)

router.post('/:id/like', likeSauce)

module.exports = router;