const {Dovidnyky: {Production: {ProdArticle}}} = require('../../../models');

module.exports = {
    getArticles: async (req, res) => {
        const {search} = req.query;
        if (search) {
            const articles = await ProdArticle.find({name: {$regex: search, $options: 'i'}})
                .populate('typeId')
                .populate('asortumentId')
                .populate('imageId')
                .populate('colorId')
                .populate('sizeId')
                .populate('classId')
                .populate('seasonId')
                .populate('changesId');
            res.send(articles)
        } else {
            const articles = await ProdArticle.find()
                .populate('typeId')
                .populate('asortumentId')
                .populate('imageId')
                .populate('colorId')
                .populate('sizeId')
                .populate('classId')
                .populate('seasonId')
                .populate('changesId');
            res.send(articles)
        }
    },
    getArticle: async (req, res) => {
        const {id} = req.params;
        const article = await ProdArticle.findById(id)
            .populate('typeId')
            .populate('asortumentId')
            .populate('imageId')
            .populate('colorId')
            .populate('sizeId')
            .populate('classId')
            .populate('seasonId')
            .populate('changesId');
        res.send(article)
    },
    createArticle: async (req, res) => {
        try {
            const {
                name,
                status,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                seasonId,
                user
            } = req.body;
            const created = await ProdArticle.create({
                name,
                status,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                seasonId,
                changesId: user._id,
                deletedAt: null
            });
            res.send(created);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    patchArticle: async (req, res) => {
        const {
            name,
            status,
            typeId,
            asortumentId,
            imageId,
            colorId,
            sizeId,
            classId,
            seasonId,
            user
        } = req.body;
        const {id} = req.params;
        const updated = await ProdArticle.findByIdAndUpdate(id,
            {
                name,
                status,
                typeId,
                asortumentId,
                imageId,
                colorId,
                sizeId,
                classId,
                seasonId,
                changesId: user._id,
                deletedAt: null
            },
            {new: true})
            .populate('typeId')
            .populate('asortumentId')
            .populate('imageId')
            .populate('colorId')
            .populate('sizeId')
            .populate('classId')
            .populate('seasonId')
            .populate('changesId');
        res.send(updated)
    }
}
