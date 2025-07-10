// Media query header
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
});

// SIGN IN
document.addEventListener('DOMContentLoaded', () => {
    const signInBtnLink = document.querySelector('.signInBtn-link');
    const signUpBtnLink = document.querySelector('.signUpBtn-link');
    const wrapper = document.querySelector('.wrapper');
    
    // Toggle between sign in and sign up forms
    signUpBtnLink.addEventListener('click', () => {
        wrapper.classList.toggle('active');
    });
    signInBtnLink.addEventListener('click', () => {
        wrapper.classList.toggle('active');
    });

    // Validate Sign In form
    const signInForm = document.querySelector('.sign-in form');
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = signInForm.querySelector('input[type="text"]').value.trim();
        const password = signInForm.querySelector('input[type="password"]').value.trim();

        if (!username) {
            alert('Username cannot be empty');
            return;
        }
        if (username.length < 3) {
            alert('Username must be longer than 2 characters');
            return;
        }
        if (!password) {
            alert('Password cannot be empty');
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password)) {
            alert('Password must be at least 5 characters long and contain both letters and numbers');
            return;
        }

        alert('Welcome!');
        window.location.href = 'index.html';
    });

    // Validate Sign Up form
    const signUpForm = document.querySelector('.sign-up form');
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = signUpForm.querySelector('input[type="text"]').value.trim();
        const phoneNumber = signUpForm.querySelector('input[type="text"][placeholder="Phone Number"]').value.trim();
        const email = signUpForm.querySelector('input[type="email"]').value.trim();
        const password = signUpForm.querySelector('input[type="password"]').value.trim();
        const confirmPassword = signUpForm.querySelector('input[type="password"][placeholder="Confirmation"]').value.trim();
        const agreeTerms = signUpForm.querySelector('input[type="checkbox"]').checked;

        if (!username) {
            alert('Username cannot be empty');
            return;
        }
        if (username.length < 3) {
            alert('Username must be longer than 2 characters');
            return;
        }
        if (!/^\d{11,12}$/.test(phoneNumber)) {
            alert('Phone Number must be numeric and 11 to 12 digits long');
            return;
        }
        if (!email.endsWith('@gmail.com')) {
            alert('Email must be a valid Gmail address');
            return;
        }
        if (!password) {
            alert('Password cannot be empty');
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password)) {
            alert('Password must be at least 5 characters long and contain both letters and numbers');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!agreeTerms) {
            alert('You must agree to the terms and conditions');
            return;
        }

        alert('Sign up successful!');
        wrapper.classList.toggle('active');
    });
});

// Main page slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const sliderContents = document.querySelectorAll('.slider-content');
    const sliderRadios = document.querySelectorAll('.slider-radio');
    const videos = document.querySelectorAll('.slider-content video');
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    function changeSlide(index) {
        sliderContents[currentIndex].classList.remove('active');
        sliderRadios[currentIndex].checked = false;
        currentIndex = index;
        if (currentIndex >= sliderContents.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = sliderContents.length - 1;
        }
        sliderContents[currentIndex].classList.add('active');
        sliderRadios[currentIndex].checked = true;
        setPositionByIndex();
    }

    sliderContents.forEach((slide, index) => {
        slide.addEventListener('dragstart', (e) => e.preventDefault());
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
            changeSlide(currentIndex + 1);
        }

        if (movedBy > 100) {
            changeSlide(currentIndex - 1);
        }

        setPositionByIndex();
        slider.classList.remove('grabbing');
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            setSliderPosition();
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    
     videos.forEach(video => {
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });

        video.addEventListener('play', () => {
            const overlayText = video.parentElement.querySelector('.slider-text');
            overlayText.classList.add('slider-text-active');
        });

        video.addEventListener('pause', () => {
            const overlayText = video.parentElement.querySelector('.slider-text');
            overlayText.classList.remove('slider-text-active');
        });

        video.addEventListener('ended', () => {
            const overlayText = video.parentElement.querySelector('.slider-text');
            overlayText.classList.remove('slider-text-active');
        });
    });

    setPositionByIndex();
});

