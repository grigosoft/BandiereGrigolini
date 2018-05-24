function visualizza(){
  var ricerca = $('#ricerca').val().toLowerCase();
  if(ricerca != null && ricerca.length > 0) {
    $('div[stato]').addClass('hide');
    $('div[stato^="'+$('#ricerca').val()+'"]').removeClass('hide');
  } else {
    $('div[stato].hide').removeClass('hide');
  }
}
$(document).ready(function(){
  $('#ricerca').change(visualizza);
  $('#ricerca').keyup(visualizza);

  $('[data-product-radio="stati"]').click(function(){
    $('[data-product-radio="stati"]').removeClass('selected');
    $(this).addClass('selected');
  });
});
