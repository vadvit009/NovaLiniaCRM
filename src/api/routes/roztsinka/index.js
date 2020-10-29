const app = require("express").Router();
const {Roztsinka} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {createRoztsinka, updateRoztsinka, getRoztsinka,getOneRoztsinka} = require("../../controllers/roztsinka");
const {deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/roztsinka", verifyUserToken, roleAccess(["String2", "String1"]), getRoztsinka);

app.get("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), getOneRoztsinka);

app.post("/roztsinka", verifyUserToken, roleAccess(["String2", "String1"]), createRoztsinka);

app.patch("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), updateRoztsinka);

app.delete("/roztsinka/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Roztsinka));

module.exports = app;
