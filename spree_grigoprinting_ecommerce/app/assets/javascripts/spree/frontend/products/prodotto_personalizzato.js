// oggetto prodotto personalizzato
var Prodotto = function(){
  this.moreOptions = {};
  // liste di funzioni aggiunte dai vari componenti aggiuntivi
  this.toMoreOptions = [];
  this.fromMoreOptions = [];
  this.visualizza = [];
  this.prezzo = [];
  this.remote_prezzo = null;
  // metodi
  this.fireVisualizza = function(){
    if(this.visualizza == null){
      this.visualizza = [];
    }
    for(var i=0; i<this.visualizza.length; i++){
      this.visualizza[i]();
    }
  }
  this.fireToMoreOptions = function(){
    this.moreOptions = {};
    if(this.toMoreOptions == null){
      this.toMoreOptions = [];
    }
    for(var i=0; i<this.toMoreOptions.length; i++){
      this.toMoreOptions[i]();
    }
    $('#more_options').val(JSON.stringify(this.moreOptions));
    if(this.remote_prezzo != null){
      this.remote_prezzo();
    }
    this.fireVisualizza();
  }
  this.fireFromMoreOptions = function(){
    try {
      this.moreOptions = JSON.parse($('#more_options').val());
    } catch (err) {
      this.moreOptions = {};
      $('#more_options').val('{}');
    }
    if(this.fromMoreOptions == null){
      this.fromMoreOptions = [];
    }
    for(var i=0; i<this.fromMoreOptions.length; i++){
      this.fromMoreOptions[i]();
    }
    if(this.remote_prezzo != null){
      this.remote_prezzo();
    }
    this.fireVisualizza();
  }
  this.getPrezzo = function(){
    var prezzo = 0;
    for(var i=0; i<this.prezzo.length; i++){
      prezzo += this.prezzo[i]();
    }
    return prezzo.toFixed(2);
  }
}
var prodotto = new Prodotto();
