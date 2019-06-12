const api = require('../config/apiConfig')
const axios = require('axios')

/*
 * Recebe um e-mail por parâmetro
 * retorna as informações de login desse e-mail
 * Caso não for encontrado retorna false
 */
const verificaEmail = async email => {
  return axios
    .get(`${api.url}/login/email/${email}`)
    .then(response => response.data[0])
    .catch(error => false)
}

/*
 * Recebe um cnpj por parâmetro
 * retorna as informações do prestador
 * Caso não for encontrado retorna false
 */
const verificaCNPJ = async cnpj => {
  return axios
    .get(`${api.url}/prestador/${cnpj}`)
    .then(response => response.data[0])
    .catch(error => false)
}

/*
 * Semelhante ao verificaCNPJ
 * porém recebe um CPF como parâmetro
 * e retorna informações do cliente
 */
const verificaCPF = async cpf => {
  return axios
    .get(`${api.url}/cliente/cpf/${cpf}`)
    .then(response => response.data[0])
    .catch(error => false)
}

module.exports = { verificaEmail, verificaCNPJ, verificaCPF }
