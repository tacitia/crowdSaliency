$("#btnGetStarted").click(function() {
     $('html, body').animate({
         scrollTop: $("#sectionGetStarted").offset().top
     }, 500);
 });

$("#btnTour").click(function(){
  $("#divHome").hide();
  $("#divTour").show();
}); 