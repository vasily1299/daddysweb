$(window).on("load", function () {
  // vide.js - video background
  $("#header").vide("./../video/cover", {
    bgColor: "#7A9EC6",
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu_item"),
    hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("menu_active");
    });
  });
});

$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    // adaptiveHeight: true,
    autoplay: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../img/icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../img/icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 760,
        settings: {
          // dots: true,
          arrows: false,
        },
      },
    ],
  });

  // Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Enter your name, please",
          minlength: jQuery.validator.format("Enter {0} symbols!"),
        },
        phone: "Enter your phone, please",
        email: {
          required: "Enter your E-mail, please",
          email: "Incorrectly entered email address",
        },
      },
    });
  }

  validateForms("#consultation-form");

  $("input[name=phone]").mask("+99 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });
});
