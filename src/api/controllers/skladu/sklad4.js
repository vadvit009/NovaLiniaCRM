const moment = require("moment");
const {getNextSequence} = require("../../utils/getNextId");

const {
  Skladu: {Sklad1, Sklad4, Sklad3, Sklad2},
  Mishku
} = require('../../models');

module.exports = {
  pruxodSklad4: async (req, res) => {
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

      const sklad4 = await Sklad4.create({
        vyazalId,
        masterId,
        machineId,
        date_prixod,
        date_rozsxodu: null,
        mishok: mishok._id,
        changesId: user._id,
        deletedAt: null
      });

      res.send(sklad4);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  },
  updateSklad4: async (req, res) => {
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
        classId,
        articleId,
      } = req.body;
      const {id} = req.params;

      const updated = await Sklad1.findByIdAndUpdate(id, {
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
        classId,
        articleId,
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
    const rozxidSklad2 = await Sklad2.create({
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
      .populate('packId')
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
      const agg = await Sklad4.find({
        $and:
          [
            {date_prixod: {$lte: new Date(plusDay)}},
            {
              $or: [
                {date_rozsxodu: {$gte: new Date(day)}},
                {date_rozsxodu: null},
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
        .populate('packId')
        .populate({path: 'changesId', select: 'firstName'})
      res.json(agg)
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  },
  getSklad: async (req, res) => {
    const {from, to, fromRozxod, toRozxod} = req.query;
    if (from && to) {
      const sklad2 = await Sklad4.find({date_prixod: {$gte: new Date(from), $lte: new Date(to)}})
        .populate({
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
        .populate('packId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad2);
    } else if (fromRozxod && toRozxod) {
      const sklad2 = await Sklad4.find({date_rozsxodu: {$gte: new Date(fromRozxod), $lte: new Date(toRozxod)}})
        .populate({
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
        .populate('packId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad2);
    } else {
      const sklad2 = await Sklad4.find({})
        .populate({
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
        .populate('packId')
        .populate({path: 'changesId', select: 'firstName'})
      res.send(sklad2);
    }
  },
  delete: async (req, res) => {
    const {id} = req.params;
    const {date_rozsxodu, mishok} = await Sklad4.findById(id);
    if (!date_rozsxodu) {
      await Sklad3.findOneAndUpdate({mishok}, {date_rozsxodu: null}, {new: true})
      await Sklad4.findByIdAndRemove(id);
      res.sendStatus(200)
    } else res.sendStatus(400)
  }
}
