const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, universalMiddleware} = require('../middlewares')
const {userValidator: {createUserValidator}} = require('../validators');

router.post('/create', universalMiddleware.dataValidMiddleware(createUserValidator),
    userMiddleware.checkUserExist,
    userController.createUser);
router.get('/', userController.getUsers);

router.get('/:user_id', userMiddleware.isUserExist, userController.getUser);
router.put('/:user_id', universalMiddleware.dataValidMiddleware(createUserValidator),
    userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router
