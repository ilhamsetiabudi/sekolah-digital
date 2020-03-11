const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/User_siswa/dt_siswa')
const authConfig = require('../Config/auth.config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cron = require("node-cron");

const user_siswa = {
    readUserSiswaAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.readUserSiswaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    createUserSiswaAllHandler: (req,res, next) => {
        var docs = req.body
        dtl.createUserSiswaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        },docs)
    },

    updateUserSiswaAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.updateUserSiswaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    deleteUserSiswaAllHandler: (req, res, next) => {
        var docs = req.body
        dtl.deletUserSiswaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

    // register: (req,res, next) => {
    //   var docs = req.body
    //   dtl.registerUserSiswa(function(items){
    //       ResponseHelper.sendResponse(res, 200, items)
    //   },docs)
    // },
    
    login: (req, res, next) => {
        let data = req.body
        console.log(data)
        dtl.readOneUserSiswaByIdData(function(items){
            // console.log(items[0].password)
            // console.log(JSON.stringify(items[0].password))
            if (items[0]) {
                if (bcrypt.compareSync(data.password, items[0].password)) {
                  if (items[0].status == "locked") {
                    let result = "Akun Anda Sedang di Blokir selama 24 jam";
                    ResponseHelper.sendResponse(res, 404, result);
                  } else {
                    let token = jwt.sign(items[0], authConfig.secretkey);
        
                    delete items[0].password;
                    let result = {
                      userdata: items,
                      token: token
                    };
                    ResponseHelper.sendResponse(res, 200, result);
                    dtl.resetAttemptUser(items[0].username);
                  }
                } else {
                  if (items[0].login_ke < 3) {
                    let result = "Wrong Password";
                    ResponseHelper.sendResponse(res, 404, result);
                    dtl.updateAttemptUser(items[0].username);
                  }
                  if (items[0].login_ke == 3) {
                    let result = "Akun Anda di Blokir Selama 24 Jam";
                    ResponseHelper.sendResponse(res, 404, result);
                    dtl.lockUser(items[0].username);
                    cron.schedule("* 10 * * * *", function() {
                      dtl.resetAttemptUser(items[0].username);
                    });
                  }
                }
              } else {
                let result = "User Not Found!";
                ResponseHelper.sendResponse(res, 404, result);
              }
            }, data.username);
          }
        };
module.exports = user_siswa