const {Skladu: {Sklad2, Sklad3, Sklad4, Sklad1}, Roztsinka} = require("../../models");

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

        const zp = {};

        sklad1.map(sklad =>
            roztsinka.map(roz => {
                    sklad.vyazalId.operationId.map(oper => {
                            if (roz.operationId._id.equals(oper._id)) {
                                if (roz.gatynok === 1) {
                                    if (!zp[sklad.vyazalId._id]) {
                                        zp[sklad.vyazalId._id] = 0
                                    }
                                    zp[sklad.vyazalId._id] += roz.price * sklad.mishok.gatynok1
                                } else if (roz.gatynok === 2) {
                                    if (!zp[sklad.vyazalId._id]) {
                                        zp[sklad.vyazalId._id] = 0
                                    }
                                    zp[sklad.vyazalId._id] += roz.price * sklad.mishok.gatynok2
                                }
                                if (roz.gatynok === 3) {
                                    if (!zp[sklad.vyazalId._id]) {
                                        zp[sklad.vyazalId._id] = 0
                                    }
                                    zp[sklad.vyazalId._id] += roz.price * sklad.mishok.gatynok3
                                }
                            }
                        }
                    );
                    sklad.masterId.operationId.map(oper => {
                            if (roz.operationId._id.equals(oper._id)) {
                                if (roz.gatynok === 1) {
                                    if (!zp[sklad.masterId._id]) {
                                        zp[sklad.masterId._id] = 0
                                    }
                                    zp[sklad.masterId._id] += roz.price * sklad.mishok.gatynok1
                                } else if (roz.gatynok === 2) {
                                    if (!zp[sklad.masterId._id]) {
                                        zp[sklad.masterId._id] = 0
                                    }
                                    zp[sklad.masterId._id] += roz.price * sklad.mishok.gatynok2
                                }
                                if (roz.gatynok === 3) {
                                    if (!zp[sklad.masterId._id]) {
                                        zp[sklad.masterId._id] = 0
                                    }
                                    zp[sklad.masterId._id] += roz.price * sklad.mishok.gatynok3
                                }
                            }
                        }
                    )
                }
            )
        );
        res.json({zp_sklad1:zp});
    },

    zpSklad2: async (req, res) => {

    },

    zpSklad3: async (req, res) => {

    },

    zpSklad4: async (req, res) => {

    },
}
