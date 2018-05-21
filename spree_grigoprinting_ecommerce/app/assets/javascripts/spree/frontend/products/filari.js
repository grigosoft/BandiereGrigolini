function f_toMoreOptions(){
  prodotto.moreOptions['formato'] = $('.selected[data-product-selection="formato"]').attr('data-product-options');
  // estrappolo lista colori
  var listaColori = [];
  var imgScelte = $('#colori_scelti').find('div>a>img');
  for(var i=0; i<imgScelte.length; i++){
    listaColori.push($(imgScelte[i]).attr('colore'));
  }
  prodotto.moreOptions['sequenza_colori'] = listaColori.join('.');
  // quanti
  var soggetti=0;
  for(i=0; i<listaColori.length; i++){// solo se contiene una personalizzata attivo gli extra
    if(listaColori[i] == 'personalizzata'){
      soggetti ++;
    }
  }
  prodotto.moreOptions['soggetti'] = soggetti;
  $('#soggetti').val(soggetti);
  generaFilare();
}
function f_fromMoreOptions(){
  $('#colori_scelti').html('');
  if (prodotto.moreOptions['sequenza_colori'] != null){
    var colori_scelti = prodotto.moreOptions['sequenza_colori'].split('.');
    for(var i=0; i<colori_scelti.length; i++){
      $('#colori_scelti').append($('#scegli_colori>div[colore="'+colori_scelti[i]+'"]').clone());
    }
  }
}
function f_visualiza(){
  var select_misura = $('select#misura_bandierine');
  // select_misura.html('');
  var misure = [['1','2'],
                ['1','2','3','4']];
  var options = [];
  if(prodotto.moreOptions['formato'] == 'triangolare'){
    for(var i=0;i<misure[0].length; i++) {
      options.push('<option value="',
          misure[0][i], '">',
          misure[0][i], '</option>');
    }
  } else if(prodotto.moreOptions['formato'] == 'rettangolare'){
    for(var i=0;i<misure[1].length; i++) {
      options.push('<option value="',
          misure[1][i], '">',
          misure[1][i], '</option>');
    }
  } else {
    options.push('<option value="Scegli un formato">Scegli un formato</option>');
  }
  select_misura.html(options.join(''));
  generaFilare();
}

$(document).ready(function(){
  prodotto.toMoreOptions.push(f_toMoreOptions);
  prodotto.fromMoreOptions.push(f_fromMoreOptions);
  prodotto.visualizza.push(f_visualiza);
  prodotto.fireFromMoreOptions();
  $( "#colori_scelti" ).sortable({
    revert: true,
    update: function(){prodotto.fireToMoreOptions()}
  });
  $( ".draggable" ).draggable({
    connectToSortable: "#colori_scelti",
    helper: "clone",
    revert: "invalid"
  });

  // selezioni
  $('[data-product-selection="formato"]').click(function(){
    $('.selected[data-product-selection="formato"]').removeClass('selected');
    $(this).addClass('selected');
    prodotto.fireToMoreOptions();
  });
  // aggiungi soggetto personalizzato
  $('#aggiungi_bandierina_personalizzata').click(function(){

  });
  // crea bandierine
  var filePiatto = $('#bandierina_piatta').attr('href');
  var colori = [['Rosso','#ff0000'],'Blu','giallo','verde','cyan','arancio','nero','bianco'];
  for(var i=0; i<colori.length; i++) {
    creaSvgPiatto(filePiatto, colori[i][1], colori[i][0]);
  }
});

function creaSvgPiatto(file, colore, nome){
  var head = '<div class="draggable col-xs-3 col-md-2 button-options" role="button">';
  var foot = '<p>'+nome+'</p></div>';
  var svg = $('#bandierina_piatta').svg();
  alert(svg);
  
}
function generaFilare(){
  var i;
  if(prodotto.moreOptions['sequenza_colori'] == null || prodotto.moreOptions['sequenza_colori'].length == 0) {
    return;
  }
  var listaColori = prodotto.moreOptions['sequenza_colori'].split('.');
  var filare = '';
  var maxBandierine = 30;
  var iColore;
  for(i=0; i<maxBandierine; i++){
    iColore = i%listaColori.length;
    filare +=   '<img alt="Colore {colore}" src="{src}">'.replace('{colore}',listaColori[iColore]).replace('{src}',$('img[colore='+listaColori[iColore]+']').attr('src'));
  }
  $('#filare_generato').attr('style',"width: "+maxBandierine*50+'px')
  $('#filare_generato').html(filare);

  // clear stili clonati
  $('#colori_scelti>div').attr('style','')
}
