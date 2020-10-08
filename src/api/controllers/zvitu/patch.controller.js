const {Zvitu} = require('../../models/zvitu')

module.exports = {
    //TODO check sum when create rozxid
    patchPruxodZvitu: async (req, res) => {
        try {
            const {operationId, workerId, gatynok1, gatynok2, gatynok3, dateRozxodu} = req.body;
            const {id} = req.params;
            const prixodZvitu = await Zvitu.findByIdAndUpdate(id, {
                operationId, workerId, gatynok1, gatynok2, gatynok3, dateRozxodu
            });
            res.send(prixodZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    }
}
