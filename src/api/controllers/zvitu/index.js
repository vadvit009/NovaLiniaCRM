const {zalushok} = require('./get.controller');
const {patchPruxodZvitu} = require('./patch.controller');
const {prixodZvitu, rozxidZvitu} = require('./post.controller');

module.exports = {
    patchPruxodZvitu,
    prixodZvitu,
    rozxidZvitu,
    zalushok
}
