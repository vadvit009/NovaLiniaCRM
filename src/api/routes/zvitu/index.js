const app = require("express").Router();

const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {prixodZvitu, patchPruxodZvitu, rozxidZvitu} = require('../../controllers/zvitu');
const {zalushok} = require("../../controllers/zvitu");
const {readByIdHelper, readHelper, deleteHelper} = require('../../utils/CRUDhelper')

const {Zvitu} = require('../../models');

app.get("/zvitu", verifyUserToken, readHelper(Zvitu));

app.get("/zvitu_rozxid", verifyUserToken, readHelper(Zvitu));

app.get("/zvitu/:id", verifyUserToken, readByIdHelper(Zvitu));

app.post("/zvitu", verifyUserToken, prixodZvitu);

app.post("/zvitu_rozxid", verifyUserToken, rozxidZvitu);

app.get("/zvitu_zalushok", verifyUserToken, zalushok);

app.patch("/zvitu/:id", verifyUserToken, patchPruxodZvitu);

app.delete("/zvitu/:id", verifyUserToken, deleteHelper(Zvitu));

module.exports = app;
