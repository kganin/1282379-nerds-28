let feedbackPopup = document.querySelector(".feedback-popup");
let feedbackOpen = document.querySelector(".contacts .button");
let feedbackClose = document.querySelector(".close-button");
let nameField = feedbackPopup.querySelector("[name=name]");
let emailField = feedbackPopup.querySelector("[name=email");
let feedbackField = feedbackPopup.querySelector("[name=message]");
let fields = document.querySelectorAll(".field");


let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

let index = 0;

// Popup

const popupClose = () => {
  deleteErr();
  feedbackPopup.classList.remove("popup-show");
  feedbackPopup.classList.add("popup-close");
}

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

feedbackOpen.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove("popup-close");
  feedbackPopup.classList.add("popup-show");
  if (storageName || storageEmail) {
    nameField.value = storageName;
    emailField.value = storageEmail;
    feedbackField.focus();
  } else if (storageName) {
    nameField.value = storageName;
    emailField.focus();
  } else {
    feedbackField.focus();
  }
  feedbackField.value = "";
});

feedbackClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupClose();
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (feedbackPopup.classList.contains("popup-show")) {
      evt.preventDefault();
      popupClose();
    }
  }
});

const addErr = () => {
  for (let i = 0; i < fields.length; i++) {
    let fieldItem = fields[i];
    fieldItem.classList.add('feedback-error');
    setTimeout(function() {
      fieldItem.classList.remove('feedback-error');
    }, 250);
  }
}

const deleteErr = () => {
  for (let i = 0; i < fields.length; i++) {
    let fieldItem = fields[i];
    fieldItem.classList.remove('feedback-error');
  }
}

feedbackPopup.addEventListener("submit", function(evt) {
  if (!nameField.value || !emailField.value || !feedbackField.value) {
    evt.preventDefault();
    addErr();
    feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});

// Map

function init() {
  let myMap = new ymaps.Map("map", {
    center: [59.93883, 30.32010],
    zoom: 16,
    controls: ["zoomControl"]
  });
  myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
    hintContent: "Дизайн-студия Nerds<br>ул. Большая Конюшенная, 19/8, Санкт-Петербург",
  }, {
    iconLayout: "default#image",
    iconImageHref: "img/pin.png",
    iconImageSize: [231, 190],
    iconImageOffset: [-40, -140]
  }), myMap.behaviors.disable("scrollZoom"), myMap.geoObjects.add(myPlacemark)
}
ymaps.ready(init);

// Slider

let slider = document.querySelector(".features-slider");
if (slider) {
  const activeSlide = n => {
    for (slide of slides) {
      slide.classList.remove("current");

    }
    slides[n].classList.add("current");
  }

  const activeToggle = n => {
    for (dot of dots) {
      dot.classList.remove("current");
    }
    dots[n].classList.add("current");
  }

  const nextSlide = () => {
    if (index == slides.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
    } else {
      index++;
      prepareCurrentSlide(index);
    }

  }

  const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeToggle(ind);
  }

  dots.forEach((item, indexDot) => {
    item.addEventListener("click", () => {
      index = indexDot;
      prepareCurrentSlide(index);
      clearInterval(interval);
    })
  });

  const interval = setInterval(nextSlide, 2500);
}