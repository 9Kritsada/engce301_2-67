var dbconfig = {
  development: {
    //connectionLimit : 10,
    host: "172.17.192.1",
    port: "3306",
    user: "root",
    password: "",
    database: "moviedb",
  },
  production: {
    //connectionLimit : 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "moviedb",
  },
};
module.exports = dbconfig;
