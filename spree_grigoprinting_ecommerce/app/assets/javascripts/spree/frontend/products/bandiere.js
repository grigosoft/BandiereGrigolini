function bindSelezioniShow(){
  $('[data-product-selection]').click(function(){
    var active = $(this);
    // aggiorno show_state
    var old_state = $('#show_state').val();
    $('#show_state_old').val(old_state);
    old_state = old_state.split('.');
    var new_state = "";
    if(active.data("product-selection") == 'tessuto'){ // il cambio dei tessuti non resetta la cascata di show
      new_state = old_state;
      new_state[active.data("product-show")-1] = active.data("product-options");
      new_state = new_state.join('.');
    } else {
      for(var i=0; i<active.data('product-show')-1; i++){
        new_state += old_state[i]+'.';
      }
      new_state += active.data('product-options');
    }
    $('#show_state').val(new_state);
    showPartialFromState();
    setActiveFromState();
    // controllaDati();
    calcola_prezzo();
  });
}
function showPartialFromState(){
  var visibili = $('#show_state').val().split('.');
  var visibiliOld = $('#show_state_old').val().split('.');
  // trovo il punto in comune
  var comPoint = 0;
  while((comPoint<visibili.length || comPoint<visibiliOld.length) && visibili[comPoint]==visibiliOld[comPoint]){
    comPoint++;
  }
  // nascondo fino al punto in comune
  for(var i=visibiliOld.length-1; i>=comPoint; i--){
    $("[data-need-show~='{}']".replace('{}',visibiliOld[i])).addClass('hidden');
    if(i>0) // testo anche le coppie di stati
      $("div[data-need-show~='{}']".replace('{}',visibiliOld[i-1]+'.'+visibiliOld[i])).addClass('hidden');
  }
  // mostro nuovi
  for(var i=comPoint; i<visibili.length; i++){
    $("[data-need-show~='{}']".replace('{}',visibili[i])).removeClass('hidden');
    if(i>0) // testo anche le coppie di stati
      $("div[data-need-show~='{}']".replace('{}',visibili[i-1]+'.'+visibili[i])).removeClass('hidden');
  }
}
function setActiveFromState(){
  // tolgo tutti gli active
  $(".selected").removeClass("selected");
  // metto quelli presenti
  var visibili = $('#show_state').val().split('.');
  for(var i in visibili){
    $("[data-product-options^='{}']".replace('{}', visibili[i])).addClass('selected');
  }
}
// funzione che riconosce se sono stati fatte tutte le scelte relative alla finitura
function isFinitureSelezionate(){
  // trovo componente show_state e prendo attributo completed
  return 4 ==  $('#show_state').val().split('.').length;
}
function setInMoreOptions(){
  var moreOptionsTag = $('#more_options');
  var moreOptionsValue = {};
  if(!isFinitureSelezionate()){
    moreOptionsTag.val('{"prodotto_personalizzato":"bandiera_personalizzata"}');
    return;
  }
  // try {
    var show_state = $('#show_state').val().split('.');
    moreOptionsValue["prodotto_personalizzato"] = 'bandiera_personalizzata';
    moreOptionsValue["tessuto"] = show_state[0];
    moreOptionsValue["orientamento"] = show_state[1];
    moreOptionsValue["nome"] = $('#name').val();
    moreOptionsValue["base"] = $('#base').val();
    moreOptionsValue["altezza"] = $('#altezza').val();
    moreOptionsValue["lato_asta"] = $('#Lato_asta').val();
    var finitura = {};
    finitura["tipo"] = show_state[2];
    // doppio ago a prescindere poi cambio se maniche (in verticale)
    finitura["sopra"] = {'finitura': 'doppio_ago'};
    finitura["sotto"] = {'finitura': 'doppio_ago'};
    if(show_state[1] == 'verticale'){
      if($('#Manica_superiore').val() == 'Solo sopra' || $('#Manica_superiore').val() == 'Sora e sotto'){
        finitura["sopra"] = {'finitura': 'manica', 'dettagli': $('Aperta_o_Chiusa').val()};
      }
      if($('#Manica_superiore').val() == 'Solo sotto' || $('#Manica_superiore').val() == 'Sora e sotto'){
        finitura["sotto"] = {'finitura': 'manica', 'dettagli': $('#Aperta_o_Chiusa').val()};
      }
    }
    if(show_state[2] == 'fettuccia'){
      finitura["sinistra"] = {'finitura':show_state[2], 'accessori': $('.selected[data-product-selection="fettuccia"]').data("product-options"), 'dettagli': ''};
    } else if(show_state[2] == 'manica'){
      finitura["sinistra"] = {'finitura':show_state[2], 'accessori': '', 'dettagli': $('.selected [data-product-selection="manica"]').data("product-options")};
    }
    finitura["destra"] = {'finitura': 'doppio_ago'};
    finitura["angolo_opposto"] = '';

    moreOptionsValue["finitura"] = finitura;

    moreOptionsValue["consegna"] = $('.selected[data-product-selection="data_consegna"]').data('product-options');

    moreOptionsValue["extra"] = {};
    if($("input#vettorializzazione_accepted").prop( "checked" )) {
      moreOptionsValue["extra"]['grafica'] = $("input#vettorializzazione_accepted").attr('variant_id');
    } else if($("input#impaginazione_accepted").prop( "checked" )) {
      moreOptionsValue["extra"]['grafica'] = $("input#impaginazione_accepted").attr('variant_id');
    } else if($("input#controllo_file_accepted").prop( "checked" )) {
      moreOptionsValue["extra"]['grafica'] = $("input#controllo_file_accepted").attr('variant_id');
    }
  // } catch(err){moreOptionsValue = {"err":err.message};}
  moreOptionsTag.val(JSON.stringify(moreOptionsValue));
  setTotalPrice();
}
function setTotalPrice(){
  var moreOptions = JSON.parse($('#more_options').val());
  var prezzoCad = 0;
  if (moreOptions['consegna'] != null){
    prezzoCad = $('#prezzo_'+moreOptions['consegna']+'>.prezzo').attr('content');
  }
  var quantity = $('#quantity').val();
  var tot = prezzoCad*quantity;

  if($("input#controllo_file_accepted").prop( "checked" )) {
    tot += 4;
  }
  if($("input#impaginazione_accepted").prop( "checked" )) {
    tot += 6;
  }
  if($("input#vettorializzazione_accepted").prop( "checked" )) {
    tot += 10;
  }

  tot = tot.toFixed(2);
  $('#prezzo').html('€ '+tot);
  $('#lbl_quantita').html(quantity+' pz');
  aggiornaNomeLavorazione();
  $('#lbl_giorno_di_consegna').html($('.selected.data_consegna').html());
}
function aggiornaNomeLavorazione(){
  $('#lbl_nome_lavoro').html($('#name').val());
}

