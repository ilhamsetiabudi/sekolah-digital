const UsersiswaBisniLogic = require('../BisnisLogic/user_siswa') 
const UserguruBisniLogic = require('../BisnisLogic/user_guru') 
const MapelBisniLogic = require('../BisnisLogic/mapel10') 
const AdminBisniLogic = require('../BisnisLogic/admin') 
const AuthToken = require('../token/authtoken')

module.exports = exports = function(server){
    server.get('/api/token', AuthToken.checkToken)
    server.post('/api/siswa/login', UsersiswaBisniLogic.login)
    server.get('/api/siswa', UsersiswaBisniLogic.readUserSiswaAllHandler)
    server.post('/api/siswa', UsersiswaBisniLogic.createUserSiswaAllHandler)
    server.put('/api/siswa', UsersiswaBisniLogic.updateUserSiswaAllHandler)
    server.del('/api/siswa', UsersiswaBisniLogic.deleteUserSiswaAllHandler)
    server.post('/api/guru/login', UserguruBisniLogic.login)
    server.get('/api/guru', UserguruBisniLogic.readUserGuruAllHandler)
    server.post('/api/guru', UserguruBisniLogic.createUserGuruAllHandler)
    server.put('/api/guru', UserguruBisniLogic.updateUserGuruAllHandler)
    server.del('/api/guru', UserguruBisniLogic.deleteUserGuruAllHandler)
    server.get('/api/mapelx', MapelBisniLogic.readMapel10AllHandler)
    server.post('/api/mapelx', MapelBisniLogic.createMapel10AllHandler)
    server.put('/api/mapelx', MapelBisniLogic.updateMapel10AllHandler)
    server.del('/api/mapelx', MapelBisniLogic.deleteMapel10AllHandler)
    server.post('/api/admin/login', AdminBisniLogic.login)
    server.get('/api/admin', AdminBisniLogic.readAdminAllHandler)
    server.post('/api/admin', AdminBisniLogic.createAdminAllHandler)
    server.put('/api/admin', AdminBisniLogic.updateAdminAllHandler)
    server.del('/api/admin', AdminBisniLogic.deleteAdminAllHandler)
}