const {Dovidnyky: {Workers: {Worker}}} = require('../../../models');

module.exports = {
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
            res.send(updatedWorker);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}
