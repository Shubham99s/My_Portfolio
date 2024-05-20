'user strict';

// ADD EVENT ON MULTIPLE EVENTS
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// PRELOADING
const loadingElement = document.querySelector('[data-loading]');

window.addEventListener('load', function () {
  loadingElement.classList.add('loaded');
  this.document.body.classList.remove('active');
});

// MOBILE NAV TOGGLE
const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll('[data-nav-toggler]'),
  document.querySelectorAll('[data-nav-link]'),
  document.querySelector('[data-navbar]'),
  document.querySelector('[data-overlay]'),
];

const toggleNav = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('active');
};

addEventOnElements(navTogglers, 'click', toggleNav);

const closeNav = function () {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('active');
};

addEventOnElements(navLinks, 'click', closeNav);

// HEADER
const header = document.querySelector('[data-header]');

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
};

window.addEventListener('scroll', activeElementOnScroll);

// TEXT ANIMATION EFFECT FOR HERO SECTION
const letterBoxes = document.querySelectorAll('[data-letter-effect]');

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
  //loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    //set initial animation delay
    let letterAnimationDelay = 0;

    //get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();

    //remove all character from the current letter box
    letterBoxes[i].textContent = '';

    //loop through all letters
    for (let j = 0; j < letters.length; j++) {
      //create a span
      const span = document.createElement('span');

      //set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      //set the "in" class on the span, if current letter box is active
      //otherwise class is "out"
      if (i == activeLetterBoxIndex) {
        span.classList.add('in');
      } else {
        span.classList.add('out');
      }

      //pass current letter into span
      span.textContent = letters[j];

      //add space class on span, when current letter contain space
      if (letters[j] === ' ') span.classList.add('space');

      //pass the span on current letter box
      letterBoxes[i].appendChild(span);

      //skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      //otherwise update
      letterAnimationDelay += 0.05;
    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    //add active class on last active letter box
    if (i == lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add('active');
    } else {
      letterBoxes[i].classList.remove('active');
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    //update activeLetterBoxIndex on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLetterBoxDelay * 1000 + 3000);
};

//call the letter effect funtion after window loaded
window.addEventListener('load', setLetterEffect);

/**
 * BACK TO TOP BUTTON
 */
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
  const bodyHeight = this.document.body.scrollHeight;
  const windowHeight = this.window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  //visible back top btn when scrolled 5% of page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
});

/**
 * SCROLL REVEAL
 **/
const revealElements = document.querySelectorAll('[data-reveal]');

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add('revealed');
    } else {
      revealElements[i].classList.remove('revealed');
    }
  }
};

window.addEventListener('scroll', scrollReveal);

scrollReveal();

/**
 * CUSTOM CURSOR
 **/
const cursor = document.querySelector('[data-cursor]');
const anchorElements = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');
const h1 = document.querySelectorAll('h1');
const logo = document.querySelectorAll('img');

// change cursorElement position based on cursor movement
document.body.addEventListener('mousemove', function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 20);
});

// add and remove cursor hovered class
const hoverActive = function () {
  cursor.classList.add('hovered');
};

const hoverDeactive = function () {
  cursor.classList.remove('hovered');
};

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, 'mouseover', hoverActive);
addEventOnElements(anchorElements, 'mouseout', hoverDeactive);

addEventOnElements(buttons, 'mouseover', hoverActive);
addEventOnElements(buttons, 'mouseout', hoverDeactive);

addEventOnElements(h1, 'mouseover', hoverActive);
addEventOnElements(h1, 'mouseout', hoverDeactive);

addEventOnElements(logo, 'mouseover', hoverActive);
addEventOnElements(logo, 'mouseout', hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener('mouseout', function () {
  cursor.classList.add('disabled');
});

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener('mouseover', function () {
  cursor.classList.remove('disabled');
});

/**
 * CONTACT FORM
 **/

const form = document.querySelector('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('textarea');

// //Function for sending email

// // function sendEmail() {
// //   const bodymessage = `Name:${fullname.value}<br>Email:${email.value}<br>Message:${textarea.value}`;
// //   console.log('hello');
// //   Email.send({
// //     Host: 'smtp.elasticemail.com',
// //     Username: 'shubhamsonkusale1994@gmail.com',
// //     Password: '2505FC49F6EAE31A63526482C7D1A04CFCF8',
// //     To: 'shubhamsonkusale1994@gmail.com',
// //     From: 'shubhamsonkusale1994@gmail.com',
// //     Subject: subject.value,
// //     Body: bodymessage,
// //   }).then((message) => alert(message));
// // }

// // form.addEventListener('submit', (e) => {
// //   e.preventDefault();

// //   sendEmail();
// // });

// function sendEmail() {
//   let params = {
//     fullname,
//     email,
//     subject,
//     message,
//   };

//   emailjs
//     .send('service_ot7ye3s', 'template_28nx5hk', params)
//     .then(alert('Email Sent'));
// }
