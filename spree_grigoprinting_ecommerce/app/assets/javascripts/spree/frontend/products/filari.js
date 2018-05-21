function f_toMoreOptions(){
  prodotto.moreOptions['formato'] = $('.selected[data-product-selection="formato"]').attr('data-product-options');
  // estrappolo lista colori
  var listaColori = [];
  var imgScelte = $('#colori_scelti>div');
  for(var i=0; i<imgScelte.length; i++){
    listaColori.push($(imgScelte[i]).attr('colore'));
  }
  prodotto.moreOptions['sequenza_colori'] = listaColori.join('.');
  // quanti
  var soggetti=0;
  for(i=0; i<listaColori.length; i++){// solo se contiene una personalizzata attivo gli extra
    if(listaColori[i].startsWith('personalizzato')){
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
  var misure = [['20x30','25x35'],
                ['15x15','15x21','20x30','25x35']];
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

  // selezioni
  $('[data-product-selection="formato"]').click(function(){
    $('.selected[data-product-selection="formato"]').removeClass('selected');
    $(this).addClass('selected');
    prodotto.fireToMoreOptions();
  });
  // aggiungi soggetto personalizzato
  $('#aggiungi_bandierina_personalizzata').click(function(){
    $("#scegli_colori").insertAt($("#scegli_colori").children().length-1, creaSvgPersonalizzato());
    rendiDraggable("#scegli_colori>.draggable");
  });
  // crea bandierine
  var filePiatto = $('#bandierina_piatta').attr('href');
  // var colori = [['Rosso','#ff0000'],'Blu','Giallo','Verde','Cyan','Arancio','Nero','Bianco'];
  var colori = [['Rosso','#ff0000'],['Blu','#0000ff'],['Giallo','#ffff00'],['Verde','#00cc66'],['Cyan','#00ffff'],['Arancio','#ff9933'],['Nero','#000000'],['Bianco','#ffffff']];
  for(var i=0; i<colori.length; i++) {
    $("#scegli_colori").insertAt(i, creaSvgPiatto(colori[i][1], colori[i][0]));
  }
  $( "#colori_scelti" ).sortable({
    revert: true,
    update: function(){prodotto.fireToMoreOptions()}
  });
  rendiDraggable("#scegli_colori>.draggable");
});
function rendiDraggable(sel){
  $( sel ).draggable({
    connectToSortable: "#colori_scelti",
    helper: "clone",
    revert: "invalid"
  });
}
function creaSvgPiatto(colore, nome){
  var head = '<div class="draggable col-xs-3 col-md-2" colore="'+nome.toLowerCase()+'"><a class="button-options" role="button"><div>';
  var foot = '</div><p>'+nome+'</p></a></div>';
  var svg = $('#bandierina_piatta').html();
  svg = svg.replace(/st0{fill:#[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]/gi, "st0{fill:"+colore);
  svg = svg.replace(/st0/g,'st_'+nome);
  return head+svg+foot;
}
function creaSvgPersonalizzato(){
  var nPersonalizzate = $('#scegli_colori>[colore^="personalizzato"]').length;
  var head = '<div class="draggable col-xs-3 col-md-2" colore="personalizzato_'+nPersonalizzate+'"><a class="button-options" role="button"><div>';
  var foot = '</div><p>P: '+nPersonalizzate+'</p></a></div>';
  var svg = $('#bandierina_personalizzata').html();
  svg = svg.replace(/class="st2 st3">1/gi, 'class="st2 st3">'+nPersonalizzate);
  // svg = svg.replace(/st/g,'st_p_');
  return head+svg+foot;
}
function generaFilare(){
  var i;
  var listaColori = prodotto.moreOptions['sequenza_colori'];
  if(listaColori != null && listaColori.length > 0) {
    listaColori = listaColori.split('.');
    var filare = '';
    var maxBandierine = 30;
    var iColore;
    for(i=0; i<maxBandierine && listaColori.length>0; i++){
      iColore = i%listaColori.length;
      filare += '<div>'+$('#scegli_colori>div[colore="'+listaColori[iColore]+'"]>a>div').html()+'</div>';
    }
    $('#filare_generato').attr('style',"width: "+maxBandierine*50+'px')
    $('#filare_generato').html(filare);

    // clear stili clonati
    $('#colori_scelti>div').attr('style','')
  }
}
