const namedPlaceholders = require('named-placeholders')()
const express = require('express')

const execSQLQuery = require('../util/execSqlQuery')

router = express.Router()

router.get('/servico/categoria/:categoria', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM servico WHERE id_categoria = :id_categoria',
    { id_categoria: req.params.categoria }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/servico/categoria/:categoria/3', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM servico WHERE id_categoria = :id_categoria LIMIT 3',
    { id_categoria: req.params.categoria }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/servico/id/:id', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM servico WHERE id = :id', {
    id: req.params.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/servico/pedido', (req, res) => {
  var query = 'SELECT * FROM servico ORDER BY pedidos DESC LIMIT 6'

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/servico/nome/:nome', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM servico WHERE nome LIKE :nome', {
    nome: `%${req.params.nome}%`
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

module.exports = router
