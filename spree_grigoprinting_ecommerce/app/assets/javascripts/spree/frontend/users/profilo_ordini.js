$(document).ready(function(){
  $(".order-specific-details").hide();
  // $(".order-details").hide();

  $("a.open-order-intern").click(function(){
    var number = $(this).attr("item");
    $("div.order-specific-details[item='"+number+"']").toggle();
  });
  $("a.order-tab").click(function(){
    var number = $(this).attr("order");
    $("div.order-details[order='"+number+"']").toggle();
  });
});
