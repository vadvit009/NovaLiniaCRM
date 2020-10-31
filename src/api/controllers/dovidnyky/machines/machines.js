const {Dovidnyky: {Machines: {Machine}}} = require('../../../models');

module.exports = {
    getMachines: async (req, res) => {
        const {search} = req.query;
        if (search) {
            const machines = await Machine.find({name: {$regex: search}})
                .populate('modelId')
                .populate('golkuId')
                .populate('duymuId')
                .populate('vyazalniId')
                .populate('changesId')
            res.send(machines);
        } else {
            const machines = await Machine.find()
                .populate('modelId')
                .populate('golkuId')
                .populate('duymuId')
                .populate('vyazalniId')
                .populate('changesId')
            res.send(machines);
        }
    },
    getMachine: async (req, res) => {
        const {id} = req.params;
        const machine = await Machine.findById(id)
            .populate('modelId')
            .populate('golkuId')
            .populate('duymuId')
            .populate('vyazalniId')
            .populate('changesId')
        res.send(machine);
    },
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
        )
            .populate('modelId')
            .populate('golkuId')
            .populate('duymuId')
            .populate('vyazalniId')
            .populate('changesId')
        res.send(updated)
    }
}
