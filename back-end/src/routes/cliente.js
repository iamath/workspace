const namedPlaceholders = require('named-placeholders')()
const express = require('express')
const md5 = require('md5')
const axios = require('axios')

const execSQLQuery = require('../util/execSqlQuery')

router = express.Router()

router.get('/cliente/id/:id', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM cliente WHERE id = :id', {
    id: req.params.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/cpf/:cpf', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM cliente WHERE cpf = :cpf', {
    cpf: req.params.cpf
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/id_login/:id_login', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM cliente WHERE id_login = :id_login',
    {
      id_login: req.params.id_login
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente', (req, res) => {
  execSQLQuery('SELECT * FROM cliente', result => {
    res.json(result)
  })
})

router.post('/cliente', (req, res) => {
  var query = namedPlaceholders(
    "INSERT INTO login (email, senha, tipo) VALUES (:email, :senha, 'cliente')",
    {
      email: req.body.email,
      senha: md5(req.body.senha)
    }
  )

  execSQLQuery(query, insertId => {
    query = namedPlaceholders(
      `INSERT INTO cliente (id_login, nome, celular, cpf) 
      VALUES (:id_login, :nome, :celular, :cpf)`,
      {
        id_login: insertId,
        nome: req.body.nome,
        celular: req.body.celular,
        cpf: req.body.cpf
      }
    )

    execSQLQuery(query, result => {
      res.json({ insertId: result })
    })
  })
})

router.post('/cliente/atualizar', (req, res) => {
  var query = namedPlaceholders(
    `UPDATE cliente SET celular = :celular WHERE id_login = :id_login;
    UPDATE login SET email = :email WHERE id = :id_login`,
    {
      celular: req.body.celular,
      id_login: req.body.id_login,
      email: req.body.email
    }
  )

  execSQLQuery(query, result => {
    res.send(result)
  })
})

router.post('/cliente/senha', (req, res) => {
  var query = namedPlaceholders(
    'UPDATE login SET senha = :senha WHERE id = :id',
    {
      id: req.body.id,
      senha: md5(req.body.senha)
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/cliente/pedido', (req, res) => {
  var query = namedPlaceholders(
    `INSERT INTO pedido (id_cliente, id_servico, data, status) 
    VALUES (:id_cliente, :id_servico, :data, 'pendente');
    UPDATE cliente SET ultima_categoria = :ultima_categoria
    WHERE id = :id_cliente`,
    {
      id_cliente: req.body.id_cliente,
      id_servico: req.body.id_servico,
      data: req.body.data,
      ultima_categoria: req.body.ultima_categoria
    }
  )

  execSQLQuery(query, result => {
    res.json({ insertId: result })
  })
})

router.get('/cliente/pedidos/:id_cliente', (req, res) => {
  var query = namedPlaceholders(
    `SELECT p.id, s.nome, p.data, p.status 
    FROM pedido as p 
    JOIN servico as s 
    ON p.id_servico = s.id 
    WHERE id_cliente = :id_cliente 
    ORDER BY id DESC`,
    {
      id_cliente: req.params.id_cliente
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/pedidos', async (req, res) => {
  execSQLQuery('SELECT * FROM pedido', result => {
    res.json(result)
  })
})

router.post('/cliente/pedidos', (req, res) => {
  var query = namedPlaceholders(
    'UPDATE pedido SET status = :status WHERE id = :id',
    {
      id: req.body.id,
      status: req.body.status
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/pedidos/servico/:id_servico', (req, res) => {
  var query = namedPlaceholders(
    `SELECT p.id, c.nome, p.data 
    FROM pedido as p 
    JOIN cliente as c 
    ON p.id_cliente = c.id
    WHERE p.id_servico = :id_servico 
    AND p.status = 'pendente'`,
    {
      id_servico: req.params.id_servico
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/proposta/:id_cliente', (req, res) => {
  var query = namedPlaceholders(
    `SELECT proposta.id, prestador.nome, proposta.preco, proposta.data 
    FROM proposta JOIN prestador
    ON proposta.id_prestador = prestador.id
    JOIN pedido ON proposta.id_pedido = pedido.id 
    JOIN cliente ON pedido.id_cliente = cliente.id
    WHERE pedido.status = 'prop. enviada'
    AND proposta.status = 'pendente' 
    AND pedido.id_cliente = :id_cliente`,
    {
      id_cliente: req.params.id_cliente
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/cliente/excluir', (req, res) => {
  var query = namedPlaceholders(`DELETE FROM login WHERE id = :id`, {
    id: req.body.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/cliente/pedido/:id_pedido', (req, res) => {
  var query = namedPlaceholders(
    `SELECT ped.*, ser.nome as nome_servico, cli.nome as nome_cliente
    FROM pedido as ped JOIN servico as ser
    ON ser.id = ped.id_servico 
    JOIN cliente AS cli
    WHERE ped.id = :id`,
    { id: req.params.id_pedido }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

module.exports = router
