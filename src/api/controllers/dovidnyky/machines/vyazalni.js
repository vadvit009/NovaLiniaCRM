const {Dovidnyky: {Machines: {MachineVyazalni}}} = require('../../../models');

module.exports = {
    createMachineVyazalni: async (req, res) => {
        const {
            user,
            name,
            number,
            status,
            modelId,
            duymyId,
            golkuId,
        } = req.body;

        const created = await MachineVyazalni.create({
            name,
            number,
            status,
            modelId,
            duymyId,
            golkuId,
            changesId: user._id
        });
        res.send(created)
    },
    patchMachineVyazalni: async (req, res) => {
        const {
            user,
            name,
            number,
            status,
            modelId,
            duymyId,
            golkuId,
        } = req.body;
        const {id} = req.params;
        const updated = await MachineVyazalni.findByIdAndUpdate(id,
            {
                name,
                number,
                status,
                modelId,
                duymyId,
                golkuId,
                changesId: user._id
            },
            {new: true}
        );
        res.send(updated)
    }
}
