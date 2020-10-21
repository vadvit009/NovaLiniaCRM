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
            const formatted = moment(new Date(Date(day))).format('YYYY-MM-DD')
            console.log(formatted);
            const aggregated = await Materials.aggregate([{
                $addFields: {
                    creationDate: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date_rozxodu"
                        }
                    }
                }
            },
                {
                    $match: {
                        $or: [
                            {creationDate: null},
                            {creationDate: formatted}]
                    }
                }
            ])
            res.json(aggregated)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
