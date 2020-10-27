const {Dovidnyky: {Priaga: {PriagaVendor}}} = require('../../../models');

module.exports = {
    createVendor: async (req, res) => {
        const {
            name,
            country,
            city,
            user
        } = req.body;
        const created = await PriagaVendor.create({
            name,
            country,
            city,
            changesId: user._id
        });
        res.send(created);
    },
    patchVendor: async (req, res) => {
        const {
            name,
            country,
            city,
            user
        } = req.body;
        const {id} = req.params;
        const updated = await PriagaVendor.findByIdAndUpdate(id,
            {
                name,
                country,
                city,
                changesId: user._id
            },
            {new: true}
        );
        res.send(updated);
    }
}
