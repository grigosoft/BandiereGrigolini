$(document).ready(function(){
  prodotto.toMoreOptions.push(function(){
    prodotto.moreOptions["nome"] = $('#name').val();
  });
  $('#name').change(function(){
    prodotto.fireToMoreOptions();
    controllo();
  }); /// funziona solo alla perdita di focus
});

// controllo validita campo
function controllo(){

}
