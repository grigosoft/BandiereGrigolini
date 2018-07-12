function resetMenu(){
  $(".open").removeClass("open");
  $("html.noscroll, body.noscroll").removeClass("noscroll");
  $('#icon-products, #icon-account').removeClass("grigo-close");
  $('#icon-products').addClass("grigo-hamburger");
  $('#icon-account').addClass("glyphicon-user");
}
(function($) {

    $(document).ready(function() {
        $(document).on("click", function (e) {
          var elem = e.target;
          // filtro i click derivanti dall'accaunt menu
          while (elem != null){
            if($(elem).is('div.account_menu') || $(elem).is('div.menu-container')){
              return;
            }
            elem = elem.parentElement;
          }
          if ($(e.target).is('.account') === false) {
            resetMenu();
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
            $('#icon-products').toggleClass("grigo-hamburger grigo-close");
            $('.shadow-hover').toggleClass('open')
            e.stopPropagation();
        });
        $('.account').click(function(e) {
          // se gia aperto il menu lascio lavorare i toogle
            if (!$('.account_menu').hasClass('open')){
              resetMenu();
            }
            $('.account_menu').toggleClass('open');
            $('html, body').toggleClass('noscroll');
            $('#icon-account').toggleClass("glyphicon-user grigo-close");
            e.stopPropagation();
        });

    });
})(jQuery);
