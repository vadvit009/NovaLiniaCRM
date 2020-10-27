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
}
