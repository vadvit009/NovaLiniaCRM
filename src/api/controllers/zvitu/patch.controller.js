const {Zvitu} = require('../../models/zvitu')

module.exports = {
    //TODO check sum when create rozxid
    patchPruxodZvitu: async (req, res) => {
        try {
            const {operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu} = req.body;
            const {id} = req.params;
            const prixodZvitu = await Zvitu.findByIdAndUpdate(id, {
                operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu
            });
            res.send(prixodZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    }
}
