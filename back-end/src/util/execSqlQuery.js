const mysql = require('mysql')
const connConfig = require('../config/config')

const execSQLQuery = (sqlQry, callback) => {
  const connection = mysql.createConnection(connConfig)
  var query
  var parametros

  if (typeof sqlQry == 'string') {
    query = sqlQry
    parametros = undefined
  } else {
    query = sqlQry[0]
    parametros = sqlQry[1]
  }

  connection.query(query, parametros, (error, results, fields) => {
    if (error) {
      callback(error)
    } else if (results.insertId !== undefined) {
      callback(results.insertId)
    } else if (results.length === 0) {
      callback(404)
    } else {
      callback(results)
    }
    connection.end()
  })
}

module.exports = execSQLQuery
