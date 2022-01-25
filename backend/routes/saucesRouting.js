// 6  routes
const {Router} = require('express');
const { displaySauces, displaySauce, postSauce, updateSauce, deleteSauce, likeSauce } = require('../controllers/saucesController');
const auth = require('../middlewares/auth');
const router = Router();

router.get('/', auth, displaySauces)

router.get('/:id', auth, displaySauce)

router.post('/', auth, postSauce)

router.put('/:id', auth, updateSauce)

router.delete('/:id', auth, deleteSauce)

router.post('/:id/like', auth, likeSauce)

module.exports = router;