const {Skladu, Mishku} = require('../../models');

module.exports = {
    pruxodSklad1: async (req, res) => {
        try {
            const {
                user,
                vyazalId,
                masterId,
                machineId,
                date,
                gatynok1,
                gatynok2,
                gatynok3,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                articleId,
            } = req.body;
            const sklad1 = await Skladu.Sklad1.create({
                vyazalId,
                masterId,
                machineId,
                date,
                gatynok1,
                gatynok2,
                gatynok3,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                articleId,
                changesId: user._id,
                deletedAt: null
            });

            const bag = await Mishku.create({
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                articleId,
                gatynok1,
                gatynok2,
                gatynok3,
            })
            res.send({sklad1, bagId: bag._id});
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    },
    updateSklad1: async (req, res) => {
        try {
            const {
                user,
                vyazalId,
                masterId,
                machineId,
                date,
                gatynok1,
                gatynok2,
                gatynok3,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                articleId,
            } = req.body;
            const {id} = req.params;

            const updated = await Roztsinka.findByIdAndUpdate(id, {
                vyazalId,
                masterId,
                machineId,
                date,
                gatynok1,
                gatynok2,
                gatynok3,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                articleId,
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