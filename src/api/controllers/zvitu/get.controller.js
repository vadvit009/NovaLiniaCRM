const moment = require("moment");
const {Zvitu} = require('../../models/zvitu')

module.exports = {
    prixod: async (req, res) => {
        try {
            const {operationId, from, to} = req.query;
            console.log(req.query)
            if (operationId && from && to) {
                const prixod = await Zvitu.find({
                    date_rozxodu: null,
                    operationId: operationId,
                    date_prixodu: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    }
                })
                    .populate('operationId')
                    .populate({path: 'workerId', populate: {path: 'operationId'}})
                    .populate('changesId');
                res.send(prixod);
            } else {
                const prixod = await Zvitu.find({date_rozxodu: null})
                    .populate('operationId')
                    .populate({path: 'workerId', populate: {path: 'operationId'}})
                    .populate('changesId');
                res.send(prixod);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    rozxodu: async (req, res) => {
        try {
            const {operationId, from, to} = req.query;
            if (operationId && from && to) {
                const rozxod = await Zvitu.find({
                    date_rozxodu: {$ne: null},
                    operationId: operationId,
                    date_rozxodu: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    }
                })
                    .populate('operationId')
                    .populate({path: 'workerId', populate: {path: 'operationId'}})
                    .populate('changesId');
                res.send(rozxod);
            } else {
                const rozxod = await Zvitu.find({date_rozxodu: {$ne: null}})
                    .populate('operationId')
                    .populate({path: 'workerId', populate: {path: 'operationId'}})
                    .populate('changesId');
                res.send(rozxod);
            }
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
            const plusDay = moment(day).add(1, 'days').format('YYYY-MM-DD');
            console.log(new Date(plusDay))
            console.log(new Date(day))

            // console.log(new Date(formattedStart))
            // console.log(new Date(formattedFinish))
            const agg = await Zvitu.find({
                $and:
                    [
                        {date_prixodu: {$lte: new Date(plusDay)}},
                        {
                            $or: [
                                {date_rozxodu: {$lte: new Date(plusDay)}},
                                {date_rozxodu: null},
                            ]
                        }
                    ]
            })
                .populate('operationId')
                .populate({path: 'workerId', populate: {path: 'operationId'}})
                .populate('changesId')
            res.json(agg)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
