$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["lato_asta"] = $('#Lato_asta').val();
  });
  prodotto.fromMoreOptions.push(function(){
    if(prodotto.moreOptions["lato_asta"]){
      $('#Lato_asta').val(prodotto.moreOptions["lato_asta"]);
    }
  });
});
