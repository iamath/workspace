const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const api = require('../config/apiConfig')
const verificacoes = require('../util/verificacoes')

router = express.Router()
router.use(cookieParser())

/*
 * Variáveis globais compartilhadas
 * entre "removeEInsereCookies" e "recebeDadosPessoa"
 */
var dadosLogin
var dadosPessoa

/*
 * Middleware para autenticação
 * Apenas continua a execução se o e-mail e senha estiverem corretos
 * Caso contrário para a execução e exibe uma mensagem de erro
 */
const verificaLogin = async (req, res, next) => {
  const email = req.body.email
  const senha = req.body.senha

  dadosLogin = await axios
    .get(`${api.url}/login/verifica/${email}/${senha}`)
    .then(response => response.data[0])
    .catch(error => false)

  if (dadosLogin) {
    next()
  } else {
    res.render('login/index', { erro: 'Dados incorretos' })
  }
}

/*
 * Armazena os dados na variável "dadosPessoa"
 * baseado no tipo de login: prestdor ou cliente
 */
const recebeDadosPessoa = async (req, res, next) => {
  dadosPessoa = await axios
    .get(`${api.url}/${dadosLogin.tipo}/id_login/${dadosLogin.id}`)
    .then(response => response.data[0])
  next()
}

/*
 * Limpa todos os cookies que o app usa
 * e depois insere novas informações que
 * estão em "dadosLogin" e "dadosPessoa"
 */
const removeEInsereCookies = (req, res, next) => {
  res.clearCookie('id_login')
  res.clearCookie('email')
  res.clearCookie('tipo')
  res.clearCookie('nome')
  res.clearCookie('celular')
  res.clearCookie('cnpj')
  res.clearCookie('foto')
  res.clearCookie('profissao')
  res.clearCookie('cpf')

  res.cookie('id_login', dadosLogin.id)
  res.cookie('email', dadosLogin.email)
  res.cookie('tipo', dadosLogin.tipo)
  res.cookie('nome', dadosPessoa.nome)
  res.cookie('celular', dadosPessoa.celular)
  res.cookie('id_pessoa', dadosPessoa.id)

  if (dadosLogin.tipo === 'prestador') {
    res.cookie('cnpj', dadosPessoa.cnpj)
    res.cookie('foto', dadosPessoa.foto)
    res.cookie('profissao', dadosPessoa.id_profissao)
  } else {
    res.cookie('cpf', dadosPessoa.cpf)
  }
  next()
}

/*
 * Rota de POST, usada quando
 * enviar informações do login
 * Executa os middlewares
 * e redireciona para o index
 */

router.post(
  '/login',
  verificaLogin,
  recebeDadosPessoa,
  removeEInsereCookies,
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/login', (req, res) => {
  res.render('login/index')
})

module.exports = router
