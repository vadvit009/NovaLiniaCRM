require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./src/db");
const {
    User,
    Operations,
    Workers,
    Zvitu,
    Zarplata,
    Roztsinka,
    Sklad1, Sklad2, Sklad3, Sklad4,
    MachineVyazalni, MachineModel, MachineGolku, MachineDuymu, Machines,
    MaterialsDilankaRozxody, MaterialsParams, MaterialsParamsValue, MaterialsType, MaterialsVendor, Materials,
    PriagaVendor, PriagaType, PriagaTovtshina, PriagaSurovuna, PriagaDilankaRozxody, PriagaColor, Priaga,
    ProdColor, ProdArticle, ProdSize, ProdType, ProdSeason, ProdImage, ProdAsortument, ProdClass,

} = require('./src/api/routes');

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

db();

app.disable("x-powered-by");

// access cors (temporary)
app.use(cors());

app.use(
    "/api/v1",
    User,
    Zvitu,
    Operations,
    Workers,
    Roztsinka,
    Zarplata,
    Sklad1, Sklad2, Sklad3, Sklad4,
    MachineVyazalni, MachineModel, MachineGolku, MachineDuymu,Machines,
    MaterialsDilankaRozxody, MaterialsParams, MaterialsParamsValue, MaterialsType, MaterialsVendor, Materials,
    PriagaVendor, PriagaType, PriagaTovtshina, PriagaSurovuna, PriagaDilankaRozxody, PriagaColor, Priaga,
    ProdColor, ProdArticle, ProdSize, ProdType, ProdSeason, ProdImage, ProdAsortument, ProdClass,
);

// use static
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

// handle 404 (user errors)
app.use((req, res) => {
    res.status(404).send(`<h2>Oops 404</h2> <h3>We think you are lost!</h3>`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server starting on port ${process.env.PORT}`);
});