// cars
function filterCars(category) {
    var cars = document.getElementsByClassName('car-card');
    var tabs = document.getElementsByClassName('tab-link');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    event.target.classList.add('active');
    
    if (category == 'all') {
        for (var i = 0; i < cars.length; i++) {
            cars[i].style.display = "flex";
        }
    } else {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].getAttribute('data-category') == category) {
                cars[i].style.display = "flex";
            } else {
                cars[i].style.display = "none";
            }
        }
    }
}

function searchCars() {
    var input, filter, cars, carName, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    cars = document.getElementsByClassName('car-card');
    
    for (i = 0; i < cars.length; i++) {
        carName = cars[i].getAttribute('data-name');
        if (carName.toUpperCase().indexOf(filter) > -1) {
            cars[i].style.display = "";
        } else {
            cars[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    const images = document.querySelectorAll('.showroom-image');

    function showImage(index) {
        images.forEach((image, i) => {
            image.style.display = i === index ? 'block' : 'none';
        });
    }

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });
});

// data untuk dishowroom masukin tanggal
document.addEventListener('DOMContentLoaded', function() {
    const visitForm = document.getElementById('visitForm');
    
    visitForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit default
        alert('Successfully saved. Thank you.');
    });
});

const carouselContent = document.querySelector('.carousel-content');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

let index = 0;

document.querySelector('.left-arrow').addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = totalItems - 1;
    }
    updateCarousel();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    if (index < totalItems - 1) {
        index++;
    } else {
        index = 0;
    }
    updateCarousel();
});

function updateCarousel() {
    carouselContent.style.transform = `translateX(-${index * 100}%)`;
}

// trigger untuk visitor
document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.getElementById('stats-container');

    function triggerAnimation() {
        container.classList.remove('fade-in'); 
        void container.offsetWidth; 
        container.classList.add('fade-in'); 
    }

    container.addEventListener('mouseenter', triggerAnimation);
    container.addEventListener('touchstart', triggerAnimation);
   
    container.style.opacity = '1'; 

    triggerAnimation();
});

// Testimonial Data
const testimonials = [
    {
      name: "Fitri",
      job: "CEO, Department Store",
      image: "images/client/client1.png",
      testimonial:
        "I am very satisfied with the service at the Diamondcut Motors Car Dealer. The staff are friendly and helpful, they always try to provide the best for their customers. I will definitely recommend this dealer to my friends and family.",
    },
    {
      name: "Josh",
      job: "Developer, EATNDRUMs",
      image: "images/client/client2.png",
      testimonial:
        "I recently purchased a new car at Diamondcut Motors Car Dealership, and I am very happy with my experience. The car is in excellent condition, and the price is very competitive. I will definitely return to this dealership another time.",
    },
    {
      name: "Aaron",
      job: "UI Designer, Freelance",
      image: "images/client/client3.png",
      testimonial:
        "I have been a customer of the Diamondcut Motors Car Dealership for several years, and I have always been satisfied with the service. The staff is always professional and friendly, and they always try to help me find the right car for my needs.",
    },
  ];
  
  // Current Slide
  let i = 0;
  // Total Slides
  let j = testimonials.length;
  
  let testimonialContainer = document.getElementById("testimonial-container");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("prev");
  
  nextBtn.addEventListener("click", () => {
    i = (j + i + 1) % j;
    displayTestimonial();
  });
  prevBtn.addEventListener("click", () => {
    i = (j + i - 1) % j;
    displayTestimonial();
  });
  
  let displayTestimonial = () => {
    testimonialContainer.innerHTML = `
      <p>${testimonials[i].testimonial}</p>
      <img src=${testimonials[i].image} alt="${testimonials[i].name}">
      <h3>${testimonials[i].name}</h3>
      <h6>${testimonials[i].job}</h6>
    `;
  };
  
  window.onload = displayTestimonial;
  
document.addEventListener("DOMContentLoaded", function() {
    var logosSlide = document.querySelector(".logos-slide");
    var copy = logosSlide.cloneNode(true);
    logosSlide.parentElement.appendChild(copy);
});
