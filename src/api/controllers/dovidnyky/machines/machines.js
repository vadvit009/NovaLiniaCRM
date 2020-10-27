const {Dovidnyky: {Machines: {Machine}}} = require('../../../models');

module.exports = {
    createMachine: async (req, res) => {
        const {
            user,
            name,
            modelId,
            golkuId,
            duymuId,
            vyazalniId,
        } = req.body;

        const created = await Machine.create({
            name,
            modelId,
            duymuId,
            golkuId,
            vyazalniId,
            changesId: user._id
        });
        res.send(created)
    },
    patchMachine: async (req, res) => {
        const {
            user,
            name,
            modelId,
            golkuId,
            duymuId,
            vyazalniId,
        } = req.body;
        const {id} = req.params;
        const updated = await Machine.findByIdAndUpdate(id,
            {
                name,
                modelId,
                duymuId,
                golkuId,
                vyazalniId,
                changesId: user._id
            },
            {new: true}
        );
        res.send(updated)
    }
}
