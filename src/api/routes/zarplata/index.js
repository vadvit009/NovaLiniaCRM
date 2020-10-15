const {zpSklad1, zpSklad2, zpSklad3, zpSklad4} = require("../../controllers/zarplata");
const app = require("express").Router();
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

app.get("/zp_sklad1", verifyUserToken, zpSklad1);

app.get("/zp_sklad2", verifyUserToken, zpSklad2);

app.get("/zp_sklad3", verifyUserToken, zpSklad3);

app.get("/zp_sklad4", verifyUserToken, zpSklad4);

module.exports = app;
