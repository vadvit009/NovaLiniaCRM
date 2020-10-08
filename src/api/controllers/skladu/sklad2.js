const {
    Skladu: {Sklad1, Sklad4, Sklad3, Sklad2},
} = require('../../models');

module.exports = {
    pruxodSklad2: async (req, res) => {
        try {
            const {
                user,
                sortId,
                shveyaId,
                date_prixod,
                mishok
            } = req.body;

            const sklad2 = await Sklad2.create({
                sortId,
                shveyaId,
                date_prixod,
                date_rozsxodu: null,
                mishok,
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
                sortId,
                shveyaId,
                date_prixod,

                mishok
            } = req.body;
            const {id} = req.params;

            const updated = await Sklad1.findByIdAndUpdate(id, {
                user,
                sortId,
                shveyaId,
                date_prixod,

                mishok,
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
    },

    getSklad: async (req, res) => {
        const sklad2 = await Sklad2.find({})
            .populate({
                path: 'mishok',
                populate: {path: "asortumentId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "imageId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "colorId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "typeId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "sizeId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "classId", select: "name -_id"}
            })
            .populate({
                path: 'mishok',
                populate: {path: "articleId", select: "name -_id"}
            })
            .populate('shveyaId')
            .populate('sortId')
            .populate({path: 'changesId', select: 'firstName'})
        res.send(sklad2);
    }
}
