const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

const kotaBisnis = {
    readKotaAllHandler: (req, res, next) => {
        dtl.readKotaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createKotaAllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createKotaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        },docs)
    },

    updateKotaAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateKotaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deletKotaAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deletKotaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },
}

module.exports = kotaBisnis