const {Dovidnyky: {Materials: {MaterialsParams}}} = require('../../../models');

module.exports = {
  createMaterialsParams: async (req, res) => {
    const {name, user, typeId} = req.body;
    const created = await MaterialsParams.create({name, changesId: user._id, typeId});
    res.send(created);
  },
  patchMaterialsParams: async (req, res) => {
    const {name, user, typeId} = req.body;
    const {id} = req.params;

    const updated = await MaterialsParams.findByIdAndUpdate(id, {name, changesId: user._id, typeId}, {new: true});
    res.send(updated);
  },
  getAllMaterialsParams: async (req, res) => {
    const {search} = req.query
    if (search) {
      const data = await MaterialsParams.find({
        name: {
          $regex: search,
          $options: 'i'
        }
      }).populate('typeId')
      res.send(data)
    } else {
      const data = await MaterialsParams.find().populate('typeId')
      res.send(data)
    }
  },
  getSingleMaterialsParams: async (req, res) => {
    const {id} = req.params;
    const data = await MaterialsParams.findById(id).populate('typeId')
    res.send(data)
  },
}
