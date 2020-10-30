const {Zvitu} = require('../../models/zvitu');

module.exports = {
    deleteRozxid: async (req, res) => {
        const {id} = req.params;
        const searched = await Zvitu.findById(id);
        if (searched.date_rozsxodu) {
            searched.copyId.map(restore => {
                Zvitu.findByIdAndUpdate(restore, {date_rozxodu: null})
                    .then(restored => {
                        console.log(restored)
                    })
                    .catch(e => {
                        console.log(e)
                        res.sendStatus(400)
                    })
            })
            const deleted = await Zvitu.findByIdAndRemove(id);
            res.sendStatus(200);
        } else res.status(400).send('This ID had DATE_ROZXODU')
    }
}
