const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const port = process.env.PORT || 3000

const app = express()

app.use(helmet())
app.use(compression())

// Configuração do body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Definição das rotas
const clienteRouter = require('./src/routes/cliente')
const loginRouter = require('./src/routes/login')
const prestadorRouter = require('./src/routes/prestador')
const servicoRouter = require('./src/routes/servico')
const categoriaRouter = require('./src/routes/categoria')

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))

app.use('/', clienteRouter)
app.use('/', loginRouter)
app.use('/', prestadorRouter)
app.use('/', servicoRouter)
app.use('/', categoriaRouter)

app.listen(port, () => console.log(`Rodando na porta ${port}`))
