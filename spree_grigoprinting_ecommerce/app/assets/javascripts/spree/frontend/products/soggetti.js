$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["soggetti"] = $('#soggetti').val();
  });
  prodotto.fromMoreOptions.push(function(){
    if(prodotto.moreOptions["soggetti"]){
      $('#soggetti').val(prodotto.moreOptions["soggetti"]);
    }
  });
  $('#soggetti').change(function(){
    prodotto.fireToMoreOptions();
    controllo();
  });
});

// controllo validita campo
function controllo(){

}
