function bindWithActive(classIdentifierGroup){
  $(classIdentifierGroup).click(selezionaTessuto);
  function selezionaTessuto(){
    var active = $(this);
    $(classIdentifierGroup).removeClass('active');
    active.addClass('active');
  }
}
function showPartialFromData(){
  // orientamento
  if($('#orientamento').val() == 'orizzontale'){
    $('.att_verticale').addClass('hidden');
    $('.att_orizzontale').removeClass('hidden');
  } else if($('#orientamento').val() == 'verticale'){
    $('.att_orizzontale').addClass('hidden');
    $('.att_verticale').removeClass('hidden');
  } else {
    $('.att_orizzontale').addClass('hidden');
    $('.att_verticale').addClass('hidden');
  }
  // finitura fettuccia/manica
  if($('#finitura').val() == 'manica'){
    $('.att_fettuccia').addClass('hidden');
    $('.att_manica').removeClass('hidden');
  } else if($('#finitura').val() == 'fettuccia'){
    $('.att_manica').addClass('hidden');
    $('.att_fettuccia').removeClass('hidden');
  } else {
    $('.att_manica').addClass('hidden');
    $('.att_fettuccia').addClass('hidden');
  }
}
function showPartialFromState(stato){
  var visibili = stato.split('.');
  // nascondo tutti
  $('.hide_all').addClass('hidden');
  // mostro
  for(att in visibili){
    $('show_'+att).removeClass('hidden');
  }
}

function setInMoreOptions(comando){
  var moreOptionsTag = $('more_options');
  var moreOptionsValue = JSON.parse(moreOptionsTag.val());
  var attributi = comando.split('.');
  var navigatore = moreOptionsValue;
  for(att in attributi){
    next = navigatore[att];
    if(next == null){

    }
  }
}

$(document).ready(function(){
  // bind gruppi di scelta

  // bind scelta tessuto
  bindWithActive('.scelta_tessuto');
  // bind scelta orizzontali/verticali
  bindWithActive('.scelta_orientamento');
  // bind scelta finitura lato asta
  bindWithActive('.scelta_finitura_lato_asta');
  // bind scelta tipo manica
  bindWithActive('.scelta_tipo_manica');
  // bind scelta acessori fettuccia
  bindWithActive('.scelta_acessori_fettuccia');

  // pagina appena caricata nascondo personalizzazioni
  showPartialFromData();

// da cambiare e far prendere il valore dai dati html
// unificare in una funzione
  // orizzontale/verticale
  $('#btn_orizzontale').click(function(){
    $('input#orientamento').val("orizzontale");
    showPartialFromData();
  });
  $('#btn_verticale').click(function(){
    $('input#orientamento').val("verticale");
      $('input#finitura').val("fettuccia");
    showPartialFromData();
  });
  // manica/fettuccia/(personalizzata)
  $('#btn_manica').click(function(){
    $('input#finitura').val("manica");
    showPartialFromData();
  });
  $('#btn_fettuccia').click(function(){
    $('input#finitura').val("fettuccia");
    showPartialFromData();
  });


// cambiare active in base all'hidden data
});
