$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["base"] = $('#base').val();
    prodotto.moreOptions["altezza"] = $('#altezza').val();
  });
  $('#base').focusout(function(){
    prodotto.fireToMoreOptions();
    controllo();
    richiedi_prezzo();
  });
  $('#altezza').focusout(function(){
    prodotto.fireToMoreOptions();
    controllo();
    richiedi_prezzo();
  });
});

// controllo validita campo
function controllo(){

}
