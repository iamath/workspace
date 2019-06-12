const express = require('express')
const cookieParser = require('cookie-parser')
const updateCookies = require('../util/updateCookies')
const axios = require('axios')
const api = require('../config/apiConfig')
const moment = require('moment')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const verificacoes = require('../util/verificacoes')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + '..', '..', '..', 'upload'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

const router = express.Router()

router.use(cookieParser())
router.use(updateCookies)

router.use('/prestador', (req, res, next) => {
  if (req.cookies.tipo == 'cliente' || req.cookies.tipo == undefined) {
    res.redirect('/')
  } else {
    next()
  }
})

router.get('/prestador', async (req, res) => {
  const pedidos = await axios
    .get(`${api.url}/cliente/pedidos/servico/${req.cookies.profissao}`)
    .then(response => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].data = moment(response.data[i].data).format(
          'DD/MM/YYYY'
        )
        response.data[i].nome = response.data[i].nome.split(' ')[0]
      }
      return response.data
    })
    .catch(error => false)

  res.render('prestador/index', {
    cookies: req.cookies,
    pedidos,
    home: 'active'
  })
})

router.get('/prestador/notificacoes', async (req, res) => {
  const notificacoes = await axios
    .get(`${api.url}/prestador/proposta/aceita/${req.cookies.id_pessoa}`)
    .then(response => {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].nome_cliente = response.data[i].nome_cliente.split(
          ' '
        )[0]
      }
      return response.data
    })
    .catch(error => 404)

  res.render('prestador/notificacoes', {
    cookies: req.cookies,
    notif: 'active',
    notificacoes
  })
})

router.get('/prestador/configuracoes', (req, res) => {
  res.render('prestador/config', {
    cookies: req.cookies,
    config: 'active'
  })
})

router.get('/prestador/proposta/:id_pedido', async (req, res) => {
  const pedido = await axios
    .get(`${api.url}/cliente/pedido/${req.params.id_pedido}`)
    .then(response => {
      var registro = response.data[0]
      registro.data = moment(registro.data).format('DD/MM/YYYY')
      registro.nome_cliente = registro.nome_cliente.split(' ')[0]
      return registro
    })
    .catch(error => 404)

  res.render('prestador/proposta', {
    cookies: req.cookies,
    pedido
  })
})

router.get('/prestador/notificacao/:id_proposta', async (req, res) => {
  const proposta = await axios
    .get(`${api.url}/prestador/proposta/${req.params.id_proposta}`)
    .then(response => {
      response.data[0].data = moment(response.data[0].data).format('DD/MM/YYYY')
      return response.data[0]
    })
    .catch(error => 404)

  res.render('prestador/notificacao', {
    cookies: req.cookies,
    proposta
  })
})

router.post('/prestador/proposta/:id_pedido', async (req, res) => {
  await axios
    .post(`${api.url}/prestador/proposta/${req.params.id_pedido}`, {
      id_prestador: req.cookies.id_pessoa,
      preco: req.body.preco,
      data: req.body.data
    })
    .then(response => response)
    .catch(error => error)

  res.render('prestador/proposta_enviada.njk', { cookies: req.cookies })
})

router.post('/prestador/atualizar', async (req, res) => {
  const emailExiste = await verificacoes.verificaEmail(req.body.email)

  if (
    req.body.email === req.cookies.email ||
    typeof emailExiste == 'undefined'
  ) {
    await axios
      .post(`${api.url}/prestador/atualizar`, {
        ...req.body,
        id_login: req.cookies.id_login
      })
      .then(response => res.redirect('/prestador'))
  } else {
    res.render('prestador/config', {
      erro: 'E-Mail já cadastrado',
      cookies: req.cookies
    })
  }
})

router.post('/prestador/foto', upload.single('foto-perfil'), (req, res) => {
  fs.unlinkSync(path.join(__dirname + `../../../upload/${req.cookies.foto}`))

  axios
    .post(`${api.url}/prestador/foto`, {
      foto: req.file.filename
    })
    .then(response => response)
    .catch(error => false)

  res.redirect('/prestador')
})

router.post('/prestador/senha', (req, res) => {
  axios
    .post(`${api.url}/prestador/senha`, {
      id: req.cookies.id_login,
      senha: req.body.senha
    })
    .then(response => res.redirect('/prestador'))
})

router.post('/prestador/excluir', (req, res) => {
  fs.unlinkSync(path.join(__dirname + `../../../upload/${req.cookies.foto}`))

  axios
    .post(`${api.url}/prestador/excluir`, {
      id: req.cookies.id_login,
      id_prestador: req.cookies.id_pessoa
    })
    .then(response => {
      res.redirect('/')
    })
    .catch(error => error)
})

module.exports = router
