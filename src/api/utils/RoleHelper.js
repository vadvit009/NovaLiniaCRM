const roleAccess = (roleArray) => {
    return (req, res, next) => {
        const {user} = req.body;
        const filteredRole = roleArray.filter(role => role === user.role);
        if (filteredRole.length) {
            next()
        } else {
            res.send(`Вибачте але доступ є тільки в ${roleArray}`).status(409);
        }
    }
}

module.exports = {roleAccess}