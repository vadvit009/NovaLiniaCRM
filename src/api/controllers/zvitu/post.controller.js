const {Zvitu} = require('../../models/zvitu')

module.exports = {
    prixodZvitu: async (req, res) => {
        try {
            const {operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu} = req.body;
            const prixodZvitu = await Zvitu.create({
                operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu
            });
            res.send(prixodZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    },
    rozxidZvitu: async (req, res) => {
        try {
            const {operationId, workerId, gatynok1, gatynok2, gatynok3, date_prixodu} = req.body;
            const rozxidZvitu = await Zvitu.find({
                operationId: operationId,
                workerId: workerId,
                date_prixodu: {$gte: date_prixodu}
            });
            res.send(rozxidZvitu);
        } catch (e) {
            console.log(e);
            res.sendStatus(400)
        }
    }
}
