const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {deleteHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');
const {Workers: {createWorker, patchWorker, getWorkers,getWorker}} = require("../../../controllers/dovidnyky");

app.get("/workers", verifyUserToken, roleAccess(["String2", "String1"]), getWorkers);

app.get("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), getWorker);

app.post("/workers", verifyUserToken, roleAccess(["String2", "String1"]), createWorker);

app.patch("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchWorker);

app.delete("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Workers.Worker));

module.exports = app;
