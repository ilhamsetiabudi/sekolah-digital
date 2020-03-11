const pg = require("pg");
const DatabaseConnection = require("../../../Config/dbp.config.json");
var DB = new pg.Pool(DatabaseConnection.config);

const dt = {
  readMapel10AllHandlerData: callback => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      client.query(
        "SELECT * FROM mapel10 WHERE is_delete = false ORDER BY kode_mapel ASC",
        function(err, result) {
          done();
          if (err) {
            data = err;
          } else {
            data = result.rows;
          }
          callback(data);
        }
      );
    });
  },
  createMapel10AllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text:
          "INSERT INTO mapel10 (kode_mapel, nama_mapel, nama_guru, is_delete) VALUES ($1, $2, $3, $4)",
        values: [docs.kode_mapel, docs.nama_mapel, docs.nama_guru, docs.is_delete]
      };
      console.log(JSON.stringify(query))

      client.query(query, function(err, result) {

        done();
        console.log(result);
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  updateMapel10AllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      const query = {
        text: "UPDATE mapel10 SET kode_mapel = ($1), nama_mapel = ($2), nama_guru = ($3), where id = ($4)",
        values: [docs.kode_mapel, docs.nama_mapel, docs.nama_guru, docs.id]
      };
      console.log(JSON.stringify(query));

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
  deleteMapel10AllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE mapel10 SET is_delete = true WHERE id = ($1)",
        values: [docs.id]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        callback(data);
      });
    });
  },
};

module.exports = dt
