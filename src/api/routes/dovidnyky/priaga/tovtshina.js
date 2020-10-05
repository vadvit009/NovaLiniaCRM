const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_tovtshina", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaTovtshina));

app.get("/priaga_tovtshina/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaTovtshina));

app.post("/priaga_tovtshina", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Priaga.PriagaTovtshina));

app.patch("/priaga_tovtshina/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Priaga.PriagaTovtshina));

app.delete("/priaga_tovtshina/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaTovtshina));

module.exports = app;
