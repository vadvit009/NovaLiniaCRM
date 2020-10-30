const {Zvitu} = require('../../models/zvitu');
const {Dovidnyky: {Workers: {Worker}}} = require('../../models')
const mongoose = require('mongoose');

module.exports = {
    prixodZvitu: async (req, res) => {
        try {
            const {user, operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu} = req.body;
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
            let {user, operationId, workerId, gatynok1, gatynok2, gatynok3, date_rozxodu} = req.body;
            const rozxidZvitu = await Zvitu.find({date_rozxodu: null, workerId: workerId, operationId: operationId});
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

            if (sum.gatynok1 < gatynok1 && sum.gatynok2 < gatynok2 && sum.gatynok3 < gatynok3) {
                return res.status(400).send('No such Quantity')
            } else {
                const arrToRequest = rozxidZvitu.map(zvit => {
                    if (gatynok1 > 0 && gatynok3 > 0 && gatynok2 > 0) {
                        if (zvit.gatynok1 > gatynok1 && zvit.gatynok2 > gatynok2 && zvit.gatynok3 > gatynok3) {
                            const rez1 = zvit.gatynok1 - gatynok1;
                            const rez2 = zvit.gatynok2 - gatynok2;
                            const rez3 = zvit.gatynok3 - gatynok3;
                            gatynok1 = 0
                            gatynok2 = 0
                            gatynok3 = 0
                            return {...zvit._doc, gatynok1: rez1, gatynok2: rez2, gatynok3: rez3}
                        } else if (zvit.gatynok1 <= gatynok1 && zvit.gatynok2 <= gatynok2 && zvit.gatynok3 <= gatynok3) {
                            gatynok1 -= zvit.gatynok1
                            gatynok2 -= zvit.gatynok2
                            gatynok3 -= zvit.gatynok3
                            return {...zvit._doc, gatynok1: 0, gatynok2: 0, gatynok3: 0,}
                        }
                    }
                })
                console.log("arrToRequest ===", arrToRequest)

                arrToRequest.filter(Boolean)
                    .forEach(item => {
                        console.log("item === ", item)

                        Zvitu.findByIdAndUpdate(item._id,
                            {
                                changesId: user._id,
                                date_rozxodu
                            },
                            {new: true})
                            .then((updatedZvit) => {
                                console.log("updatedZvit === ", updatedZvit._doc)
                                Zvitu.create({
                                    ...updatedZvit._doc,
                                    gatynok1: item.gatynok1,
                                    _id: new mongoose.Types.ObjectId(),
                                    copyId: [item._id],
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
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    }
}
