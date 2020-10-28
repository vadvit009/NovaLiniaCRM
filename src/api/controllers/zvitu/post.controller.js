const { Zvitu } = require('../../models/zvitu');
const mongoose = require('mongoose');

module.exports = {
    prixodZvitu: async (req, res) => {
        try {
            const { user, operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu } = req.body;
            const prixodZvitu = await Zvitu.create({
                operationId,
                workerId,
                gatynok1,
                gatynok2,
                gatynok3,
                date_prixodu,
                date_rozxodu: null,
                changesId: user._id
            });
            res.send(prixodZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    rozxidZvitu: async (req, res) => {
        try {
            let { user, operationId, workerId, gatynok1, gatynok2, gatynok3, date_rozxodu } = req.body;
            const rozxidZvitu = await Zvitu.find({ date_rozxodu: null });
            const sum = {
                gatynok1: 0,
                gatynok2: 0,
                gatynok3: 0,
            };
            rozxidZvitu.forEach(zvit => {
                sum.gatynok1 += zvit.gatynok1
                sum.gatynok2 += zvit.gatynok2
                sum.gatynok3 += zvit.gatynok3
            })
            // const arrToRequest = [];

            if (sum.gatynok1 < gatynok1 /*&& sum.gatynok2 < gatynok2 && sum.gatynok3 < gatynok3*/) {
                return res.status(400).send('No such Quantity')
            } else {
                const arrToRequest = rozxidZvitu.map(zvit => {
                    if (gatynok1 > 0) {
                        if (zvit.gatynok1 > gatynok1) {
                            gatynok1 = 0
                            return { ...zvit._doc, gatynok1: zvit.gatynok1 - gatynok1 }
                            // arrToRequest.push({...zvit._doc, gatynok1: zvit.gatynok1 - gatynok1})
                        } else if (zvit.gatynok1 <= gatynok1) {
                            // arrToRequest.push({...zvit._doc, gatynok1: 0})
                            gatynok1 -= zvit.gatynok1
                            return { ...zvit._doc, gatynok1: 0 }
                        }
                    }
                })
                console.log("arrToRequest ===", arrToRequest)

                arrToRequest.filter(Boolean)
                    .forEach(item => {
                        console.log("item === ", item)
                        Zvitu.findByIdAndUpdate(item._id,
                            {
                                ...item,
                                changesId: user._id,
                                date_rozxodu
                            },
                            { new: true })
                            .then((updatedZvit) => {
                                console.log("updatedZvit === ", updatedZvit._doc)
                                Zvitu.create({
                                    ...updatedZvit._doc,
                                    _id: new mongoose.Types.ObjectId(),
                                    date_rozxodu: null
                                })
                                    .then((created) => {
                                        console.log("created === ", created)
                                    })
                                    .catch(e => {
                                        console.log(e)
                                        res.sendStatus(400)
                                    })
                            })
                            .catch(e => {
                                console.log(e)
                                res.sendStatus(400)
                            })
                    })
                res.sendStatus(200);
            }
            // if (zvit.gatynok1 <= gatynok1) {
            //     Zvitu.findByIdAndUpdate(zvit._id, {
            //         $inc: {gatynok1: -zvit.gatynok1},
            //         date_rozxodu: Date.now()
            //     }, {new: true})
            //         .then((changedZvit) => {
            //             console.log("updatedZvit === ", {...changedZvit._doc, date_rozxodu: null})
            //             gatynok1 = gatynok1 - zvit.gatynok1
            //             Zvitu.create({
            //                 ...changedZvit._doc,
            //                 _id: new mongoose.Types.ObjectId(),
            //                 date_rozxodu: null
            //             })
            //                 .then((created) => {
            //                     console.log("created === ", created)
            //                 })
            //                 .catch(e => {
            //                     console.log(e)
            //                     res.sendStatus(400)
            //                 })
            //         })
            //         .catch(e => {
            //             console.log(e)
            //             res.sendStatus(400)
            //         })
            // } else if (zvit.gatynok1 >= gatynok1) {
            //     Zvitu.findByIdAndUpdate(zvit._id, {
            //         $inc: {gatynok1: -gatynok1},
            //         date_rozxodu: Date.now()
            //     }, {new: true})
            //         .then(updatedZvit => {
            //             gatynok1 = gatynok1 - zvit.gatynok1
            //             console.log("updatedZvit === ", updatedZvit)
            //             Zvitu.create({
            //                 ...updatedZvit._doc,
            //                 _id: new mongoose.Types.ObjectId(),
            //                 date_rozxodu: null
            //             })
            //                 .then((created) => {
            //                     console.log("created === ", created)
            //                 })
            //                 .catch(e => {
            //                     console.log(e)
            //                     res.sendStatus(400)
            //                 })
            //         })
            //         .catch(e => {
            //             console.log(e);
            //             res.sendStatus(400)
            //         })
            //     console.log(zvit, gatynok1)
            // }
            // if (zvit.gatynok2 >= gatynok2) {
            // }
            // if (zvit.gatynok3 >= gatynok3) {
            // }


            // const rozxidZvitu = await Zvitu.find({
            //     operationId: operationId,
            //     workerId: workerId,
            //     date_prixodu: {$gte: date_prixodu}
            // });
            // res.send(rozxidZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    }
}
