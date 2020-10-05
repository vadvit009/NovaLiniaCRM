const {User} = require("../../models/users");


const softDeleteUser = async (req, res) => {
    const {id} = req.params;
    return await User.findByIdAndUpdate({_id: ObjectId(id)}, {deletedAt: Date.now()})
        .then((user) => res.json(user))
        .catch((err) => res.send(err));
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    return await User.findByIdAndRemove({_id: ObjectId(id)})
        .then((user) => res.json(user))
        .catch((err) => res.send(err));
}
module.exports = {
    softDeleteUser, deleteUser
}