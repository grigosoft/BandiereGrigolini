function resetMenu(){
  $(".open").removeClass("open");
  $("html.noscroll, body.noscroll").removeClass("noscroll");
  $('#icon-products, #icon-account').removeClass("glyphicon-remove");
  $('#icon-products').addClass("glyphicon-menu-hamburger");
  $('#icon-account').addClass("glyphicon-user");
}
(function($) {

    $(document).ready(function() {
        $(document).on("click", function (e) {
          if ($(e.target).is('.account') === false) {
            resetMenu()
          }
        });
        $('.st-effect-1').click(function(e) {
          // se gia aperto il menu lascio lavorare i toogle
            if (!$('.menu-container').hasClass('open')){
              resetMenu();
            }
            $('.menu-container').toggleClass('open');
            $(this).children().first().toggleClass('open');
            $('html, body').toggleClass('noscroll');
            $('#icon-products').toggleClass("glyphicon-menu-hamburger glyphicon-remove");
            e.stopPropagation();
        });
        $('.account').click(function(e) {
          // se gia aperto il menu lascio lavorare i toogle
            if (!$('.account_menu').hasClass('open')){
              resetMenu();
            }
            $('.account_menu').toggleClass('open');
            $('html, body').toggleClass('noscroll');
            $('#icon-account').toggleClass("glyphicon-user glyphicon-remove");
            e.stopPropagation();
        });

    });
})(jQuery);
