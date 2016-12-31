//////////////////////////////////////////////////////////////
// App Application namespace and API
//////////////////////////////////////////////////////////////

App = {
  pageInit: [],
  pageLoad: [],
  afterPageLoad: [],
  pageResize: [],
  pageScroll: [],
  pageBreakpoint: [],
  pageFetch: [],
  pageChange: [],
  flickityDefaultOptions: {
    wrapAround: true,
    accessibility: false,
    imagesLoaded: true,
    selectedAttraction: 0.01,
    friction: 0.15,
    contain: false,
    percentPosition: true,
    autoHeight: true,
    prevNextButtons: false
  },
  isMobile: function() {
    return $(window).width() < 768;
  },
  isTablet: function() {
    return $(window).width() >= 768 && $(window).width() < 992;
  },
  initMap: function() {
    $(document).ready(function() {
      $(document).trigger('App.mapInitialized');
    });
  },
  initInfiniteLoadEvents: function() {
    App.loadingPostsInProgress = false;
    App.$infiniteLoader       = $('[data-infinite-scroll]');
    App.$infiniteLoadDisabler = $('[data-disable-infinite-scroll]');
  },
  runFunctions: function(array){
    for(var i = 0; i < array.length; i++) {
      array[i]();
    }
  },
  toSlug: function(text){
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  },
  getRandomFloat: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  isSpanish: function() {
    var spanish;
    $(document).ready(function() {
      var locale = $('.front-end').data('locale');
      if(locale == "es"){
        spanish = true;
      } else {
        spanish = false;
      }
    });
    return spanish;
  }
};

//////////////////////////////////////////////////////////////
// On Page load
//////////////////////////////////////////////////////////////

$(document).on('page:load ready page:restore', function() {
  App.runFunctions(App.pageInit);
  App.runFunctions(App.pageResize);
  App.runFunctions(App.pageScroll);
  App.runFunctions(App.pageBreakpoint);
  App.runFunctions(App.pageLoad);
  App.runFunctions(App.afterPageLoad);
});

//////////////////////////////////////////////////////////////
// On Page Fetch
//////////////////////////////////////////////////////////////

$(document).on('page:fetch', function() {
    App.runFunctions(App.pageFetch);
});


//////////////////////////////////////////////////////////////
// On Page Change
//////////////////////////////////////////////////////////////

$(document).on('page:change', function() {
    App.runFunctions(App.pageChange);
});


//////////////////////////////////////////////////////////////
// On scroll
//////////////////////////////////////////////////////////////

$(function() {
  $(window).on('scroll', function() {
    App.runFunctions(App.pageScroll);
  });
});

App.pageScroll.push(function() {
  // Calculate expensive scroll events once
  App.scrollTop = $(window).scrollTop();
});

//////////////////////////////////////////////////////////////
// On Resize
//////////////////////////////////////////////////////////////

$(function() {
  $(window).on('resize', function() {
    App.runFunctions(App.pageResize);
  });
});

App.pageResize.push(function() {
  // Get window variables once per resize
  App.windowWidth = $(window).width();
  App.windowHeight = $(window).height();

  App.documentHeight = $(document).height();

  App.breakpoint = function(checkIfSize) {
    var xs = 480;
    var sm = 768;
    var md = 992;
    var lg = 1400;
    var breakpoint;

    if(App.windowWidth < xs) {
      breakpoint = 'xs';
    } else if(App.windowWidth >= md) {
      breakpoint = 'lg';
    } else if(App.windowWidth >= sm) {
      breakpoint = 'md';
    } else {
      breakpoint = 'sm';
    }

    App.previousBreakpoint = breakpoint;

    if(checkIfSize !== undefined) {
      if(checkIfSize == 'xs') {
        return App.windowWidth < xs;
      } else if(checkIfSize == 'sm') {
        return (App.windowWidth >= xs && App.windowWidth < sm);
      } else if(checkIfSize == 'md') {
        return (App.windowWidth >= sm && App.windowWidth < md);
      } else if(checkIfSize == 'lg') {
        return App.windowWidth >= md;
      }
    } else {
      return breakpoint;
    }
  }

  if ( App.previousBreakpoint != App.breakpoint() ) {
    App.runFunctions( App.pageBreakpoint );
  }
});

App.pageResize.push(function() {
  // Get window variables once per resize
  App.windowWidth = $(window).width();
  App.windowHeight = $(window).height();
});

//////////////////////////////////////////////////////////////
// Editing interface - on magic module update
//////////////////////////////////////////////////////////////

$(document).on('economy:magic_module_updated', function() {
  App.runFunctions(App.pageLoad);
});

App.atBottomOfPage = function(offset) {
  var offset = offset || 0;
  return App.scrollTop >= ($(document).height() - App.windowHeight - offset);
}
