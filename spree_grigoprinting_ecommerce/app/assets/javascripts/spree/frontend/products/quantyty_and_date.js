$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["consegna"] = $('.selected[data-date-selection]').data('date-options');
  });
  prodotto.prezzo.push(function(){// le butta dentro piu volte, ogni volta che rirenderizza il partial
    var prezzoCad = 0;
    if (prodotto.moreOptions['consegna'] != null){
      prezzoCad = $('#consegna_'+prodotto.moreOptions['consegna']).attr('prezzo');
    }
    var quantity = $('#quanti').val();
    return prezzoCad*quantity;
  });


  // carica da more options la selezione
  // caricaConsegnaDaMoreOptions();


  // selezione data consegna
  $('[data-date-selection="data_consegna"]').click(function(){
    var questo = $(this);
    if(questo.hasClass('unactive')) {
      return;
    }
    $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
    questo.addClass('selected');

    prodotto.fireToMoreOptions();
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
