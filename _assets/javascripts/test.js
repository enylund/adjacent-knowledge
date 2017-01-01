App.pageLoad.push(function() {
    $('.circle').mouseenter(function(){
      console.log("hi");
      $('.homepage--overlay').addClass('active');
    });
    $('.circle').mouseleave(function(){
      console.log("hi");
      $('.homepage--overlay').removeClass('active');
    });

});