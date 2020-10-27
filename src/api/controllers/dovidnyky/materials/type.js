const {Dovidnyky: {Materials: {MaterialsType}}} = require('../../../models');

module.exports = {
    createMaterialsType: async (req, res) => {
        const {
            name,
            vendorId,
            dilankaId,
            paramsId,
            user
        } = req.body;
        const created = await MaterialsType.create({
            name,
            vendorId,
            dilankaId,
            paramsId,
            changesId: user._id
        });
        res.send(created);
    },
    patchMaterialsType: async (req, res) => {
        const {
            name,
            vendorId,
            dilankaId,
            paramsId,
            user
        } = req.body;
        const {id} = req.params;

        const updated = await MaterialsType.findByIdAndUpdate(id, {
            name,
            vendorId,
            dilankaId,
            paramsId,
            changesId: user._id
        }, {new: true});
        res.send(updated);
    },
}
