const moment = require("moment");
const { Zvitu } = require('../../models/zvitu')

module.exports = {
    prixod: async (req, res) => {
        try {
            const prixod = await Zvitu.find({ date_rozxodu: null })
                .populate('operationId')
                .populate({ path: 'workerId', populate: { path: 'operationId' } })
                .populate('changesId');
            res.send(prixod);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    rozxodu: async (req, res) => {
        try {
            const rozxod = await Zvitu.find({ date_rozxodu: { $ne: null } })
                .populate('operationId')
                .populate({ path: 'workerId', populate: { path: 'operationId' } })
                .populate('changesId');
            res.send(rozxod);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    zalushok: async (req, res) => {
        try {
            const { day } = req.query;
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
                        { date_prixod: { /*$gte: new Date(day),*/ $lte: new Date(plusDay) } },
                        {
                            $or: [
                                { date_rozxodu: { /*$gte: new Date(day), */$lte: new Date(plusDay) } },
                                { date_rozxodu: null },
                            ]
                        }
                    ]
            })
                .populate('operationId')
                .populate({ path: 'workerId', populate: { path: 'operationId' } })
                .populate('changesId')
            res.json(agg)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    }
}
