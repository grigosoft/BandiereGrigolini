$(document).ready(function(){
  $('[data-product-selection="data_consegna"]').click(function(){
    var questo = $(this);
    $('.selected[data-product-selection="data_consegna"]').removeClass('selected');
    questo.addClass('selected');
  })
});
