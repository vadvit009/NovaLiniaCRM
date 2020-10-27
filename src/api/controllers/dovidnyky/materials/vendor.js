const {Dovidnyky: {Materials: {MaterialsVendor}}} = require('../../../models');

module.exports = {
    createMaterialsVendor: async (req, res) => {
        const {country, city, user, name} = req.body;
        const created = await MaterialsVendor.create({
            name, country, city, changesId: user._id, deletedAt: null
        });
        res.send(created);
    },
    patchMaterialsVendor: async (req, res) => {
        const {country, city, user, name} = req.body;
        const {id} = req.params;
        const updated = await MaterialsVendor.findByIdAndUpdate(id,
            {
                name, country, city, changesId: user._id,
            },
            {new: true});
        res.send(updated);
    }
}
