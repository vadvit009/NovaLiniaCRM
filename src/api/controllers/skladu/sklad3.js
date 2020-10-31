const moment = require("moment");
const {getNextSequence} = require("../../utils/getNextId");

const {
    Skladu: {Sklad1, Sklad4, Sklad3, Sklad2},
} = require('../../models');

module.exports = {
    pruxodSklad3: async (req, res) => {
        try {
            const {
                user,
                formId,
                date_prixod,

                gatynok1,
                gatynok2,
                gatynok3,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                seasonId,
                classId,
                articleId,
            } = req.body;

            const mishok = await Mishku.create({
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                seasonId,
                barcode: await getNextSequence('barcode'),
                classId,
                articleId,
                date_prixod,
                gatynok1,
                gatynok2,
                gatynok3,
                changesId: user._id,
            });

            const sklad3 = await Sklad3.create({
                formId,
                date_prixod,
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

    updateSklad3: async (req, res) => {
        try {
            const {
                user,
                formId,
                date_prixod,
                mishok
            } = req.body;
            const {id} = req.params;

            const updated = await Sklad3.findByIdAndUpdate(id, {
                formId,
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
    rozxidToSklad2: async (req, res) => {
        const {user, mishok, date_rozsxodu, shveyId, sortId} = req.body;
        const rozxidSklad2 = await Sklad3.create({
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
            .populate('formId')
            .populate('changesId')
        res.send(rozxidSklad4)
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
            const agg = await Sklad3.find({
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
            }).populate({
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
                .populate('formId')
                .populate({path: 'changesId', select: 'firstName'})
            res.json(agg)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
