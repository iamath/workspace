const namedPlaceholders = require('named-placeholders')()
const express = require('express')
const md5 = require('md5')
const axios = require('axios')
const api = require('../config/apiConfig')

const execSQLQuery = require('../util/execSqlQuery')

router = express.Router()

router.get('/prestador/id/:id', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM prestador WHERE id = :id', {
    id: req.params.id
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/prestador/id_login/:id_login', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM prestador WHERE id_login = :id_login',
    {
      id_login: req.params.id_login
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/prestador/cnpj/:cnpj', (req, res) => {
  var query = namedPlaceholders('SELECT * FROM prestador WHERE cnpj = :cnpj', {
    cnpj: req.params.cnpj
  })

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/prestador/profissao/:id_profissao', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM prestador WHERE id_profissao = :id_profissao',
    { id_profissao: req.params.id_profissao }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.get('/prestador', (req, res) =>
  execSQLQuery('SELECT * FROM prestador', result => {
    res.json(result)
  })
)

router.post('/prestador', (req, res) => {
  var query = namedPlaceholders(
    "INSERT INTO login (email, senha, tipo) VALUES (:email, :senha, 'prestador')",
    {
      email: req.body.email,
      senha: md5(req.body.senha)
    }
  )

  execSQLQuery(query, insertId => {
    query = namedPlaceholders(
      `INSERT INTO prestador (id_login, nome, celular, cnpj, id_profissao, foto) 
      VALUES (:id_login, :nome, :celular, :cnpj, :profissao, :foto)`,
      {
        id_login: insertId,
        nome: req.body.nome,
        celular: req.body.celular,
        cnpj: req.body.cnpj,
        profissao: req.body.profissao,
        foto: req.body.foto
      }
    )

    execSQLQuery(query, insertId => {
      res.json(insertId)
    })
  })
})

router.get('/prestador/propostas/:id_prestador', (req, res) => {
  var query = namedPlaceholders(
    'SELECT * FROM proposta WHERE id_prestador = :id_prestador',
    req.params
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/proposta/:id_pedido', async (req, res) => {
  var query = namedPlaceholders(
    `INSERT INTO proposta (id_prestador, id_pedido, preco, data, status)
    VALUES (:id_prestador, :id_pedido, :preco, :data, 'pendente');
    UPDATE pedido SET status = 'prop. enviada' WHERE id = :id_pedido`,
    {
      id_prestador: req.body.id_prestador,
      id_pedido: req.params.id_pedido,
      preco: req.body.preco,
      data: req.body.data
    }
  )

  execSQLQuery(query, result => {
    res.send(result)
  })
})

router.get('/prestador/proposta/:id_proposta', async (req, res) => {
  var query = namedPlaceholders(
    `SELECT pro.*,
    ser.nome AS nome_servico, pro.data, pro.preco,
    cli.celular as celular_cli, cli.nome AS nome_cliente, 
    pre.nome as nome_prestador, pre.celular as celular_pre
    FROM proposta as pro JOIN pedido as ped 
    ON pro.id_pedido = ped.id 
    JOIN servico as ser ON ped.id_servico = ser.id 
    JOIN cliente as cli ON ped.id_cliente = cli.id 
    JOIN prestador as pre ON pro.id_prestador = pre.id
    WHERE pro.id = :id_proposta`,
    { id_proposta: req.params.id_proposta }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/proposta/aceitar/:id_proposta', async (req, res) => {
  const dadosProposta = await axios
    .get(`${api.url}/prestador/proposta/${req.params.id_proposta}`)
    .then(response => response.data[0])
    .catch(error => 404)

  const dadosPedido = await axios
    .get(`${api.url}/cliente/pedido/${dadosProposta.id_pedido}`)
    .then(response => response.data[0])
    .catch(error => 404)

  const dadosCliente = await axios
    .get(`${api.url}/cliente/id/${dadosPedido.id_cliente}`)
    .then(response => response.data[0])
    .catch(error => 404)

  const dadosPrestador = await axios
    .get(`${api.url}/prestador/id/${dadosProposta.id_prestador}`)
    .then(response => response.data[0])
    .catch(error => 404)

  var query = namedPlaceholders(
    `INSERT INTO contrato (cpf, cnpj, preco, data) 
    VALUES (:cpf, :cnpj, :preco, :data);
    UPDATE pedido SET status = 'concluido' 
    WHERE id = :id_pedido;
    UPDATE proposta SET status = 'aceita'
    WHERE id = :id_proposta`,
    {
      cpf: dadosCliente.cpf,
      cnpj: dadosPrestador.cnpj,
      preco: dadosProposta.preco,
      data: new Date(dadosProposta.data).toLocaleDateString(),
      id_pedido: dadosProposta.id_pedido,
      id_proposta: req.params.id_proposta
    }
  )

  execSQLQuery(query, result => {
    res.send(result)
  })
})

router.post('/prestador/proposta/recusar/:id_proposta', async (req, res) => {
  const dadosProposta = await axios
    .get(`${api.url}/prestador/proposta/${req.params.id_proposta}`)
    .then(response => response.data[0])
    .catch(error => 404)

  var query = namedPlaceholders(
    `UPDATE pedido SET status = 'pendente' 
    WHERE id = :id_pedido;
    UPDATE proposta SET status = 'recusada'
    WHERE id = :id_proposta`,
    {
      id_pedido: dadosProposta.id_pedido,
      id_proposta: req.params.id_proposta
    }
  )

  execSQLQuery(query, result => {
    res.send(result)
  })
})

router.get('/prestador/proposta/aceita/:id_prestador', (req, res) => {
  var query = namedPlaceholders(
    `SELECT pro.id,
    ser.nome AS nome_servico,
    pro.data, pro.preco,
    cli.celular, cli.nome AS nome_cliente 
    FROM proposta as pro JOIN pedido as ped 
    ON pro.id_pedido = ped.id 
    JOIN servico as ser ON ped.id_servico = ser.id 
    JOIN cliente as cli ON ped.id_cliente = cli.id 
    WHERE pro.status = 'aceita' 
    AND pro.id_prestador = :id_prestador
    ORDER BY pro.id DESC`,
    {
      id_prestador: req.params.id_prestador
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/atualizar', (req, res) => {
  var query = namedPlaceholders(
    `UPDATE prestador SET nome = :nome, 
    celular = :celular, id_profissao = :profissao 
    WHERE id_login = :id_login; 
    UPDATE login SET email = :email
    WHERE id = :id_login;`,
    { ...req.body }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/senha', (req, res) => {
  var query = namedPlaceholders(
    'UPDATE login SET senha = :senha WHERE id = :id',
    {
      senha: md5(req.body.senha),
      id: req.body.id
    }
  )

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/foto', (req, res) => {
  var query = namedPlaceholders('UPDATE prestador SET foto = :foto', req.body)

  execSQLQuery(query, result => {
    res.json(result)
  })
})

router.post('/prestador/excluir', async (req, res) => {
  await axios
    .get(`${api.url}/prestador/propostas/${req.body.id_prestador}`)
    .then(response => {
      for (var i = 0; i < response.data.length; i++) {
        axios.post(
          `${api.url}/prestador/proposta/recusar/${response.data[i].id}`
        )
      }
    })
    .catch(error => error)

  var query = namedPlaceholders('DELETE FROM login WHERE id = :id', req.body)

  execSQLQuery(query, result => {
    res.json(result)
  })
})

module.exports = router
