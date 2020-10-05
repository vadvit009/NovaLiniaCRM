const createHelper = (model) => {
    return async (req, res) => {
        const {name} = req.body;
        const created = await model.create(name);
        res.status(200).send(created);
    }
};

const patchHelper = (model) => {
    return async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const updated = await model.findByIdAndUpdate(id, {id, name})
        res.status(200).send(updated);
    }
}

const readHelper = (model) => {
    return async (req, res) => {
        const readed = await model.find({});
        res.status(200).send(readed);
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
        const deleted = await model.findById(id);
        res.status(200).send(deleted);
    }
}

module.exports = {createHelper, patchHelper, deleteHelper, readHelper, readByIdHelper}