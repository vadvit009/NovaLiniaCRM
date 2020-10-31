const {Dovidnyky: {Workers: {Worker}}} = require('../../../models');

module.exports = {
    getWorkers: async (req, res) => {
        const {search} = req.query;
        if (search) {
            const workers = await Worker.find({sName: {$regex: search}})
                .populate('operationId')
                .populate('changesId');
            res.send(workers)
        } else {
            const workers = await Worker.find()
                .populate('operationId')
                .populate('changesId');
            res.send(workers)
        }
    },
    getWorker: async (req, res) => {
        const {id} = req.params;
        const worker = await Worker.findById(id)
            .populate('operationId')
            .populate('changesId');
        res.send(worker)
    },
    createWorker: async (req, res) => {
        try {
            const {
                fName,
                fatherName,
                sName,
                status,
                operationId,
                changesId,
            } = req.body;
            const worker = await Worker.create({
                fName,
                fatherName,
                sName,
                status,
                operationId,
                changesId,
                deletedAt: null
            })
            res.send(worker);

        } catch (e) {
            console.error(e);
            res.sendStatus(400)
        }
    },
    patchWorker: async (req, res) => {
        try {
            const {
                fName,
                fatherName,
                sName,
                status,
                operationId,
                changesId,
            } = req.body;
            const {id} = req.params;

            const updatedWorker = await Worker.findByIdAndUpdate(id, {
                fName,
                fatherName,
                sName,
                status,
                operationId,
                changesId,
            }, {new: true})
                .populate('operationId')
                .populate('changesId');
            res.send(updatedWorker);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}
