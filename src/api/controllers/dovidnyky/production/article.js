const {Dovidnyky: {Production: {ProdArticle}}} = require('../../../models');

module.exports = {
    createArticle: async (req, res) => {
        const {
            name,
            status,
            typeId,
            asortumentId,
            imageId,
            colorId,
            sizeId,
            classId,
            articleId,
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
            articleId,
            seasonId,
            changesId: user._id,
            deletedAt: null
        });
        res.send(created)
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
            articleId,
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
                articleId,
                seasonId,
                changesId: user._id,
                deletedAt: null
            },
            {new: true});
        res.send(updated)
    }
}
