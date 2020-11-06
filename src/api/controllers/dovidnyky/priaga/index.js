const {Dovidnyky: {Priaga: {Priaga}}} = require('../../../models');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
  prixodPriaga: async (req, res) => {
    try {
      const {
        user,
        price,
        quantity,
        vendorId,
        typeId,
        surovunaId,
        tovtshinaId,
        colorId,
        date_prixod,
      } = req.body;
      const created = await Priaga.create({
        price,
        quantity,
        vendorId,
        typeId,
        surovunaId,
        tovtshinaId,
        colorId,
        date_prixod,
        date_rozxodu: null,
        changesId: user._id,
      })
      res.json({prixodPriaga: created})
    } catch (e) {
      console.log(e);
      res.sendStatus(400)
    }
  },
  rozxodPriaga: async (req, res) => {
    try {
      let {
        user,
        quantity,
        vendorId,
        typeId,
        dilankaRozxodyId,
        surovunaId,
        tovtshinaId,
        colorId,
        date_rozxodu,
      } = req.body;
      const rozxidPriaga = await Priaga.find({date_rozxodu: null})
      let sum = 0;
      rozxidPriaga.forEach(priaga => {
        sum += priaga.quantity
      });
      if (quantity > sum) {
        res.send('No such Quantity').status(400)
      } else {
        const arrToRequest = rozxidPriaga.map(priaga => {
          if (priaga.quantity > quantity) {
            const rez = priaga.quantity - quantity
            quantity = 0
            console.log(rez)
            return {...priaga._doc, quantity: rez}
          } else if (priaga.quantity <= quantity) {
            quantity -= priaga.quantity
            return {...priaga._doc, quantity: 0}
          }
        });
        console.log(
          "arrToRequest === ", arrToRequest
        )
        arrToRequest.filter(Boolean).forEach(item => {
          Priaga.findByIdAndUpdate(item._id, {
            changesId: user._id,
            dilankaRozxodyId,
            date_rozxodu
          }, {new: true}).then(updatedPriaga => {
            console.log('item.quantity === ', item.quantity)
            Priaga.create({
              ...updatedPriaga._doc,
              quantity: item.quantity,
              copyId: [item._id],
              date_rozxodu: null,
              _id: new mongoose.Types.ObjectId()
            }).then(created => {
              console.log(created)
            }).catch(e => {
              console.log(e)
              res.sendStatus(400)
            })
          }).catch(e => {
            console.log(e);
            res.sendStatus(400)
          })
        })
        res.sendStatus(200)
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
      const agg = await Priaga.find({
        $and:
          [
            {date_prixod: {$lte: new Date(plusDay)}},
            {
              $or: [
                {date_rozxodu: {$gte: new Date(day)}},
                {date_rozxodu: null},
              ]
            }
          ]
      })
        .populate('surovunaId')
        .populate('tovtshinaId')
        .populate('vendorId')
        .populate('typeId')
        .populate('dilankaRozxodyId')
        .populate('colorId')
      res.json(agg)
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  },
  getPriaga: async (req, res) => {
    const {from, to, fromRozxod, toRozxod} = req.query;
    if (from && to) {
      const priaga = await Priaga.find({date_prixod: {$gte: new Date(from), $lte: new Date(to)}})
        .populate('surovunaId')
        .populate('tovtshinaId')
        .populate('vendorId')
        .populate('typeId')
        .populate('dilankaRozxodyId')
        .populate('colorId')
      res.send(priaga)
    } else if (fromRozxod && toRozxod) {
      const priaga = await Priaga.find({date_rozxodu: {$gte: new Date(fromRozxod), $lte: new Date(toRozxod)}})
        .populate('surovunaId')
        .populate('tovtshinaId')
        .populate('vendorId')
        .populate('typeId')
        .populate('dilankaRozxodyId')
        .populate('colorId')
      res.send(priaga)
    } else {
      const priaga = await Priaga.find()
        .populate('surovunaId')
        .populate('tovtshinaId')
        .populate('vendorId')
        .populate('typeId')
        .populate('dilankaRozxodyId')
        .populate('colorId')
      res.send(priaga)
    }
  },
  getSingle: async (req, res) => {
    const {id} = req.params;
    const priaga = await Priaga.findById(id)
      .populate('surovunaId')
      .populate('tovtshinaId')
      .populate('vendorId')
      .populate('typeId')
      .populate('dilankaRozxodyId')
      .populate('colorId')
    res.send(priaga)
  },
  patchPriaga: async (req, res) => {
    const {
      user,
      quantity,
      vendorId,
      typeId,
      dilankaRozxodyId,
      surovunaId,
      tovtshinaId,
      colorId,
      date_rozxodu,
    } = req.body;
    const {id} = req.params;
    const priaga = await Priaga.findByIdAndUpdate(id, {
      quantity,
      vendorId,
      typeId,
      dilankaRozxodyId,
      surovunaId,
      tovtshinaId,
      colorId,
      date_rozxodu,
      changesId: user._id
    }, {new: true})
      .populate('surovunaId')
      .populate('tovtshinaId')
      .populate('vendorId')
      .populate('typeId')
      .populate('dilankaRozxodyId')
      .populate('colorId')
    res.send(priaga)
  }
}
