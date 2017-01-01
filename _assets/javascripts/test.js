App.pageLoad.push(function() {
  // $('.post__content a').mouseenter(function(){
  //   $('body').css('background', 'red');
  // });
  // $('.post__content a').mouseleave(function(){
  //   $('body').css('background', 'white');
  // });
  $('.circle').mouseenter(function(){
    console.log("hi");
    $('.homepage--overlay').addClass('active');
  });
  $('.circle').mouseleave(function(){
    console.log("hi");
    $('.homepage--overlay').removeClass('active');
  });
});