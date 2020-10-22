const {Dovidnyky: {Materials: {Materials}}} = require('../../../models');
const moment = require('moment');

module.exports = {
    prixodMaterials: async (req, res) => {
        try {
            const {
                user,
                price,
                quantity,
                vendorId,
                typeId,
                paramsId,
                paramsValueId,
                date_prixod,
            } = req.body;
            const created = await Materials.create({
                price,
                quantity,
                vendorId,
                typeId,
                paramsId,
                paramsValueId,
                date_prixod,
                date_rozxodu: null,
                changesId: user._id,
            })
            res.json({prixodMaterials: created})
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    rozxodMaterials: async (req, res) => {
        try {
            const {
                user,
                quantity,
                vendorId,
                typeId,
                dilankaId,
                paramsId,
                paramsValueId,
                date_rozxodu,
            } = req.body;
            const {id} = req.params;
            const updated = await Materials.findByIdAndUpdate(id, {
                quantity,
                vendorId,
                typeId,
                dilankaId,
                paramsId,
                paramsValueId,
                date_rozxodu,
                changesId: user._id,
            })
            res.json({rozxodMaterials: updated})
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    zalushok: async (req, res) => {
        try {
            const {day} = req.query;
            // const formattedStart = moment.unix(day / 1000).format('YYYY-MM-DD');
            // const formattedFinish = moment.unix(day / 1000).add(1, 'days').format('YYYY-MM-DD');
            const plusDay = moment(day).add(1,'days').format('YYYY-MM-DD');
            console.log(new Date(plusDay))
            console.log(new Date(day))
            // console.log(new Date(formattedStart))
            // console.log(new Date(formattedFinish))
            const agg = await Materials.find({
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
                .populate('paramsValueId')
                .populate('paramsId')
                .populate('vendorId')
                .populate('typeId')
            res.json(agg)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
