$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["soggetti"] = $('#soggetti').val();
  });
  $('#soggetti').change(function(){
    prodotto.fireToMoreOptions();
    controllo();
  });
});

// controllo validita campo
function controllo(){

}
