const {Skladu: {Sklad2, Sklad3, Sklad4, Sklad1}, Roztsinka, Dovidnyky: {Workers: {Worker}}, Zvitu} = require("../../models");
// const {ObjectId} = require("mongoose").Types;

const zarplataHelper = (skladArrayIds, skladu, roztsinka) => {
  const zp = {};

  skladu.map(sklad => {
      roztsinka.map(roz => {
          skladArrayIds.map(personId => {
              sklad[personId].operationId.map(oper => {
                  if (roz.operationId._id.equals(oper._id)) {
                    if ((sklad.mishok.articleId.equals(roz.articleId) || roz.articleId === null)
                      && (sklad.mishok.typeId.equals(roz.typeId) || roz.typeId === null)
                      && (sklad.mishok.colorId.equals(roz.colorId) || roz.colorId === null)
                      && (sklad.mishok.asortumentId.equals(roz.asortument) || roz.asortument === null)
                      && (sklad.mishok.classId.equals(roz.classId) || roz.classId === null)
                      && (sklad.mishok.seasonId.equals(roz.seasonId) || roz.seasonId === null)
                      && (sklad.mishok.imageId.equals(roz.imageId) || roz.imageId === null)
                      && (sklad.mishok.sizeId.equals(roz.sizeId) || roz.sizeId === null)
                      && (+sklad.date_rozsxodu >= +roz.startDate && +sklad.date_rozsxodu <= +roz.endDate)
                    ) {
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
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
                        zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok1

                      } else if (roz.gatynok === 2) {
                        zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok2
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
                        zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok2
                      } else if (roz.gatynok === 3) {
                        zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok3
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
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

const zarplata1Helper = (skladArrayIds, skladu, roztsinka) => {
  const zp = {};
  skladu.map(sklad => {
      roztsinka.map(roz => {
          skladArrayIds.map(personId => {
              sklad[personId].operationId.map(oper => {
                  if (roz.operationId._id.equals(oper._id)) {
                    // console.log('here', (+sklad.date_rozsxodu >= +roz.startDate && +sklad.date_rozsxodu <= +roz.endDate))
                    if ((sklad.mishok.articleId.equals(roz.articleId) || roz.articleId === null)
                      && (sklad.mishok.typeId.equals(roz.typeId) || roz.typeId === null)
                      && (sklad.mishok.colorId.equals(roz.colorId) || roz.colorId === null)
                      && (sklad.mishok.asortumentId.equals(roz.asortument) || roz.asortument === null)
                      && (sklad.mishok.classId.equals(roz.classId) || roz.classId === null)
                      && (sklad.mishok.seasonId.equals(roz.seasonId) || roz.seasonId === null)
                      && (sklad.mishok.imageId.equals(roz.imageId) || roz.imageId === null)
                      && (sklad.mishok.sizeId.equals(roz.sizeId) || roz.sizeId === null)
                      && (sklad.machineId.equals(roz.machineId) || roz.machineId === null)
                      && (+sklad.date_rozsxodu >= +roz.startDate && +sklad.date_rozsxodu <= +roz.endDate)
                    ) {
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
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
                        zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok1

                      } else if (roz.gatynok === 2) {
                        zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok2
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
                        zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok2

                      } else if (roz.gatynok === 3) {
                        zp[sklad[personId]._id].zp += roz.price * sklad.mishok.gatynok3
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
                        zp[sklad[personId]._id].prod_quantity += sklad.mishok.gatynok3
                      } else if (!roz.gatynok) {
                        zp[sklad[personId]._id].zp += (roz.price * sklad.mishok.gatynok3 + roz.price * sklad.mishok.gatynok2 + roz.price * sklad.mishok.gatynok1)
                        const filtered = skladu.filter(skladById =>
                          skladById[personId].equals(sklad[personId]._id))
                        const zmina = new Set(filtered.map(zmina => zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
                        zp[sklad[personId]._id].zminu = zmina
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
    try {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const sklad1 = await Sklad1.find({date_rozsxodu: {$gte: firstDay, $lte: lastDay}})
        .populate(
          {
            path: 'vyazalId',
            populate:
              {path: 'operationId'}
          }
        ).populate(
          {
            path: 'masterId',
            populate:
              {path: 'operationId',}
          }
        ).populate('mishok');

      const roztsinka = await Roztsinka.find({})
        .populate(
          {
            path: 'operationId',
            options: {retainNullValues: true}
          }
        );
      // console.log(sklad1)
      const zp = zarplata1Helper(['vyazalId', 'masterId'], sklad1, roztsinka);
      res.json({zp_sklad1: zp});
    } catch (e) {
      console.log(e);
      res.sendStatus(400)
    }
  },

  zpSklad2: async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const sklad2 = await Sklad2.find({date_rozsxodu: {$gte: firstDay, $lte: lastDay}})
      .populate(
        {
          path: 'shveyaId',
          populate:
            {path: 'operationId'}
        }
      ).populate(
        {
          path: 'sortId',
          populate:
            {path: 'operationId'}
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
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const sklad3 = await Sklad3.find({date_rozsxodu: {$gte: firstDay, $lte: lastDay}})
      .populate(
        {
          path: 'formId',
          populate:
            {path: 'operationId'}
        }
      ).populate('mishok');

    const roztsinka = await Roztsinka.find({})
      .populate(
        {
          path: 'operationId',
          options: {retainNullValues: true}
        }
      );
    res.json({zp_sklad3: zarplataHelper(['formId'], sklad3, roztsinka)})
  },

  zpSklad4: async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const sklad4 = await Sklad4.find({date_rozsxodu: {$gte: firstDay, $lte: lastDay}})
      .populate(
        {
          path: 'packId',
          populate:
            {path: 'operationId'}
        }
      ).populate('mishok');

    const roztsinka = await Roztsinka.find({})
      .populate({path: 'operationId'});

    res.json({zp_sklad4: zarplataHelper(['packId'], sklad4, roztsinka)})
  },

  zpRest: async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const zvitu = await Zvitu.find({date_rozsxodu: {$gte: firstDay, $lte: lastDay}})
      .populate('operationId')
      .populate({path: 'workerId', populate: {path: 'operationId'}})
      .populate('changesId');

    const roztsinka = await Roztsinka.find({})
      .populate(
        {
          path: 'operationId',
          options: {retainNullValues: true}
        }
      );
    console.log(zvitu)
    const zp = {};
    zvitu.map(zvit => {
      roztsinka.map(roz => {
        if (zvit.operationId._id.equals(roz.operationId._id)) {
          if (!zp[zvit.workerId._id]) {
            zp[zvit.workerId._id] = {}
            zp[zvit.workerId._id].zp = 0
            zp[zvit.workerId._id].zminu = 0
            zp[zvit.workerId._id].prod_quantity = 0
          }
          if (roz.gatynok === 1) {
            zp[zvit.workerId._id].zp += roz.price * zvit.gatynok1
            zp[zvit.workerId._id].prod_quantity += zvit.gatynok1
            const filtered = zvitu.filter(workerZvit =>
              workerZvit.workerId._id.equals(zvit.workerId._id)
            );
            const zmina = new Set(filtered.map(zmina =>
              zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
            zp[zvit.workerId._id].zminu = zmina
          }
          if (roz.gatynok === 2) {
            zp[zvit.workerId._id].zp += roz.price * zvit.gatynok2
            zp[zvit.workerId._id].prod_quantity += zvit.gatynok2
            const filtered = zvitu.filter(workerZvit =>
              workerZvit.workerId._id.equals(zvit.workerId._id)
            );
            const zmina = new Set(filtered.map(zmina =>
              zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
            zp[zvit.workerId._id].zminu = zmina
          }
          if (roz.gatynok === 3) {
            zp[zvit.workerId._id].zp += roz.price * zvit.gatynok3
            zp[zvit.workerId._id].prod_quantity += zvit.gatynok3
            const filtered = zvitu.filter(workerZvit =>
              workerZvit.workerId._id.equals(zvit.workerId._id)
            );
            const zmina = new Set(filtered.map(zmina =>
              zmina.createdAt.toJSON().slice(0, 10).split`-`.join``)).size
            zp[zvit.workerId._id].zminu = zmina
          }
        }
      })
    })
    res.send(zp)
  }
}
