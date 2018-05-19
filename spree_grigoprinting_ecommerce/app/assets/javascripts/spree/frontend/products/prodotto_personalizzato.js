// oggetto prodotto personalizzato
var Prodotto = function(){
  this.moreOptions = {};
  // liste di funzioni aggiunte dai vari componenti aggiuntivi
  this.toMoreOptions = [];
  this.fromMoreOptions = [];
  this.visualizza = [];
  this.prezzo = [];
  // metodi
  this.fireToMoreOptions = function(){
    this.moreOptions = {};
    for(var i=0; i<this.toMoreOptions.length; i++){
      this.toMoreOptions[i]();
    }
    $('#more_options').val(JSON.stringify(this.moreOptions));
    this.fireVisualizza();
  }
  this.fireFromMoreOptions = function(){
    this.moreOptions = JSON.parse($('#more_options').val());
    for(var i=0; i<this.fromMoreOptions.length; i++){
      this.fromMoreOptions[i]();
    }
    this.fireVisualizza();
  }
  this.fireVisualizza = function(){
    for(var i=0; i<this.visualizza.length; i++){
      this.visualizza[i]();
    }
  }
  this.getPrezzo = function(){
    var prezzo = 0;
    for(var i=0; i<this.prezzo.length; i++){
      prezzo += this.prezzo[i]();
      alert(i+' '+prezzo);
    }
    return prezzo.toFixed(2);
  }
}
var prodotto = new Prodotto();
