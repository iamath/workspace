const express = require('express')
const axios = require('axios')
const multer = require('multer')
const api = require('../config/apiConfig')
const verificacoes = require('../util/verificacoes')
const cpf = require('node-cpf-cnpj')

router = express.Router()

/*
 * Middleware que decodifica o enctype
 * do form e envia para o req.body
 */
const getFields = multer().any()

/*
 * Validação do form
 * Continua a execução caso o e-mail
 * e cpf não estejam cadastrados
 */
const verificaCadastro = async (req, res, next) => {
  const emailExiste = await verificacoes.verificaEmail(req.body.email)
  const cpfExiste = await verificacoes.verificaCPF(req.body.cpf)

  if (emailExiste) {
    res.render('cadastro/cliente', { erro: 'E-Mail já cadastrado' })
  } else if (cpfExiste) {
    res.render('cadastro/cliente', { erro: 'CPF já cadastrado' })
  } else if (!cpf.isValid(req.body.cpf)) {
    res.render('cadastro/cliente', { erro: 'CPF inválido' })
  } else if (req.body.senha !== req.body.confSenha) {
    res.render('cadastro/cliente', { erro: 'Senhas não coincidem' })
  } else {
    next()
  }
}

const cadastraCliente = (req, res) => {
  axios.post(`${api.url}/cliente`, req.body)
  res.render('cadastro/cliente', { sucesso: true })
}

router.post('/cadastro/cliente', getFields, verificaCadastro, cadastraCliente)

router.get('/cadastro/cliente', (req, res) => {
  res.render('cadastro/cliente')
})

module.exports = router
