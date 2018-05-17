$(document).ready(function(){

  // carica da more options la selezione
  caricaConsegnaDaMoreOptions();


  // selezione data consegna
  $('[data-date-selection="data_consegna"]').click(function(){
    var questo = $(this);
    if(questo.hasClass('unactive')) {
      return;
    }
    $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
    questo.addClass('selected');
    // riferimento a funzione in bandiere.js
    setInMoreOptions();
  });
});

function caricaConsegnaDaMoreOptions(){
  try {
    var moreOptions = JSON.parse($('#more_options').val());
    var consegna = moreOptions['consegna'];
    if(consegna != null){
      $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
      $('#consegna_'+consegna).addClass('selected');
      return;
    }
  } catch(err) {}
  // default conegna price_including_vat_for
  $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
  // $('#consegna_3').addClass('selected');
  // riferimento a funzione in bandiere.js
  // setInMoreOptions();
}
