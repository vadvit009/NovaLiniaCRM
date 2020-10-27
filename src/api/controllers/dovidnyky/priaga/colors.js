const {Dovidnyky: {Priaga: {PriagaColor}}} = require('../../../models');

module.exports = {
    createColor: async (req, res) => {
        const {
            name,
            code,
            vendorId,
            user
        } = req.body;
        const created = await PriagaColor.create({
            name,
            code,
            vendorId,
            changesId: user._id
        });
        res.send(created);
    },
    patchColor: async (req, res) => {
        const {
            name,
            code,
            vendorId,
            user
        } = req.body;
        const {id} = req.params;
        const updated = await PriagaColor.findByIdAndUpdate(id,
            {
                name,
                code,
                vendorId,
                changesId: user._id
            },
            {new: true}
        );
        res.send(updated);
    }
}
