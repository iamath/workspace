const express = require('express')
const axios = require('axios')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const api = require('../config/apiConfig')
const verificacoes = require('../util/verificacoes')
const cnpj = require('@fnando/cnpj/dist/node')

router = express.Router()

/*
 * Configuração do multer
 * define a pasta "upload" da raiz
 * do projeto para receber os uploads
 * Define o nome do arquivo como:
 * "(Data atual) - (Nome do arquivo enviado)"
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + '..', '..', '..', 'upload'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

/*
 * Executada quando as informações
 * do form não são válidas
 * Exclui a foto enviada
 * e envia uma mensgem de erro
 */
const mostraErro = (res, nomeFoto, erro) => {
  fs.unlinkSync(path.join(__dirname + `../../../upload/${nomeFoto}`))
  res.render('cadastro/prestador', { erro })
}

const verificaCadastro = async (req, res, next) => {
  const emailExiste = await verificacoes.verificaEmail(req.body.email)
  const cnpjExiste = await verificacoes.verificaCNPJ(req.body.cnpj)

  if (emailExiste) {
    mostraErro(res, req.file.filename, 'E-Mail já cadastrado')
  } else if (cnpjExiste) {
    mostraErro(res, req.file.filename, 'CNPJ já cadastrado')
  } else if (!cnpj.isValid(req.body.cnpj)) {
    mostraErro(res, req.file.filename, 'CNPJ inválido')
  } else if (req.body.senha !== req.body.confSenha) {
    mostraErro(res, req.file.filename, 'Senhas não coincidem')
  } else {
    next()
  }
}

const cadastraPrestador = (req, res) => {
  axios.post(`${api.url}/prestador`, {
    ...req.body,
    foto: req.file.filename
  })

  res.render('cadastro/prestador', { sucesso: true })
}

router.post(
  '/cadastro/prestador',
  upload.single('foto-perfil'),
  verificaCadastro,
  cadastraPrestador
)

router.get('/cadastro/prestador', (req, res) => {
  res.render('cadastro/prestador')
})

module.exports = router
