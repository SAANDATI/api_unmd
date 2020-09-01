const {allUsers, createUser, deleteUser, updateUser} = require('../Controller/UserController');
const router = require('express').Router();

router.get('/users', allUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.patch('/users', updateUser);

module.exports = router;







