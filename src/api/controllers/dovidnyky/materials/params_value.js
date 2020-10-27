const {Dovidnyky: {Materials: {MaterialsParamsValue}}} = require('../../../models');

module.exports = {
    createMaterialsParamsValue: async (req, res) => {
        const {name, user, paramId} = req.body;
        const created = await MaterialsParamsValue.create({name, changesId: user._id, paramId});
        res.send(created);
    },
    patchMaterialsParamsValue: async (req, res) => {
        const {name, user, paramId} = req.body;
        const {id} = req.params;

        const updated = await MaterialsParamsValue.findByIdAndUpdate(id, {name, changesId: user._id, paramId}, {new: true});
        res.send(updated);
    },
}
