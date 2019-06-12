const namedPlaceholders = require('named-placeholders')()
const express = require('express')

const execSQLQuery = require('../util/execSqlQuery')

router = express.Router()

router.get('/categoria/:id', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM categoria WHERE id = :id', {
    id: req.params.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

module.exports = router
