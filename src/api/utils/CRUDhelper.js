const createHelper = (model) => {
    return async (req, res) => {
        try {
            const {name} = req.body;
            const created = await model.create({name});
            res.send(created);
        } catch (e) {
            console.error(e);
            res.sendStatus(400);
        }

    }
};

const patchHelper = (model) => {
    return async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const updated = await model.findByIdAndUpdate(id, {id, name}, {new: true})
        res.status(200).send(updated);
    }
}

const readHelper = (model) => {
    return async (req, res) => {
        const {from, to, search} = req.query;
        if (from !== undefined || to !== undefined || search !== undefined) {
            if (!from || !to) {
                const filtered = await model.find({name: search});
                return res.status(200).send(filtered);
            }
            const filtered = await model.find({createdAt: {$gte: from, $lte: to}, name: search});
            res.status(200).send(filtered);
        } else {
            const readed = await model.find({});
            res.status(200).send(readed);
        }
    }
}

const readByIdHelper = (model) => {
    return async (req, res) => {
        const {id} = req.params;
        const readed = await model.findById(id);
        res.status(200).send(readed);
    }
}

const deleteHelper = (model) => {
    return async (req, res) => {
        const {id} = req.params;
        const deleted = await model.findByIdAndRemove(id);
        res.status(200).send(deleted);
    }
}

module.exports = {createHelper, patchHelper, deleteHelper, readHelper, readByIdHelper}
