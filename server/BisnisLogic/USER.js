const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

const user1 = {
    readUserAllHandler: (req, res, next) => {
        dtl.readUserAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createUserAllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createUserAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        },docs)
    },

    updateUserAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateUserAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deletUserAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deletUserAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },
}

module.exports = user1