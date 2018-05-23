function bf_toMoreOptions(){
  prodotto.moreOptions['modello'] = $('.selected[data-product-radio="modello"]').data('product-options');
  var misura = $('.selected[data-product-radio="misura"]').data('product-options');
  if(misura != null){
    prodotto.moreOptions['misura'] = misura.split('.')[0];
    if($('[data-product-check="struttura"]').hasClass('selected')) {
      prodotto.moreOptions['struttura'] = misura.split('.')[1];
    }
  }

  var basi = $('.selected[data-product-check="base"]');
  var basi_str = [];
  for(var i=0; i<basi.length; i++){
    basi_str[i] = $(basi[i]).data('product-options');
  }
  prodotto.moreOptions['base'] = basi_str.join('.');
}
function bf_fromMoreOptions(){
  $('.selected[data-product-radio]').removeClass('selected');
  $('.selected[data-product-check]').removeClass('selected');
  if(prodotto.moreOptions['modello'] != null){
    $('a[data-product-options="'+prodotto.moreOptions['modello']+'"]').addClass('selected');
  }
  if(prodotto.moreOptions['misura'] != null){
    $('a[data-product-options^="'+prodotto.moreOptions['misura']+'"]').addClass('selected');
  }
  if(prodotto.moreOptions['struttura'] != null){
    $('a[data-product-check="struttura"]').addClass('selected');
  }
  if(prodotto.moreOptions['base'] != null){
    var basi = prodotto.moreOptions['base'].split('.');
    for(var i=0; i<basi.length; i++){
      $('a[data-product-options="'+basi[i]+'"]').addClass('selected');
    }
  }
}

$(document).ready(function(){
  prodotto.toMoreOptions.push(bf_toMoreOptions);
  prodotto.fromMoreOptions.push(bf_fromMoreOptions);
  prodotto.remote_prezzo = richiedi_prezzo;

  prodotto.fireFromMoreOptions();

  $('a[data-product-check]').click(function(){$(this).toggleClass('selected');prodotto.fireToMoreOptions();});
  $('a[data-product-radio]').click(function(){
    var gruppo = $(this).data('product-radio');
    $('a[data-product-radio="'+gruppo+'"]').removeClass('selected');
    $(this).addClass('selected');
    prodotto.fireToMoreOptions();
  });
});


// funzioni ajax
function richiedi_prezzo() {
  $('#quantity').val($('#quanti').val());
  $.ajax({
    type: "POST",
    url: "/price_beachflag",
    data: $("#form_prodotto").serialize() //this will enable you to use params[:periods] and params[:age] in your controller
  });
  prodotto.fireVisualizza();
}
