const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_surovuna", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaSurovuna));

app.get("/priaga_surovuna/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaSurovuna));

app.post("/priaga_surovuna", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Priaga.PriagaSurovuna));

app.patch("/priaga_surovuna/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Priaga.PriagaSurovuna));

app.delete("/priaga_surovuna/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaSurovuna));

module.exports = app;
