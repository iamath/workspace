var valid = {
  celular: false,
  cpf_cnpj: false
}

function enableSubmit(value) {
  if (value === 'celular') {
    valid.celular = true
  } else {
    valid.cpf_cnpj = true
  }

  if (valid.celular && valid.cpf_cnpj) $('#submit').removeAttr('disabled')
}

function disableSubmit(value) {
  if (value === 'celular') {
    valid.celular = false
  } else {
    valid.cpf_cnpj = false
  }

  $('#submit').attr('disabled', 'disabled')
}

$('#celular').mask('(00) 00000-0000', {
  onComplete: () => enableSubmit('celular'),
  onChange: () => disableSubmit('celular')
})
$('#cpf').mask('000.000.000-00', {
  onComplete: () => enableSubmit('cpf'),
  onChange: () => disableSubmit('cpf')
})
$('#cnpj').mask('00.000.000/0000-00', {
  onComplete: () => enableSubmit('cnpj'),
  onChange: () => disableSubmit('cnpj')
})
