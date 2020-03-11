const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

const Provinsi_Bisnis = {

    readProvinsiAllHandler: (req, res, next) => {
        dtl.readProvinsiAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createProvinsiAllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createProvinsiAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        },docs)
    },

    updateProvinsiAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateProvinsiAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deletProvinsiAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deletProvinsiAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },
}

module.exports = Provinsi_Bisnis