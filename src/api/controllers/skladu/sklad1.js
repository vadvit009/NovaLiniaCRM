const {
    Skladu: {Sklad1, Sklad4, Sklad3, Sklad2},
    Mishku
} = require('../../models');

module.exports = {
    pruxodSklad1: async (req, res) => {
        try {
            const {
                user,
                vyazalId,
                masterId,
                machineId,
                date_prizod,
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

            const mishok = await Mishku.create({
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
            const sklad1 = await Sklad1.create({
                vyazalId,
                masterId,
                machineId,
                date_prizod,
                mishok: mishok._id,
                changesId: user._id,
                deletedAt: null
            });

            res.send({mishokId: mishok._id});
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
                date_prizod,
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

            const updated = await Sklad1.findByIdAndUpdate(id, {
                vyazalId,
                masterId,
                machineId,
                date_prizod,
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
    },
    rozxidToSklad2: async (req, res) => {
        const {user, mishok, date_rozsxodu, shveyId, sortId} = req.body;
        const rozxidSklad2 = await Sklad2.create({
            changesId: user._id,
            mishok,
            date_rozsxodu,
            shveyId,
            sortId,
            createdAt: Date.now(),
            deletedAt: null
        });
        res.send(rozxidSklad2)
    },
    rozxidToSklad3: async (req, res) => {
        const {user, mishok, date_rozsxodu, formId} = req.body;
        const rozxidSklad3 = await Sklad3.create({
            changesId: user._id,
            mishok,
            date_rozsxodu,
            formId,
            createdAt: Date.now(),
            deletedAt: null
        });
        res.send(rozxidSklad3)
    },
    rozxidToSklad4: async (req, res) => {
        const {user, mishok, date_rozsxodu, packId} = req.body;
        const rozxidSklad4 = await Sklad4.create({
            changesId: user._id,
            mishok,
            date_rozsxodu,
            packId,
            createdAt: Date.now(),
            deletedAt: null
        });
        res.send(rozxidSklad4)
    },

    updateRozxidToSklad2: async (req, res) => {
        const {user, mishok, date_rozsxodu, shveyId, sortId} = req.body;
        const {id} = req.params;

        const rozxidSklad2 = await Sklad2.findByIdAndUpdate(id, {
            changesId: user._id,
            mishok,
            date_rozsxodu,
            shveyId,
            sortId,
            createdAt: Date.now(),
            deletedAt: null
        })
            .populate('mishok')
            .populate('shveyId')
            .populate('sortId')
            .populate('changesId')
        res.send(rozxidSklad2)
    },
    updateRozxidToSklad3: async (req, res) => {
        const {user, mishok, date_rozsxodu, formId} = req.body;
        const {id} = req.params;

        const rozxidSklad3 = await Sklad3.findByIdAndUpdate(id, {
            changesId: user._id,
            mishok,
            date_rozsxodu,
            formId,
            createdAt: Date.now(),
            deletedAt: null
        })
            .populate('mishok')
            .populate('formId')
            .populate('changesId')
        res.send(rozxidSklad3)
    },
    updateRozxidToSklad4: async (req, res) => {
        const {user, mishok, date_rozsxodu, packId} = req.body;
        const {id} = req.params;

        const rozxidSklad4 = await Sklad4.findByIdAndUpdate(id, {
            changesId: user._id,
            mishok,
            date_rozsxodu,
            packId,
            createdAt: Date.now(),
            deletedAt: null
        })
            .populate('mishok')
            .populate('packId')
            .populate('changesId')
        res.send(rozxidSklad4)
    }
}
