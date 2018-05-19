function caricaConsegnaDaMoreOptions(){
  var consegna = prodotto.moreOptions['consegna'];
  if(consegna != null){
    $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
    $('#consegna_'+consegna).addClass('selected');
    return;
  }
  // default conegna price_including_vat_for
  $('.selected[data-date-selection="data_consegna"]').removeClass('selected');
}
$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["consegna"] = $('.selected[data-date-selection]').data('date-options');
    $('#quantity').val($('#quanti').val());
  });
  prodotto.fromMoreOptions.push(caricaConsegnaDaMoreOptions);
  prodotto.prezzo.push(function(){
    var prezzoCad = 0;
    if (prodotto.moreOptions['consegna'] != null){
      prezzoCad = $('#consegna_'+prodotto.moreOptions['consegna']).attr('prezzo');
    }
    var quantity = $('#quanti').val();
    return prezzoCad*quantity;
  });

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

function caricaDate(json){
  var dateServer = JSON.parse(json);
  for(var i=0; i<dateServer.length; i++){
    $('#consegna_'+i+'>.giorno').html(dateServer[i]['giorno']);
    $('#consegna_'+i+'>.numero').html(dateServer[i]['numero']);
    $('#consegna_'+i+'>.mese').html(dateServer[i]['mese']);
    var prezzo = parseFloat(dateServer[i]['prezzo']).toFixed(2);
    $('#consegna_'+i).parent().find('.prezzo_consegna>.prezzo').html(prezzo);
    $('#consegna_'+i).attr('prezzo',prezzo);
    if(dateServer[i]['attivo'] == 'true'){
      $('#consegna_'+i).removeClass('unactive');
    } else {
      $('#consegna_'+i).addClass('unactive');
    }
  }
}
