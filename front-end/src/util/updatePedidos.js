const api = require('../config/apiConfig')
const axios = require('axios')
const moment = require('moment')

const updatePedidos = async () => {
  /*
   * Retorna todos os pedidos
   * encontrados no banco de dados
   */
  const pedidos = await axios
    .get(`${api.url}/cliente/pedidos`)
    .then(response => response.data)
    .catch(error => -1)

  /*
   * Percorre o array de registros
   * e verifica se há algum expirado
   */
  for (var i = 0; i < pedidos.length; i++) {
    /*
     * Retorna a diferença de datas
     * caso esteja no futuro o resultado
     * será semelhante a "in 8 hours"
     * caso esteja no passado o resultado
     * será semelhante a "8 hours ago"
     */
    const diferenca = moment(pedidos[i].data).fromNow()

    /*
     * Recorta apenas os 2 primeiros
     * caracteres e verifica se é
     * diferente de "in"
     */
    if (diferenca.slice(0, 2) !== 'in' && pedidos[i].status === 'pendente') {
      /* caso verdadeiro é feita
       * uma requisição na API para
       * alterar o status do pedido
       * para "expirado"
       */
      await axios.post(`${api.url}/cliente/pedidos`, {
        id: pedidos[i].id,
        status: 'expirado'
      })
    }
  }
}

module.exports = updatePedidos
