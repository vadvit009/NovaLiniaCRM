const User = require('./user');
const Workers = require('./dovidnyky/workers');
const Roztsinka = require('./roztsinka');
const Operations = require("./dovidnyky/operations");
const Zvitu = require('./zvitu');
const Zarplata = require('./zarplata');
const {Sklad1, Sklad2, Sklad3, Sklad4} = require('./skladu');
const {
    ProdColor, ProdArticle, ProdSize, ProdType, ProdSeason, ProdImage, ProdAsortument, ProdClass
} = require("./dovidnyky/production");
const {
    MachineVyazalni, MachineModel, MachineGolku, MachineDuymu,Machines
} = require("./dovidnyky/machines");
const {
    MaterialsDilankaRozxody, MaterialsParams, MaterialsParamsValue, MaterialsType, MaterialsVendor, Materials
} = require('./dovidnyky/materials');
const {
    PriagaVendor, PriagaType, PriagaTovtshina, PriagaSurovuna, PriagaDilankaRozxody, PriagaColor, Priaga
} = require('./dovidnyky/priaga');

module.exports = {
    User,
    Zvitu,
    Workers,
    Zarplata,
    Operations,
    Roztsinka,
    MachineVyazalni, MachineModel, MachineGolku, MachineDuymu,Machines,
    MaterialsDilankaRozxody, MaterialsParams, MaterialsParamsValue, MaterialsType, MaterialsVendor, Materials,
    PriagaVendor, PriagaType, PriagaTovtshina, PriagaSurovuna, PriagaDilankaRozxody, PriagaColor, Priaga,
    ProdColor, ProdArticle, ProdSize, ProdType, ProdSeason, ProdImage, ProdAsortument, ProdClass,
    Sklad1, Sklad2, Sklad3, Sklad4
}
