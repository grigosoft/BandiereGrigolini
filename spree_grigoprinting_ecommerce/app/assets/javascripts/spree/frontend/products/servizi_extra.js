function selezionaExtra(){
  var $this = $(this);
  if($this.is("input#vettorializzazione_accepted") && $("input#vettorializzazione_accepted").prop( "checked" )) {
    $("input#vettorializzazione_accepted").prop( "checked", true );
    $("input#impaginazione_accepted").prop( "checked", true );
    $("input#controllo_file_accepted").prop( "checked", true );
  } else if($this.is("input#impaginazione_accepted") && $("input#impaginazione_accepted").prop( "checked" )) {
    $("input#vettorializzazione_accepted").prop( "checked", false );
    $("input#impaginazione_accepted").prop( "checked", true );
    $("input#controllo_file_accepted").prop( "checked", true );
  } else if($this.is("input#controllo_file_accepted") && $("input#controllo_file_accepted").prop( "checked" )) {
    $("input#vettorializzazione_accepted").prop( "checked", false );
    $("input#impaginazione_accepted").prop( "checked", false );
    $("input#controllo_file_accepted").prop( "checked", true );
  } else {
    $("input#vettorializzazione_accepted").prop( "checked", false );
    $("input#impaginazione_accepted").prop( "checked", false );
    $("input#controllo_file_accepted").prop( "checked", false );
  }
  setInMoreOptions();
}
$(document).ready(function(){
  $(document).on("click", "input#controllo_file_accepted", selezionaExtra);
  $(document).on("click", "input#impaginazione_accepted", selezionaExtra);
  $(document).on("click", "input#vettorializzazione_accepted", selezionaExtra);
});
