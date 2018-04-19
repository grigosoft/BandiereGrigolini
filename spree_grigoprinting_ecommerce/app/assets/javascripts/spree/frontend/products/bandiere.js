function bindSelezioni(){
  $('[data-product-selection]').click(function(){
    var active = $(this);
    // aggiorno show_state
    var old_state = $('#show_state').val();
    $('#show_state_old').val(old_state);
    old_state = old_state.split('.');
    var new_state = "";
    for(var i=0;i<active.data('product-state')-1; i++){
      new_state += old_state[i]+'.';
    }
    new_state += active.data('product-options');
    $('#show_state').val(new_state);
    showPartialFromState();
    setActiveFromState();
    controllaDati();
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
    $("div[data-need-show~='{}']".replace('{}',visibiliOld[i])).addClass('hidden');
    if(i>0)
      $("div[data-need-show~='{}']".replace('{}',visibiliOld[i-1]+'.'+visibiliOld[i])).addClass('hidden');
  }
  // mostro nuovi
  for(var i=comPoint; i<visibili.length; i++){
    $("div[data-need-show~='{}']".replace('{}',visibili[i])).removeClass('hidden');
    if(i>0)
      $("div[data-need-show~='{}']".replace('{}',visibili[i-1]+'.'+visibili[i])).removeClass('hidden');
  }
}
function setActiveFromState(){
  // tolgo tutti gli active
  $(".selected").removeClass("selected");
  // metto quelli presenti
  var visibili = $('#show_state').val().split('.');
  for(var i in visibili){
    $("[data-product-options='{}']".replace('{}', visibili[i])).addClass('selected');
  }
}
// funzione che riconosce se sono stati fatte tutte le scelte relative alla finitura
function isFinitureSelezionate(){
  // trovo componente show_state e prendo attributo completed
}
function setInMoreOptions(active){
  
}
// funzioni di salvataggio dati nel campo more options
// var optionIniector;
// optionIniector['nome'] = function(nome){
//   var moreOptionsTag = $('more_options');
//   var moreOptionsValue = {};
//   try {
//     moreOptionsValue = JSON.parse(moreOptionsTag.val());
//   } catch(err){console.error(err.message);}
//   moreOptionsValue['nome'] = nome;
//   moreOptionsTag.val(JSON.stringify(moreOptionsValue));
// }



function controllaDati(){

}
// function setInMoreOptions(active){
//   var moreOptionsTag = $('more_options');
//   var moreOptionsValue = {};
//   try {
//     moreOptionsValue = JSON.parse(moreOptionsTag.val());
//   } catch(err){log.console.error(err.message);}
//   var temp = active.data('product-options').split('->');
//   var percorso = temp[0].split('/');
//   var replaceData = JSON.parse(temp[1]);
//   var navigatore = moreOptionsValue;
//   for(var i=0;i<percorso.length()-1; i++){
//
//   }
//   for(step in percorso){
//     if(navigatore[step] == null){
//
//     }
//     navigatore = navigatore[step];
//   }
// }

$(document).ready(function(){
  // bind gruppi di scelta
  bindSelezioni();
  // // bind scelta tessuto
  // bindWithActive('.scelta_tessuto');
  // // bind scelta orizzontali/verticali
  // bindWithActive('.scelta_orientamento');
  // // bind scelta finitura lato asta
  // bindWithActive('.scelta_finitura_lato_asta');
  // // bind scelta tipo manica
  // bindWithActive('.scelta_tipo_manica');
  // // bind scelta acessori fettuccia
  // bindWithActive('.scelta_acessori_fettuccia');

  // pagina appena caricata nascondo personalizzazioni
  $('[data-need-show]').addClass('hidden');
  $('#show_state_old').val("");
  showPartialFromState();
  setActiveFromState()
});
