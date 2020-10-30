const { zalushok, prixod, rozxodu } = require('./get.controller');
const { patchPruxodZvitu } = require('./patch.controller');
const { prixodZvitu, rozxidZvitu } = require('./post.controller');
const { deleteRozxid} = require('./delete.controller');

module.exports = {
    patchPruxodZvitu,
    prixodZvitu,
    rozxidZvitu,
    zalushok,
    prixod,
    rozxodu,
    deleteRozxid
}
