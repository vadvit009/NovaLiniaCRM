const {Dovidnyky: {Materials: {MaterialsType}}} = require('../../../models');

module.exports = {
    getMaterialsType: async (req, res) => {
        const {search} = req.query;
        if (search) {
            const data = await MaterialsType.find({name: {$regex: search, $options: 'i'}})
                .populate('vendorId')
                .populate('dilankaId')
                .populate('paramsId')
                .populate('changesId');
            res.send(data);
        } else {
            const data = await MaterialsType.find()
                .populate('vendorId')
                .populate('dilankaId')
                .populate('paramsId')
                .populate('changesId');
            res.send(data);
        }
    },
    createMaterialsType: async (req, res) => {
        const {
            name,
            vendorId,
            dilankaId,
            paramsId,
            user
        } = req.body;
        const created = await MaterialsType.create({
            name,
            vendorId,
            dilankaId,
            paramsId,
            changesId: user._id
        });
        res.send(created);
    },
    patchMaterialsType: async (req, res) => {
        const {
            name,
            vendorId,
            dilankaId,
            paramsId,
            user
        } = req.body;
        const {id} = req.params;

        const updated = await MaterialsType.findByIdAndUpdate(id, {
            name,
            vendorId,
            dilankaId,
            paramsId,
            changesId: user._id
        }, {new: true})
            .populate('vendorId')
            .populate('dilankaId')
            .populate('paramsId')
            .populate('changesId');
        res.send(updated);
    },
}
