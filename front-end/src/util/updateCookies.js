const axios = require('axios')
const cookieParser = require('cookie-parser')
const api = require('../config/apiConfig')

const dadosLogin = req => {
  return axios
    .get(`${api.url}/login/id/${req.cookies.id_login}`)
    .then(response => response.data[0])
    .catch(error => 404)
}

const dadosPessoa = async (req, infoLogin) => {
  return await axios
    .get(`${api.url}/${infoLogin.tipo}/id_login/${req.cookies.id_login}`)
    .then(response => response.data[0])
    .catch(error => 404)
}

const qtdNotificacoesCliente = async req => {
  return await axios
    .get(`${api.url}/cliente/proposta/${req.cookies.id_pessoa}`)
    .then(response => response.data.length)
    .catch(error => 404)
}

const qtdNotificacoesPrestador = async req => {
  return (notificacoes = await axios
    .get(`${api.url}/prestador/proposta/aceita/${req.cookies.id_pessoa}`)
    .then(response => response.data.length)
    .catch(error => 404))
}

module.exports = async (req, res, next) => {
  try {
    if (
      req.cookies.id_login != 'undefined' &&
      req.cookies.id_login !== undefined
    ) {
      infoLogin = await dadosLogin(req)

      res.clearCookie('id_login')
      res.clearCookie('email')
      res.clearCookie('tipo')
      res.clearCookie('nome')
      res.clearCookie('celular')
      res.clearCookie('cnpj')
      res.clearCookie('foto')
      res.clearCookie('profissao')
      res.clearCookie('cpf')
      res.clearCookie('id_pessoa')
      res.clearCookie('ultima_categoria')

      if (infoLogin != 404) {
        infoPessoa = await dadosPessoa(req, infoLogin)

        res.cookie('id_login', infoLogin.id)
        res.cookie('email', infoLogin.email)
        res.cookie('tipo', infoLogin.tipo)
        res.cookie('nome', infoPessoa.nome)
        res.cookie('celular', infoPessoa.celular)
        res.cookie('id_pessoa', infoPessoa.id)
        if (infoLogin.tipo === 'prestador') {
          res.cookie('cnpj', infoPessoa.cnpj)
          res.cookie('foto', infoPessoa.foto)
          res.cookie('profissao', infoPessoa.id_profissao)

          const qtd = await qtdNotificacoesPrestador(req)

          if (qtd != undefined) {
            res.cookie('qtd_notificacoes', qtd)
          } else {
            res.cookie('qtd_notificacoes', '0')
          }
        } else {
          res.cookie('cpf', infoPessoa.cpf)
          res.cookie('ultima_categoria', infoPessoa.ultima_categoria)

          const qtd = await qtdNotificacoesCliente(req)

          if (qtd != undefined) {
            res.cookie('qtd_notificacoes', qtd)
          } else {
            res.cookie('qtd_notificacoes', '0')
          }
        }
      }
    }
  } catch {
    res.clearCookie('id_login')
    res.clearCookie('email')
    res.clearCookie('tipo')
    res.clearCookie('nome')
    res.clearCookie('celular')
    res.clearCookie('cnpj')
    res.clearCookie('foto')
    res.clearCookie('profissao')
    res.clearCookie('cpf')
    res.clearCookie('id_pessoa')
    res.clearCookie('ultima_categoria')
  }
  next()
}
