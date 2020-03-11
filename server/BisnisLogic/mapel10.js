const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/DaftarMapel/Kelas10/mapel10')

const mapel10 = {
    readMapel10AllHandler: (req, res, next) => {
        var docs = req.body
        dtl.readMapel10AllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    createMapel10AllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createMapel10AllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        },docs)
    },

    updateMapel10AllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateMapel10AllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deleteMapel10AllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deleteMapel10AllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },
};
module.exports = mapel10