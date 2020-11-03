const {Dovidnyky: {Materials: {Materials}}} = require('../../../models');
const moment = require('moment');
const mongoose = require('mongoose')

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
      let {
        user,
        quantity,
        vendorId,
        typeId,
        dilankaId,
        paramsId,
        paramsValueId,
        date_rozxodu,
      } = req.body;
      const rozxidMaterials = await Materials.find({date_rozxodu: null});
      let sum = 0
      rozxidMaterials.forEach(material => {
        sum += material.quantity
      })
      if (quantity > sum) {
        res.send('No such Quantity').status(400)
      } else {
        const arrToRequest = rozxidMaterials.map(material => {
          if (material.quantity > quantity) {
            const rez = material.quantity - quantity
            quantity = 0
            return {...material._doc, quantity: rez}
          } else if (material.quantity <= quantity) {
            quantity -= material.quantity
            return {...material._doc, quantity: 0}
          }
        })
        console.log("arrToRequest ===", arrToRequest);
        arrToRequest.filter(Boolean).forEach(item => {
          Materials.findByIdAndUpdate(item._id,
            {
              changesId: user._id,
              dilankaId,
              date_rozxodu
            }, {new: true})
            .then(updatedMaterials => {
              console.log("item === ", item)
              Materials.create({
                ...updatedMaterials._doc,
                quantity: item.quantity,
                _id: new mongoose.Types.ObjectId(),
                copyId: [item._id],
                date_rozxodu: null
              }).then((created) => {
                console.log("created === ", created)
              }).catch(e => {
                console.log(e)
                res.sendStatus(400)
              })
            }).catch(e => {
            console.log(e)
            res.sendStatus(400)
          })
        })
        res.sendStatus(200)
      }

      // res.json({rozxodMaterials: updated})
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
      const agg = await Materials.find({
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
        .populate('paramsValueId')
        .populate('paramsId')
        .populate('vendorId')
        .populate('typeId')
      res.json(agg)
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  }
}
