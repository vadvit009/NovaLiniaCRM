const app = require("express").Router();
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");
const {prixodZvitu, patchPruxodZvitu, rozxidZvitu} = require('../../controllers/zvitu');
const {Zvitu} = require('../../models');
const {readByIdHelper, readHelper, deleteHelper} = require('../../utils/CRUDhelper')

app.get("/zvitu", verifyUserToken, readHelper(Zvitu));

app.get("/zvitu_rozxid", verifyUserToken, readHelper(Zvitu));

app.get("/zvitu/:id", verifyUserToken, readByIdHelper(Zvitu));

app.post("/zvitu", verifyUserToken, prixodZvitu);

app.post("/zvitu_rozxid", verifyUserToken, rozxidZvitu);

app.patch("/zvitu/:id", verifyUserToken, patchPruxodZvitu);

app.delete("/zvitu/:id", verifyUserToken, deleteHelper(Zvitu));

module.exports = app;
