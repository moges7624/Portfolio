(function() {
  // Cache DOm
  var $section = $("section");
  var $header = $("#header");
  var $menu = $header.find(".navigation__menu");
  var $navLinks = $menu.find(".navigation__link");
  var $about = $(".about");
  var $burger = $header.find(".navigation__burger");
  var $downArrow = $('a[href="#about"]');
  var $headerHeight = $header.height();

  //   bind events
  $navLinks.on("click", smoothScroll);
  $burger.on("click", mobileNavSlider);
  $(window).on("scroll", drawBorder);
  $(window).on("scroll", scrollSpy);
  $downArrow.on("click", scrollDown);

  //   Functions
  function smoothScroll() {
    if (this.hash !== "") {
      const hash = this.hash;
      var marginTop = parse($(hash).css("margin-top"));

      if (hash === "#header") {
        $("html, body").animate({ scrollTop: 0 }, 800);
      } else {
        $("html, body").animate(
          { scrollTop: $(hash).offset().top - ($header.height() + marginTop) },
          800
        );
      }

      if ($menu.hasClass("navigation__menu--active")) {
        $menu.toggleClass("navigation__menu--active");
      }
    }
  }

  function mobileNavSlider() {
    $menu.toggleClass("navigation__menu--active");
  }

  function drawBorder() {
    var ypos = window.pageYOffset;
    if (ypos > 100) {
      $header.css("border-bottom", "1px solid rgba(0, 73, 238, 0.2");
    } else {
      $header.css("border-bottom", "none");
    }
  }

  function scrollSpy() {
    var currentPos = $(document).scrollTop();

    $section.each(function() {
      var self = $(this);
      var marginTop = parse(self.css("margin-top"));
      var aboutMargin = parse($about.css("margin-top"));

      if (currentPos < $about.offset().top - aboutMargin - $header.height()) {
        $navLinks.removeClass("activel");
        $("#header-marker").addClass("activel");
      } else if (
        currentPos >= $about.offset().top - aboutMargin - $header.height() &&
        self.offset().top <
          currentPos + $headerHeight + parse(self.css("margin-top")) + 100
      ) {
        var targetClass = "#" + self.attr("id") + "-marker";
        if (targetClass !== "#undefined-marker") {
          $navLinks.removeClass("activel");
          $(targetClass).addClass("activel");
        }
      }
    });
  }

  function scrollDown() {
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top - 100 },
      500,
      "linear"
    );
  }

  function parse(value) {
    return Math.abs(parseFloat(value));
  }
})();
