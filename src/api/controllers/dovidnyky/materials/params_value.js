const {Dovidnyky: {Materials: {MaterialsParamsValue}}} = require('../../../models');

module.exports = {
    getMaterialsParamsValue: async (req, res) => {
        const {search} = req.query;
        if (search) {
            const data = await MaterialsParamsValue.find({name: {$regex: search}})
                .populate('paramId')
                .populate('changesId');
            res.send(data);
        } else {
            const data = await MaterialsParamsValue.find()
                .populate('paramId')
                .populate('changesId');
            res.send(data);
        }
    },
    getOneMaterialsParamsValue: async (req, res) => {
        const {id} = req.params;
        const data = await MaterialsParamsValue.findById(id)
            .populate('paramId')
            .populate('changesId');
        res.send(data);
    },
    createMaterialsParamsValue: async (req, res) => {
        const {name, user, paramId} = req.body;
        const created = await MaterialsParamsValue.create({name, changesId: user._id, paramId});
        res.send(created);
    },
    patchMaterialsParamsValue: async (req, res) => {
        const {name, user, paramId} = req.body;
        const {id} = req.params;

        const updated = await MaterialsParamsValue.findByIdAndUpdate(id, {
            name,
            changesId: user._id,
            paramId
        }, {new: true})
            .populate('paramId')
            .populate('changesId')
        res.send(updated);
    },
}
