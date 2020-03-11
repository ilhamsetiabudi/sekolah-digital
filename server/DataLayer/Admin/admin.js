const pg = require("pg");
const bcrypt = require("bcryptjs");
const DatabaseConnection = require("../../Config/dbp.config.json");
var DB = new pg.Pool(DatabaseConnection.config);

const dt = {
  readAdminAllHandlerData: callback => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      client.query(
        "SELECT * FROM admin WHERE is_delete = false ORDER BY username ASC",
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
  createAdminAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      var salt = bcrypt.genSaltSync(10);
      let pashash = bcrypt.hashSync(docs.password, salt);

      const query = {
        text:
          "INSERT INTO admin (username, fullname, password, is_delete) VALUES ($1, $2, $3, $4)",
        values: [docs.username, docs.fullname, pashash, docs.is_delete]
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
  updateAdminAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      var salt = bcrypt.genSaltSync(10);
      let pashash = bcrypt.hashSync(docs.password, salt);

      const query = {
        text: "UPDATE admin SET username = ($1), fullname = ($2), password = ($3) where id = ($4)",
        values: [docs.username, docs.fullname, pashash, docs.id]
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
  deletAdminAllHandlerData: (callback, docs) => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE admin SET is_delete = true WHERE username = ($1)",
        values: [docs.username]
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
  readOneAdminByIdData: (callback, username) => {
    // console.log(username);
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }
      // console.log(JSON.stringify(data));

      const query = {
        text: "SELECT * FROM admin WHERE username = ($1)",
        values: [username]
      };
      // console.log(JSON.stringify(query));

      client.query(query, function(err, result) {
        done();

        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        // console.log(JSON.stringify(data.username));

        callback(data);
      });
    });
  },
    updateAttemptUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text:
          "UPDATE admin SET login_ke = (login_ke + 1), login_terakhir = now() where username = ($1)",
        values: [username]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        // callback(data);
      });
    });
  },
  resetAttemptUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text:
          "UPDATE admin SET login_ke = 0, status = 'unlocked' where username = ($1)",
        values: [username]
      };

      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
  lockUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE admin SET status = 'locked' where username = ($1)",
        values: [username]
      };

      console.log(JSON.stringify(query));
      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
  unlockUser: username => {
    DB.connect(function(err, client, done) {
      var data = "";
      if (err) {
        data = err;
      }

      const query = {
        text: "UPDATE admin SET status = 'unlocked' where username = ($1)",
        values: [username]
      };

      console.log(JSON.stringify(query));
      client.query(query, function(err, result) {
        done();
        if (err) {
          data = err;
        } else {
          data = result.rows;
        }
        //callback(data);
      });
    });
  },
};

module.exports = dt
