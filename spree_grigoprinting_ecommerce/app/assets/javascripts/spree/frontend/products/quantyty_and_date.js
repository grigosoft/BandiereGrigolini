$(document).ready(function(){

  // carica da more options la selezione
  try {
    var moreOptions = JSON.parse($('#more_options').val());
    var consegna = moreOptions['consegna'];
    if(consegna != null){
      $('#consegna_'+consegna).addClass('selected');
    } else {
      $('.selected[data-product-selection="data_consegna"]').removeClass('selected');
      $('#consegna_3').addClass('selected');
    }
  } catch(err) {
    $('.selected[data-product-selection="data_consegna"]').removeClass('selected');
    $('#consegna_3').addClass('selected');
  }


  // selezione data consegna
  $('[data-product-selection="data_consegna"]').click(function(){
    var questo = $(this);
    $('.selected[data-product-selection="data_consegna"]').removeClass('selected');
    questo.addClass('selected');
    // riferimento a funzione in bandiere.js
    setInMoreOptions();
  });
});
