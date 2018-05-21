function ba_fromMoreOptions(){
  if(prodotto.moreOptions["base"] != null){
    $('#base').val(prodotto.moreOptions["base"]);
  }
  if(prodotto.moreOptions["altezza"] != null){
    $('#altezza').val(prodotto.moreOptions["altezza"]);
  }
}
$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["base"] = $('#base').val();
    prodotto.moreOptions["altezza"] = $('#altezza').val();
  });
  prodotto.fromMoreOptions.push(ba_fromMoreOptions);
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
