$('#fileFotoPerfil').change(e =>
  $('#img-profile').attr('src', URL.createObjectURL(e.target.files[0]))
)
