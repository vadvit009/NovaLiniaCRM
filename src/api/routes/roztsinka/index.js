const app = require("express").Router();
const {Roztsinka} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {createRoztsinka, updateRoztsinka} = require("../../controllers/roztsinka");
const {readHelper,readByIdHelper, deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/roztsinka", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Roztsinka));

app.get("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Roztsinka));

app.post("/roztsinka", verifyUserToken, roleAccess(["String2", "String1"]), createRoztsinka);

app.patch("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), updateRoztsinka);

app.delete("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Roztsinka));

module.exports = app;
