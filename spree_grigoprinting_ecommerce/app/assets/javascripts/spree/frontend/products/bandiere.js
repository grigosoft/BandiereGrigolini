function toMoreOptions(){
    var show_state = $('#show_state').val().split('.');
    prodotto.moreOptions["prodotto_personalizzato"] = "bandiera_personalizzata";
    prodotto.moreOptions["show_state"] = show_state.join('.');
    prodotto.moreOptions["tessuto"] = show_state[0];
    prodotto.moreOptions["orientamento"] = show_state[1];
    var finitura = {};
    finitura["tipo"] = show_state[2];
    // doppio ago a prescindere poi cambio se maniche (in verticale)
    finitura["sopra"] = {'finitura': 'doppio_ago'};
    finitura["sotto"] = {'finitura': 'doppio_ago'};
    if(show_state[1] == 'verticale'){
      if($('#Manica_superiore').val() == 'Solo sopra' || $('#Manica_superiore').val() == 'Sopra e sotto'){
        finitura["sopra"] = {'finitura': 'manica', 'dettagli': $('Aperta_o_Chiusa').val()};
      }
      if($('#Manica_superiore').val() == 'Sopra e sotto'){
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

    prodotto.moreOptions["finitura"] = finitura;
}
function fromMoreOptions(){
  if(prodotto.moreOptions["show_state"] != null){
    $('#show_state').val(prodotto.moreOptions["show_state"]);
  }
  var finitura = prodotto.moreOptions["finitura"];
  if (finitura == null){
    finitura = {};
  }
  if(finitura["sotto"] != null && finitura["sotto"]['finitura'] == 'manica'){
    $('#Manica_superiore').val('Sopra e sotto');
    $('#Aperta_o_Chiusa').val(finitura["sotto"]['finitura']['dettagli']);
  } else if(finitura["sopra"] != null && finitura["sopra"]['finitura'] == 'manica'){
    $('#Manica_superiore').val('Sopra');
    $('#Aperta_o_Chiusa').val(finitura["sopra"]['finitura']['dettagli']);
  } else {
    $('#Manica_superiore').val('No');
  }

}
$(document).ready(function(){
  prodotto.toMoreOptions.push(toMoreOptions);
  prodotto.fromMoreOptions.push(fromMoreOptions);
  prodotto.remote_prezzo = richiedi_prezzo;
  prodotto.fireFromMoreOptions();

  // bind gruppi di scelta
  bindSelezioniShow();

  // pagina appena caricata nascondo personalizzazioni
  $('[data-need-show]').addClass('hidden');
  $('#show_state_old').val("");
  showPartialFromState();
  setActiveFromState();

  // richiedi_prezzo();

  // contatori su cui legare il calcola prezzo
  // $(document).on("change", "#base", richiedi_prezzo);
  // $(document).on("change", "#altezza", richiedi_prezzo);
  // $(document).on("change", "#quanti", richiedi_prezzo);

  // completamento default base/Altezza
  $('[data-product-options="orizzontale"]').click(function(){
    $('#base').val(150);
    $('#altezza').val(100);
  });
  $('[data-product-options^="verticale"]').click(function(){
    $('#base').val(120);
    $('#altezza').val(400);
  });

  $(document).click(function (e) {
    if (!$(e.target).is('.button-options')) {
      $('.collapse').collapse('hide');
    }
  })
});

function bindSelezioniShow(){
  $('[data-product-selection]').click(function(){
    var questo = $(this);
    // aggiorno show_state
    var old_state = $('#show_state').val();
    $('#show_state_old').val(old_state);
    old_state = old_state.split('.');
    var new_state = "";
    if(questo.data("product-selection") == 'tessuto'){ // il cambio dei tessuti non resetta la cascata di show
      new_state = old_state;
      new_state[questo.data("product-show")-1] = questo.data("product-options");
      new_state = new_state.join('.');
    } else {
      for(var i=0; i<questo.data('product-show')-1; i++){
        new_state += old_state[i]+'.';
      }
      new_state += questo.data('product-options');
    }
    $('#show_state').val(new_state);

    showPartialFromState();
    setActiveFromState();

    prodotto.fireToMoreOptions();

    // controllaDati();
    // richiedi_prezzo();
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

// funzioni ajax
function richiedi_prezzo() {
  $('#quantity').val($('#quanti').val());
  $.ajax({
    type: "POST",
    url: "/price_flag",
    data: $("#form_prodotto").serialize() //this will enable you to use params[:periods] and params[:age] in your controller
  });
  prodotto.fireVisualizza();
}
