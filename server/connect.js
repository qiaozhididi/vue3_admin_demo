import mysql from "mysql";
const MySQLObj = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "vue3_demo",
  port: 3305,
};
const pool = mysql.createPool(MySQLObj);
function SQLConnect(sql, arr, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    connection.query(sql, arr, (err, result) => {
      connection.release(); //释放连接
      if (err) {
        console.log(err);
        return;
      }
      callback(result);
    });
  });
}
export default SQLConnect;
