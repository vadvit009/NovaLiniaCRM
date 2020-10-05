const {softDeleteUser, deleteUser} = require('./delete.controller');
const {getAllUsers, getUser} = require('./get.controller');
const {updateUser, restoreUser} = require('./patch.controller');
const {login, register, restorePassword, changePassword} = require('./post.controller');

module.exports = {
        getUser,
        getAllUsers,
        updateUser,
        restoreUser,
        login,
        restorePassword,
        register,
        changePassword,
        softDeleteUser,
        deleteUser
}