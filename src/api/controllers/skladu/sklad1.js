const {getNextSequence} = require("../../utils/getNextId");
const {
    Skladu: {Sklad1, Sklad4, Sklad3, Sklad2},
    Mishku
} = require('../../models');
const moment = require('moment')

module.exports = {
    pruxodSklad1: async (req, res) => {
        try {
            const {
                user,
                vyazalId,
                masterId,
                machineId,
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
                date_prixod,
            } = req.body;

            const mishok = await Mishku.create({
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                barcode: getNextSequence('barcode'),
                classId,
                articleId,
                date_prixod,
                gatynok1,
                gatynok2,
                gatynok3,
            });

            const sklad1 = await Sklad1.create({
                vyazalId,
                masterId,
                machineId,
                date_prixod,
                date_rozsxodu: null,
                mishok: mishok._id,
                changesId: user._id,
                deletedAt: null
            });

            res.send({mishokId: mishok._id, barcode});
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
                date_prixod,
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
//TODO IF DATE_ROZXODU === NULL
            const updated = await Sklad1.findByIdAndUpdate(id, {
                vyazalId,
                masterId,
                machineId,
                date_prixod,
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
    },

    getSklad: async (req, res) => {
        const sklad1 = await Sklad1.find({})
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
            .populate('vyazalId')
            .populate('masterId')
            .populate('machineId')
            .populate({path: 'changesId', select: 'firstName'})
        res.send(sklad1);
    },
    zalushok: async (req, res) => {
        try {
            const {day} = req.query;
            // const formattedStart = moment.unix(day / 1000).format('YYYY-MM-DD');
            // const formattedFinish = moment.unix(day / 1000).add(1, 'days').format('YYYY-MM-DD');
            const plusDay = moment(day).add(1, 'days').format('YYYY-MM-DD');
            console.log(new Date(plusDay))
            console.log(new Date(day))
            // console.log(new Date(formattedStart))
            // console.log(new Date(formattedFinish))
            //TODO DELETE $GTE (DAY)
            const agg = await Sklad1.find({
                $and:
                    [
                        {date_prixod: {$gte: new Date(day), $lte: new Date(plusDay)}},
                        {
                            $or: [
                                {date_rozxodu: {$gte: new Date(day), $lte: new Date(plusDay)}},
                                {date_rozxodu: null},
                            ]
                        }
                    ]
            })
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
                .populate('vyazalId')
                .populate('masterId')
                .populate('machineId')
                .populate({path: 'changesId', select: 'firstName'})
            res.json(agg)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
