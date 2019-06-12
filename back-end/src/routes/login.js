const namedPlaceholders = require('named-placeholders')()
const express = require('express')
const md5 = require('md5')

const execSQLQuery = require('../util/execSqlQuery')

router = express.Router()

router.get('/login/id/:id', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM login WHERE id = :id', {
    id: req.params.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/login/verifica/:email/:senha', (req, res) => {
  var query = namedPlaceholders(
    `SELECT * FROM login
    WHERE email = :email
    AND senha = :senha`,
    {
      email: req.params.email,
      senha: md5(req.params.senha)
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/login/email/:email', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM login WHERE email = :email', {
    email: req.params.email
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

module.exports = router
