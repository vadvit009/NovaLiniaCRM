const {Skladu: {Sklad2, Sklad3, Sklad4, Sklad1}, Roztsinka} = require("../../models");

const zarplataHelper = (skladArrayIds, skladu, roztsinka) => {

    const zp = {};

    skladu.map(sklad => {
            roztsinka.map(roz => {
                    skladArrayIds.map(personId => {
                            sklad[personId].operationId.map(oper => {
                                console.log("map person == ",personId)
                                    if (roz.operationId._id.equals(oper._id)) {
                                        if (roz.articleId === sklad.mishok.articleId || roz.articleId === null
                                            && roz.machineId === sklad.mishok.machineId || roz.machineId === null
                                            && roz.typeId === sklad.mishok.typeId || roz.typeId === null
                                            && roz.colorId === sklad.mishok.colorId || roz.colorId === null
                                            && roz.asortument === sklad.mishok.asortument || roz.asortument === null
                                            && roz.classId === sklad.mishok.classId || roz.classId === null
                                            && roz.seasonId === sklad.mishok.seasonId || roz.seasonId === null
                                            && roz.imageId === sklad.mishok.imageId || roz.imageId === null
                                            && roz.sizeId === sklad.mishok.sizeId || roz.sizeId === null) {

                                            if (!zp[sklad[personId]._id]) {
                                                zp[sklad[personId]._id] = {};
                                                if (!zp[sklad[personId]._id].zp && !zp[sklad[personId]._id].prod_quantity && !zp[sklad[personId]._id].zminu) {
                                                    zp[sklad[personId]._id] = {
                                                        zp: 0,
                                                        zminu: 0,
                                                        prod_quantity: 0
                                                    }
                                                }
                                            }
                                            if (roz.gatynok === 1) {

                                                zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok1
                                                zp[sklad[personId]._id].zminu = skladu.filter(skladById => {
                                                        skladById[personId].equals(sklad[personId]._id)
                                                        // console.log("skladByVyalazId v2 === === ", skladById.vyazalId)
                                                    }
                                                )
                                                zp[sklad[personId]._id].zminu = new Set(zp[sklad[personId]._id].zminu.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                                                zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok1

                                            } else if (roz.gatynok === 2) {
                                                // if (!zp[sklad[personId]._id]) {
                                                //     zp[sklad[personId]._id] = {};
                                                //     if (!zp[sklad[personId]._id].zp && !zp[sklad[personId]._id].prod_quantity && !zp[sklad[personId]._id].zminu) {
                                                //         zp[sklad[personId]._id] = {
                                                //             zp: 0,
                                                //             zminu: 0,
                                                //             prod_quantity: 0
                                                //         }
                                                //     }
                                                // }
                                                zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok2
                                                zp[sklad[personId]._id].zminu = skladu.filter(skladById =>
                                                    skladById[personId].equals(sklad[personId]._id)
                                                )
                                                zp[sklad[personId]._id].zminu = new Set(zp[sklad[personId]._id].zminu.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                                                zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok2
                                            } else if (roz.gatynok === 3) {
                                                // if (!zp[sklad[personId]._id]) {
                                                //     zp[sklad[personId]._id] = {};
                                                //     if (!zp[sklad[personId]._id].zp && !zp[sklad[personId]._id].prod_quantity && !zp[sklad[personId]._id].zminu) {
                                                //         zp[sklad[personId]._id] = {
                                                //             zp: 0,
                                                //             zminu: 0,
                                                //             prod_quantity: 0
                                                //         }
                                                //     }
                                                // }
                                                zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok3
                                                zp[sklad[personId]._id].zminu = skladu.filter(skladById =>
                                                    skladById[personId].equals(sklad[personId]._id)
                                                )
                                                zp[sklad[personId]._id].zminu = new Set(zp[sklad[personId]._id].zminu.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                                                zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok3
                                            }
                                        }
                                    }
                                }
                            )
                        }
                    )
                }
            )
        }
    )
    return zp
}

module.exports = {
    zpSklad1: async (req, res) => {

        const sklad1 = await Sklad1.find({})
            .populate(
                {
                    path: 'vyazalId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate(
                {
                    path: 'masterId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate('mishok');

        const roztsinka = await Roztsinka.find({})
            .populate(
                {
                    path: 'operationId',
                    options: {retainNullValues: true}
                }
            );

        res.json({zp_sklad1: zarplataHelper(['vyazalId', 'masterId'], sklad1, roztsinka)});
    },

    zpSklad2: async (req, res) => {
        const sklad2 = await Sklad2.find({})
            .populate(
                {
                    path: 'shveyaId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate(
                {
                    path: 'sortId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate('mishok');

        const roztsinka = await Roztsinka.find({})
            .populate(
                {
                    path: 'operationId',
                    options: {retainNullValues: true}
                }
            );
        res.json({zp_sklad2: zarplataHelper(['shveyaId', 'sortId'], sklad2, roztsinka)})
    },

    zpSklad3: async (req, res) => {
        const sklad3 = await Sklad3.find({})
            .populate(
                {
                    path: 'formId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate('mishok');

        const roztsinka = await Roztsinka.find({})
            .populate(
                {
                    path: 'operationId',
                    options: {retainNullValues: true}
                }
            );
        res.json({zp_sklad2: zarplataHelper(['formId'], sklad3, roztsinka)})
    },

    zpSklad4: async (req, res) => {
        const sklad4 = await Sklad4.find({})
            .populate(
                {
                    path: 'packId',
                    populate:
                        {path: 'operationId', options: {retainNullValues: true}}
                }
            ).populate('mishok');

        const roztsinka = await Roztsinka.find({})
            .populate(
                {
                    path: 'operationId',
                    options: {retainNullValues: true}
                }
            );
        res.json({zp_sklad2: zarplataHelper(['packId'], sklad4, roztsinka)})
    },
}
