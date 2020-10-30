const app = require("express").Router();

const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const { zalushok, prixod, rozxodu, prixodZvitu, patchPruxodZvitu, rozxidZvitu, deleteRozxid } = require('../../controllers/zvitu');
const { readByIdHelper, readHelper, deleteHelper } = require('../../utils/CRUDhelper')

const { Zvitu } = require('../../models');

app.get("/zvitu", verifyUserToken, prixod);

app.get("/zvitu_rozxid", verifyUserToken, rozxodu);

app.get("/zvitu/:id", verifyUserToken, readByIdHelper(Zvitu));

app.post("/zvitu", verifyUserToken, prixodZvitu);

app.post("/zvitu_rozxid", verifyUserToken, rozxidZvitu);

app.get("/zvitu_zalushok", verifyUserToken, zalushok);

app.patch("/zvitu/:id", verifyUserToken, patchPruxodZvitu);

app.delete("/zvitu/:id", verifyUserToken, deleteHelper(Zvitu));

app.delete("/zvitu_rozxid/:id", verifyUserToken, deleteRozxid);

module.exports = app;
