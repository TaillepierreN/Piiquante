// 6  routes
const {Router} = require('express');
const { displaySauces, displaySauce, newSauce, updateSauce, deleteSauce, likeSauce } = require('../controllers/saucesController');
const auth = require('../middlewares/auth');
const router = Router();
const multer = require('../middlewares/multer-config')

router.get('/', auth, displaySauces)

router.get('/:id', auth, displaySauce)

router.post('/', auth, multer, newSauce)

router.put('/:id', auth, multer, updateSauce)

router.delete('/:id', auth, deleteSauce)

router.post('/:id/like', auth, likeSauce)

module.exports = router;