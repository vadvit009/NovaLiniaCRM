const {prixodPriaga,getPriaga, rozxodPriaga, zalushok, getSingle, patchPriaga} = require("../../../controllers/dovidnyky/priaga");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga", verifyUserToken, roleAccess(["String2", "String1"]), getPriaga);

app.get("/priaga_zalushok", verifyUserToken, roleAccess(["String2", "String1"]), zalushok);

app.get("/priaga/:id", verifyUserToken, roleAccess(["String2", "String1"]), getSingle);

app.post("/priaga", verifyUserToken, roleAccess(["String2", "String1"]), prixodPriaga);

app.post("/priaga_rozxid", verifyUserToken, roleAccess(["String2", "String1"]), rozxodPriaga);

app.patch("/priaga/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchPriaga);

app.delete("/priaga/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.Priaga));

module.exports = app;
