const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

const M_keahlian_BL = {
    readKeahlianAllHandler: (req, res, next) => {
        dtl.readKeahlianAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createKeahlianAllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createKeahlianAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    updateKeahlianAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateKeahlianAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deletKeahlianAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deletKeahlianllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },
}

module.exports = M_keahlian_BL