const app = require('express');
const router = app.Router();
const PersonController = require('../controllers/PersonController');

router.get('/', PersonController.home);
router.get('/user/:id', PersonController.showUser);
router.get('/addUser', PersonController.addUser);
router.post('/store', PersonController.store);
router.get('/user/:id/editUser', PersonController.editUser)
router.post('/user/:id/updateUser', PersonController.update);
router.post('/user/:id/deleteUser', PersonController.delete);
router.get('/search', PersonController.search);
router.get('/allusers', PersonController.allUsers)

router.all('*', PersonController.notFoundPage);

module.exports = router;