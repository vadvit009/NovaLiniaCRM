const {prixodMaterials, rozxodMaterials, zalushok} = require("../../../controllers/dovidnyky/materials");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.Materials));

app.get("/materials_zalushok", verifyUserToken, roleAccess(["String2", "String1"]), zalushok);

app.get("/materials/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.Materials));

app.post("/materials", verifyUserToken, roleAccess(["String2", "String1"]), prixodMaterials);

app.patch("/materials/:id", verifyUserToken, roleAccess(["String2", "String1"]), rozxodMaterials);

app.delete("/materials/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.Materials));

module.exports = app;
