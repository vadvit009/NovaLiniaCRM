const {createVendor, patchVendor} = require("../../../controllers/dovidnyky/priaga/vendor");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper,} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_vendor", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaVendor));

app.get("/priaga_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaVendor));

app.post("/priaga_vendor", verifyUserToken, roleAccess(["String2", "String1"]), createVendor);

app.patch("/priaga_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchVendor);

app.delete("/priaga_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaVendor));

module.exports = app;
