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
        seasonId,
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

      res.send({mishokId: mishok._id, barcode: mishok.barcode});
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
        seasonId,
        classId,
        articleId,
      } = req.body;
      const {id} = req.params;
      const isDateRozxoduNull = await Sklad1.findById(id);
      if (isDateRozxoduNull.date_rozsxodu === null) {
        const updated = await Mishku.findByIdAndUpdate(isDateRozxoduNull.mishok, {
          vyazalId,
          masterId,
          machineId,
          date_prixod,
          gatynok1,
          seasonId,
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
        }, {new: true})
        res.send(updated);
      } else res.sendStatus(400);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  },
  rozxidToSklad2: async (req, res) => {
    const {skladId, user, mishok, date_rozsxodu, shveyaId, sortId} = req.body;
    const rozxidSklad2 = await Sklad2.create({
      changesId: user._id,
      mishok,
      date_rozsxodu: null,
      date_prixod:new Date(),
      shveyaId,
      sortId,
      createdAt: Date.now(),
      deletedAt: null
    });
    const updatedSklad1 = await Sklad1.findByIdAndUpdate(skladId, {
      dilanka: 2,
      date_rozsxodu: date_rozsxodu
    }, {new: true});
    console.log(updatedSklad1)
    res.send(rozxidSklad2)
  },
  rozxidToSklad3: async (req, res) => {
    const {skladId, user, mishok, date_rozsxodu, formId} = req.body;
    const rozxidSklad3 = await Sklad3.create({
      changesId: user._id,
      mishok,
      date_prixod:new Date(),
      date_rozsxodu: null,
      formId,
      createdAt: Date.now(),
      deletedAt: null
    });
    const updatedSklad1 = await Sklad1.findByIdAndUpdate(skladId, {
      dilanka: 3,
      date_rozsxodu: date_rozsxodu
    }, {new: true});
    res.send(rozxidSklad3)
  },
  rozxidToSklad4: async (req, res) => {
    const {skladId, user, mishok, date_rozsxodu, packId} = req.body;
    const rozxidSklad4 = await Sklad4.create({
      changesId: user._id,
      mishok,
      date_prixod:new Date(),
      date_rozsxodu: null,
      packId,
      createdAt: Date.now(),
      deletedAt: null
    });
    const updatedSklad1 = await Sklad1.findByIdAndUpdate(skladId, {
      dilanka: 4,
      date_rozsxodu: date_rozsxodu
    }, {new: true});
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
    const {from, to, fromRozxod, toRozxod} = req.query;
    if (from && to) {
      const sklad1 = await Sklad1.find({date_prixod: {$gte: new Date(from), $lte: new Date(to)}})
        .populate({
          path: 'mishok',
          populate: {path: "asortumentId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "imageId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "colorId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "typeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "sizeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "classId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "seasonId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "articleId", select: "name"}
        })
        .populate('vyazalId')
        .populate('masterId')
        .populate('machineId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad1);
    } else if (fromRozxod && toRozxod) {
      const sklad1 = await Sklad1.find({date_rozsxodu: {$gte: new Date(fromRozxod), $lte: new Date(toRozxod)}})
        .populate({
          path: 'mishok',
          populate: {path: "asortumentId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "imageId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "colorId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "seasonId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "typeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "sizeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "classId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "articleId", select: "name"}
        })
        .populate('vyazalId')
        .populate('masterId')
        .populate('machineId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad1);
    } else {
      const sklad1 = await Sklad1.find({})
        .populate({
          path: 'mishok',
          populate: {path: "asortumentId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "imageId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "colorId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "seasonId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "typeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "sizeId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "classId", select: "name"}
        })
        .populate({
          path: 'mishok',
          populate: {path: "articleId", select: "name"}
        })
        .populate('vyazalId')
        .populate('masterId')
        .populate('machineId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad1);
    }
  },
  zalushok: async (req, res) => {
    try {
      const {day, mishok} = req.query;
      // const formattedStart = moment.unix(day / 1000).format('YYYY-MM-DD');
      // const formattedFinish = moment.unix(day / 1000).add(1, 'days').format('YYYY-MM-DD');
      const plusDay = moment(day).add(1, 'days').format('YYYY-MM-DD');
      console.log(new Date(plusDay))
      console.log(new Date(day))
      // console.log(new Date(formattedStart))
      // console.log(new Date(formattedFinish))
      if (mishok) {
        const agg = await Sklad1.find({
          $and:
            [
              {mishok: mishok},
              {date_prixod: {$lte: new Date(plusDay)}},
              {
                $or: [
                  {date_rozxodu: {$gte: new Date(plusDay)}},
                  {date_rozxodu: null},
                ]
              },
            ]
        })
          .populate({
            path: 'mishok',
            populate: {path: "asortumentId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "imageId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "colorId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "typeId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "sizeId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "classId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "articleId", select: "name"}
          })
          .populate('vyazalId')
          .populate('masterId')
          .populate('machineId')
          .populate({path: 'changesId', select: 'firstName'})
        res.json(agg)
      } else {
        const agg = await Sklad1.find({
          $and:
            [
              {date_prixod: {$lte: new Date(plusDay)}},
              {
                $or: [
                  {date_rozxodu: {$lte: new Date(plusDay)}},
                  {date_rozxodu: null},
                ]
              }
            ]
        })
          .populate({
            path: 'mishok',
            populate: {path: "asortumentId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "imageId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "colorId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "typeId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "sizeId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "classId", select: "name"}
          })
          .populate({
            path: 'mishok',
            populate: {path: "articleId", select: "name"}
          })
          .populate('vyazalId')
          .populate('masterId')
          .populate('machineId')
          .populate({path: 'changesId', select: 'firstName'})
        res.json(agg)
      }
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  },
  getSingleSklad1: async (req, res) => {
    const {id} = req.params;
    const readed = await Sklad1.findById(id).populate({
      path: 'mishok',
      populate: {path: "asortumentId", select: "name"}
    })
      .populate({
        path: 'mishok',
        populate: {path: "imageId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "colorId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "seasonId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "typeId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "sizeId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "classId", select: "name"}
      })
      .populate({
        path: 'mishok',
        populate: {path: "articleId", select: "name"}
      })
      .populate('vyazalId')
      .populate('masterId')
      .populate('machineId')
      .populate({path: 'changesId', select: 'firstName'})
    res.send(readed)
  }
}
