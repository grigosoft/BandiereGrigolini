$(document).ready(function(){
  $('img[draggable="true"]').draggable();
});

// drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("colore", $(ev.target).attr('colore'));
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("colore");
    $(ev.target).append($('a>img[colore='+data+']').clone());
}
