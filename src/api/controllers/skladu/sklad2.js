const {Skladu} = require('../../models');

module.exports = {
    pruxodSklad2: async (req, res) => {
        try {
            const {
                user,
                shveyaId,
                sortId,
                date,
                mishokId,
            } = req.body;
            const sklad2 = await Skladu.Sklad2.create({
                shveyaId,
                sortId,
                date,
                mishokId,
                changesId: user._id,
                deletedAt: null
            });

            res.send(sklad2);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    },
    updateSklad2: async (req, res) => {
        try {
            const {
                user,
                shveyaId,
                sortId,
                date,
                mishokId,
            } = req.body;
            const {id} = req.params;

            const updated = await Skladu.Sklad2.findByIdAndUpdate(id, {
                shveyaId,
                sortId,
                date,
                mishokId,
                changesId: user._id,
                updatedAt: Date.now(),
                deletedAt: null
            })
            res.send(updated);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}