$(document).ready(function(){
  $( "#colori_scelti" ).sortable({
    revert: true,
    update: generaFilare
  });
  $( ".draggable" ).draggable({
    connectToSortable: "#colori_scelti",
    helper: "clone",
    revert: "invalid"
  });

});
function generaFilare(){
  var i;
  var listaColori = [];
  var imgScelte = $('#colori_scelti').find('div>a>img');
  for(i=0; i<imgScelte.length; i++){
    listaColori.push($(imgScelte[i]).attr('colore'));
  }
  var filare = '';
  var maxBandierine = 30;
  var iColore;
  for(i=0; i<maxBandierine; i++){
    iColore = i%listaColori.length;
    filare +=   '<img alt="Colore {colore}" src="{src}">'.replace('{colore}',listaColori[iColore]).replace('{src}',$('img[colore='+listaColori[iColore]+']').attr('src'));
  }
  $('#filare_generato').attr('style',"width: "+maxBandierine*50+'px')
  $('#filare_generato').html(filare);
}
//
// // drag and drop
// function allowDrop(ev) {
//     ev.preventDefault();
// }
//
// function drag(ev) {
//     ev.dataTransfer.setData("colore", $(ev.target).attr('colore'));
// }
//
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("colore");
//     $(ev.target).append($('a>img[colore='+data+']').clone());
// }
