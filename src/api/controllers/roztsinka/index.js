const {Roztsinka} = require('../../models');

module.exports = {
    getRoztsinka: async (req, res) => {
        try {
            const {search} = req.query;
            if (search) {
                const populated = await Roztsinka.find({name: {$regex: search}})
                    .populate('operationId')
                    .populate('machineId')
                    .populate('typeId')
                    .populate('colorId')
                    .populate('asortument')
                    .populate('classId')
                    .populate('seasonId')
                    .populate('imageId')
                    .populate('sizeId')
                    .populate('articleId')
                    .populate('changesId')
                res.send(populated);
            } else {
                const populated = await Roztsinka.find()
                    .populate('operationId')
                    .populate('machineId')
                    .populate('typeId')
                    .populate('colorId')
                    .populate('asortument')
                    .populate('classId')
                    .populate('seasonId')
                    .populate('imageId')
                    .populate('sizeId')
                    .populate('articleId')
                    .populate('changesId')
                res.send(populated);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }

    },
    getOneRoztsinka: async (req, res) => {
        try {
            const {id} = req.params;
            const populated = await Roztsinka.findById(id)
                .populate('operationId')
                .populate('machineId')
                .populate('typeId')
                .populate('colorId')
                .populate('asortument')
                .populate('classId')
                .populate('seasonId')
                .populate('imageId')
                .populate('sizeId')
                .populate('articleId')
                .populate('changesId')
            res.send(populated);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    createRoztsinka: async (req, res) => {
        try {
            const {
                startDate,
                endDate,
                price,
                name,
                operationId,
                gatynok,
                machineId,
                typeId,
                colorId,
                asortument,
                classId,
                seasonId,
                imageId,
                sizeId,
                articleId,
                user,
            } = req.body;
            const roztsinka = await Roztsinka.create({
                startDate,
                endDate,
                price,
                name,
                operationId,
                gatynok,
                machineId,
                typeId,
                colorId,
                asortument,
                classId,
                seasonId,
                imageId,
                sizeId,
                articleId,
                changesId: user._id,
                deletedAt: null
            })
            res.send(roztsinka);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    },
    updateRoztsinka: async (req, res) => {
        try {
            const {
                startDate,
                endDate,
                price,
                name,
                operationId,
                gatynok,
                machineId,
                typeId,
                colorId,
                asortument,
                classId,
                seasonId,
                imageId,
                sizeId,
                articleId,
                user,
            } = req.body;
            const {id} = req.params;

            const updated = await Roztsinka.findByIdAndUpdate(id, {
                startDate,
                endDate,
                price,
                name,
                operationId,
                gatynok,
                machineId,
                typeId,
                colorId,
                asortument,
                classId,
                seasonId,
                imageId,
                sizeId,
                articleId,
                changesId: user._id,
                updatedAt: Date.now(),
                deletedAt: null
            })
                .populate('operationId')
                .populate('machineId')
                .populate('typeId')
                .populate('colorId')
                .populate('asortument')
                .populate('classId')
                .populate('seasonId')
                .populate('imageId')
                .populate('sizeId')
                .populate('articleId')
                .populate('changesId')
            res.send(updated);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}
