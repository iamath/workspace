const express = require('express')
const cookieParser = require('cookie-parser')
const updateCookies = require('../util/updateCookies')

router = express.Router()
router.use(cookieParser())
router.use(updateCookies)

router.get('/', (req, res) => {
  const tipo = req.cookies.tipo
  if (tipo === undefined || tipo == 'undefined') {
    res.render('index/index')
  } else if (tipo === 'cliente') {
    res.redirect('/cliente')
  } else {
    res.redirect('/prestador')
  }
})

module.exports = router