$(document).ready(function(){
  // bind gruppi di scelta
  bindSelezioniShow();

  // pagina appena caricata nascondo personalizzazioni
  $('[data-need-show]').addClass('hidden');
  $('#show_state_old').val("");
  showPartialFromState();
  setActiveFromState();

  calcola_prezzo();

  // contatori su cui legare il calcola prezzo
  $(document).on("change", "#base", calcola_prezzo);
  $(document).on("change", "#altezza", calcola_prezzo);
  $(document).on("change", "#quanti", calcola_prezzo);
  // $(document).on("change", "input#controllo_file_accepted", setInMoreOptions);
  // $(document).on("change", "input#impaginazione_accepted", setInMoreOptions);
  // $(document).on("change", "input#vettorializzazione_accepted", setInMoreOptions);

  // completamento default base/Altezza
  $('[data-product-options="orizzontale"]').click(function(){
    $('#base').val(150);
    $('#altezza').val(100);
  });
  $('[data-product-options^="verticale"]').click(function(){
    $('#base').val(120);
    $('#altezza').val(400);
  });

  $('#name').change(aggiornaNomeLavorazione); /// funziona solo alla perdita di focus

  $(document).click(function (e) {
    if (!$(e.target).is('.button-options')) {
      $('.collapse').collapse('hide');
    }
  })
});
// funzioni ajax
function calcola_prezzo() {
  // if(isFinitureSelezionate()) {
    setInMoreOptions();
    $('#quantity').val($('#quanti').val());
    $.ajax({
      type: "POST", url: "/price_flag", data: $("#form_prodotto").serialize() //this will enable you to use params[:periods] and params[:age] in your controller
    });
    setTotalPrice();
  // }
}
