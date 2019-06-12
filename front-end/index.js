// Declaração de dependências
const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

const indexRouter = require('./src/routes/index')
const loginRouter = require('./src/routes/login')

const clienteRouter = require('./src/routes/cliente')
const prestadorRouter = require('./src/routes/prestador')

const cadastroClienteRouter = require('./src/routes/cadastro-cliente')
const cadastroPrestadorRouter = require('./src/routes/cadastro-prestador.js')

/*
 * Atualiza o status dos pedidos a cada 1 hora
 * caso esteja na data de expiração, o status
 * do pedido é alterado para "expirado"
 */
const updatePedidos = require('./src/util/updatePedidos')

updatePedidos()
setInterval(updatePedidos, 36 * 10 ** 5)

const app = express()

app.use(helmet())
app.use(compression())

// Definição da porta que o app irá rodar
const port = process.env.PORT || 4000

/*
 * Configuração do nunjucks
 * Definição da pasta raiz
 * onde os templates estarão
 */
nunjucks.configure(path.join(__dirname, '/src/pages'), {
  autoescape: true,
  express: app
})

/*
 * Configuração do CORS
 * Qualquer um poderá acessar
 * as rotas do app
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'njk')

/*
 * Configuração para poder usar
 * algumas pastas (GET)
 */
app.use(
  '/fa',
  express.static(
    path.join(__dirname + '/node_modules/@fortawesome/fontawesome-free')
  )
)
app.use(
  '/bootstrap',
  express.static(path.join(__dirname + '/node_modules/bootstrap/dist'))
)
app.use(
  '/jquery',
  express.static(path.join(__dirname + '/node_modules/jquery/dist'))
)
app.use(
  '/popper',
  express.static(path.join(__dirname + '/node_modules/popper.js/dist/umd'))
)
app.use('/assets', express.static(path.join(__dirname + '/src/assets')))
app.use('/upload', express.static(path.join(__dirname + '/upload')))

// Rotas do site
app.use('/', cadastroPrestadorRouter)
app.use('/', cadastroClienteRouter)
app.use('/', indexRouter)
app.use('/', loginRouter)
app.use('/', prestadorRouter)
app.use('/', clienteRouter)

// Comando para rodar o servidor
app.listen(port, () => console.log(`Rodando na porta ${port}`))
