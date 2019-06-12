const express = require('express')
const cookieParser = require('cookie-parser')
const updateCookies = require('../util/updateCookies')
const axios = require('axios')
const api = require('../config/apiConfig')
const moment = require('moment')
const verificacoes = require('../util/verificacoes')

const router = express.Router()

router.use(cookieParser())
router.use(updateCookies)
router.use('/cliente', (req, res, next) => {
  if (req.cookies.tipo == 'prestador' || req.cookies.tipo == undefined) {
    res.redirect('/')
  } else {
    next()
  }
})

router.get('/cliente', async (req, res) => {
  const topServicos = await axios
    .get(`${api.url}/servico/pedido`)
    .then(response => response.data)

  const ultimosServicos = await axios
    .get(`${api.url}/servico/categoria/${req.cookies.ultima_categoria}/3`)
    .then(response => response.data)
    .catch(error => false)

  res.render('cliente/index', {
    cookies: req.cookies,
    topServicos,
    ultimosServicos
  })
})

router.get('/cliente/servicos/:categoria', async (req, res) => {
  const servicos = await axios
    .get(`${api.url}/servico/categoria/${req.params.categoria}`)
    .then(response => response.data)
    .catch(error => false)

  var categoria

  if (servicos != 404) {
    categoria = await axios
      .get(`${api.url}/categoria/${servicos[0].id_categoria}`)
      .then(response => response.data[0])
      .catch(error => false)

    res.render('cliente/categoria', {
      cookies: req.cookies,
      servicos,
      categoria: categoria.nome
    })
  } else {
    res.render('cliente/404', { cookies: req.cookies })
  }
})

router.get('/cliente/servico/:id', async (req, res) => {
  const servico = await axios
    .get(`${api.url}/servico/id/${req.params.id}`)
    .then(response => response.data[0])
    .catch(error => false)

  if (!servico) {
    res.render('cliente/404', { cookies: req.cookies })
  } else {
    const prestadores = await axios
      .get(`${api.url}/prestador/profissao/${servico.id}`)
      .then(response => response.data.slice(0, 3))
      .catch(error => false)

    res.render('cliente/servico', {
      cookies: req.cookies,
      servico,
      prestadores
    })
  }
})

router.post('/cliente/pesquisar', async (req, res) => {
  const servicos = await axios
    .get(`${api.url}/servico/nome/${req.body.servico}`)
    .then(response => response.data)
    .catch(error => false)

  if (servicos == 404) {
    res.render('cliente/404', { cookies: req.cookies })
  } else {
    res.render('cliente/pesquisa', { cookies: req.cookies, servicos })
  }
})

router.get('/cliente/conta', (req, res) => {
  res.render('cliente/configuracoes', { cookies: req.cookies })
})

router.post('/cliente/atualizar', async (req, res) => {
  const emailExiste = await verificacoes.verificaEmail(req.body.email)

  if (
    req.body.email === req.cookies.email ||
    typeof emailExiste == 'undefined'
  ) {
    await axios
      .post(`${api.url}/cliente/atualizar`, {
        ...req.body,
        id_login: req.cookies.id_login
      })
      .then(response => res.redirect('/cliente'))
  } else {
    res.render('cliente/configuracoes', {
      erro: 'E-Mail já cadastrado',
      cookies: req.cookies
    })
  }
})

router.post('/cliente/senha', (req, res) => {
  axios
    .post(`${api.url}/cliente/senha`, {
      id: req.cookies.id_login,
      senha: req.body.senha
    })
    .then(response => res.redirect('/cliente'))
})

router.post('/cliente/pedido', async (req, res) => {
  /*
   * Recebe os dados do serviço pedido
   * para inserir na tabela pedido
   */
  const servico = await axios
    .get(`${api.url}/servico/id/${req.body.id_servico}`)
    .then(response => response.data[0])

  /*
   * A variável data pode conter os
   * valores 1, 2 ou uma data específica.
   */
  var data = req.body.sltData
  var dataMax

  /*
   * Verificação para atribuir um valor
   * para a var. dataMax.
   * Caso a var. data seja uma data
   * específica, ela é formatada no padrão
   * brasileiro e inserida na var. dataMax.
   */
  if (req.body.sltData == 1) {
    dataMax = moment().add(7, 'days')
  } else if (req.body.sltData == 2) {
    dataMax = moment().add(30, 'days')
  } else {
    data = moment(req.body.dtpData).format('DD/MM/YYYY')
    dataMax = moment(req.body.dtpData)
  }

  /*
   * Acessa a API para inserir os dados
   * do pedido no banco de dados.
   */
  await axios.post(`${api.url}/cliente/pedido`, {
    id_cliente: req.cookies.id_pessoa,
    id_servico: req.body.id_servico,
    data: dataMax.format('YYYY-MM-DD'),
    ultima_categoria: servico.id_categoria
  })

  res.render('cliente/pedido', {
    cookies: req.cookies,
    servico,
    data,
    dataMax: dataMax.format('DD/MM/YYYY')
  })
})

router.get('/cliente/historico', (req, res) => {
  axios
    .get(`${api.url}/cliente/pedidos/${req.cookies.id_pessoa}`)
    .then(response => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].data = moment(response.data[i].data).format(
          'DD/MM/YYYY'
        )
      }

      res.render('cliente/historico', {
        cookies: req.cookies,
        pedidos: response.data
      })
    })
    .catch(error => {
      res.render('cliente/historico', { cookies: req.cookies, pedidos: false })
    })
})

router.get('/cliente/notificacoes', async (req, res) => {
  const propostas = await axios
    .get(`${api.url}/cliente/proposta/${req.cookies.id_pessoa}`)
    .then(response => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].nome = response.data[i].nome.split(' ')[0]
      }
      return response.data
    })
    .catch(error => 404)

  res.render('cliente/notificacoes', { cookies: req.cookies, propostas })
})

router.get('/cliente/notificacao/:id_proposta', async (req, res) => {
  const proposta = await axios
    .get(`${api.url}/prestador/proposta/${req.params.id_proposta}`)
    .then(response => {
      response.data[0].data = moment(response.data[0].data).format('DD/MM/YYYY')
      return response.data[0]
    })
    .catch(error => 404)

  res.render('cliente/notificacao', { cookies: req.cookies, proposta })
})

router.post('/cliente/proposta/aceitar/:id_proposta', async (req, res) => {
  await axios
    .post(`${api.url}/prestador/proposta/aceitar/${req.params.id_proposta}`)
    .then(response => response)
    .catch(error => error)

  const contrato = await axios
    .get(`${api.url}/prestador/proposta/${req.params.id_proposta}`)
    .then(response => {
      response.data[0].data = moment(response.data[0].data).format('DD/MM/YYYY')
      return response.data[0]
    })
    .catch(error => false)

  console.log(contrato)

  res.render('cliente/contrato', { cookies: req.cookies, contrato })
})

router.post('/cliente/proposta/recusar/:id_proposta', async (req, res) => {
  await axios
    .post(`${api.url}/prestador/proposta/recusar/${req.params.id_proposta}`)
    .then(response => response)
    .catch(error => error)

  res.render('cliente/notificacoes', { cookies: req.cookies })
})

router.post('/cliente/excluir', (req, res) => {
  axios
    .post(`${api.url}/cliente/excluir`, {
      id: req.cookies.id_login
    })
    .then(response => {
      res.redirect('/')
    })
    .catch(error => error)
})

module.exports = router
