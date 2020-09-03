/*!
 * Portfolio script
 * @author: Vo, Dinh Tue Minh
 * @ver: 1.0
 */

// -----------------------------------------------------------------------------------
// NAVIGATION

function toggleHamburger() {
  // transform hamburger
  const hamburger = document.getElementsByClassName("hamburger")[0];
  hamburger.classList.toggle("action");

  // toggle nav menu
  toggleNavigationMenu();
}

// Toggle navigation
function toggleNavigationMenu() {
  // active nav menu
  const navMenu = document.getElementsByClassName("nav-menu")[0];
  navMenu.classList.toggle("active");
}


function toggleIndicator() {
  const indicator = document.getElementsByClassName("scroll-down-container")[0];
  indicator.classList.toggle("hidden");
}

const navToggleLabel = document.getElementsByClassName("nav-toggle-button")[0];
navToggleLabel.addEventListener("click", toggleHamburger);

const navMenuItems = document.getElementsByClassName("nav-menu-item");
for (item of navMenuItems) {
  item.addEventListener("click", toggleHamburger);
}
// navMenuItems.forEach(e => e.addEventListener("click", toggleNavigationMenu));

// remove 'active' class from nav-menu-item
function resetNavMenuItem() {
  const navItems = document.getElementsByClassName("nav-menu-item");
  for (let i = 0; i < navItems.length; ++i) {
    let cl = navItems[i].classList;
    if (cl.contains("active")) {
      cl.remove("active");
    }
  }
}

const navMenuItemHome = document.getElementById("nav-menu-item-home");
const navMenuItemPortfolio = document.getElementById("nav-menu-item-portfolio");
const navMenuItemAbout = document.getElementById("nav-menu-item-about");
const navMenuItemFAQs = document.getElementById("nav-menu-item-faqs");
const navMenuItemContact = document.getElementById("nav-menu-item-contact");
// add 'active' class to nav-menu-item corresponding which section is visible
function activeNavMenuItem(section) {
  let navItem = null;
  switch (section.id) {
    case "home":
      navItem = navMenuItemHome;
      break;
    case "portfolio":
      navItem = navMenuItemPortfolio;
      break;
    case "about":
      navItem = navMenuItemAbout;
      break;
    case "faqs":
      navItem = navMenuItemFAQs;
      break;
    case "contact":
      navItem = navMenuItemContact;
      break;
    default:
      console.log(`activeNavMenuItem(): unhandled section '${section.id}'`);
      break;
  }
  if (navItem !== null) {
    resetNavMenuItem();
    navItem.classList.add("active");
  }
}


const sectionObserver = new IntersectionObserver((entries, sectionObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // if (entry.intersectionRect.height / window.innerHeight > 0.5) {
        activeNavMenuItem(entry.target);
      // }
    }
  });
}, {
  root: null, // use browser viewport as default
  // rootMargin: "0px",
  rootMargin: "-40% 0% -40% 0%",
  // threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] // just in case some sections grow too large
  threshold: 0.0
});

// set up section observer for each section
const sections = document.getElementsByTagName("section");
for (let i = 0; i < sections.length; ++i) {
  sectionObserver.observe(sections[i]);
}


const scrollDownIndicator = document.getElementsByClassName("scroll-down-container")[0];
// show the indicator in the home page
function showIndicator() {
  let classList = scrollDownIndicator.classList;
  if (classList.contains("hidden")) {
    classList.remove("hidden");
  }
}

// hide the indicator in the home page
function hideIndicator() {
  let classList = scrollDownIndicator.classList;
  if (classList.contains("hidden") === false) {
    classList.add("hidden");
  }
}

// toggle the scrolldown indicator based on scrolling
window.onscroll = () => this.scrollY === 0 ? showIndicator() : hideIndicator();

// NAVIGATION
// -----------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------
// PERSON CARD 




// TextScramble
// Justin Windle @soulwire
// https://codepen.io/soulwire/pen/mErPAK
// --------------------------------------------------------
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setTargetElement(newElement) {
    this.el = newElement;
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="tmp-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const skills = [
  "C++",
  "MSSQL",
  "Java",
  "GIT",
  "JavaScript",
  "OOP",
  "HTML5",
  "C#",
  "CSS3",
  "Python",
  "MySQL"
];
const personCardSkillID = "person-card__skill";
let textScramble = new TextScramble(document.getElementById(personCardSkillID));
let nextSkillId = 0;
let textScrambleTimeoutID;
function setNewSkillToHTML() {
  textScramble.setText(skills[nextSkillId]).then(() => {
    // wait time is 3000ms
    textScrambleTimeoutID = setTimeout(setNewSkillToHTML, 3000);
  });
  nextSkillId = (nextSkillId + 1) % skills.length;
}

setNewSkillToHTML();


// set the person card information
function setPersonCard(data) {
  const personCard = document.getElementsByClassName("person-card")[0];
  personCard.innerHTML = data;
}

// remove 'active' class from person-card-btn
function resetPersonCardBtn() {
  const personCardBtns = document.getElementsByClassName("person-card-btn");
  for (let i = 0; i < personCardBtns.length; ++i) {
    let cl = personCardBtns[i].classList;
    if (cl.contains("active")) {
      cl.remove("active");
    }
  }
}

// change the person card information to the new language
function changeLanguage(elementID, data) {
  clearTimeout(textScrambleTimeoutID); // stop the previous time out
  setPersonCard(data);
  textScramble.setTargetElement(document.getElementById(personCardSkillID)); // update the id
  resetPersonCardBtn();
  document.getElementById(elementID).classList.add("active"); // update the selected button
  setNewSkillToHTML();
}

// set listener to person card buttons
// js
const jsBtnID = "person-card-control__javascript-btn";
document.getElementById(jsBtnID).addEventListener("click", _ => {
  const data =
    `<pre><span class="code-keyword">class</span> <span class="code-class">Person</span> {</pre>
    <pre>   <span class="code-keyword">constructor</span>() {</pre>
    <pre>      <span class="code-keyword">this</span>.<span class="code-attribute">name</span>     = <span class="code-value">"Minh"</span>;</pre>
    <pre>      <span class="code-keyword">this</span>.<span class="code-attribute">gender</span>   = <span class="code-value">"&male;"</span>;</pre>
    <pre>      <span class="code-keyword">this</span>.<span class="code-attribute">location</span> = <span class="code-value">"&#127464;&#127462;🍁"</span>;</pre>
    <pre>      <span class="code-keyword">this</span>.<span class="code-attribute">skills</span>   = [ <span class="code-value">"</span><span class="code-value" id="${personCardSkillID}"></span><span class="code-value">"</span> ];</pre>
    <pre>   }</pre>
    <pre>}</pre>`;
  changeLanguage(jsBtnID, data)
});
// c++
const cppBtnID = "person-card-control__cpp-btn";
document.getElementById(cppBtnID).addEventListener("click", _ => {
  const data =
    `<pre><span class="code-keyword">class</span> <span class="code-class">Person</span> {</pre>
    <pre><span class="code-keyword">public</span>:</pre>
    <pre>   <span class="code-class">Person</span>()</pre>
    <pre>   : <span class="code-attribute">_name</span>     { <span class="code-value">"Minh"</span> },</pre>
    <pre>     <span class="code-attribute">_gender</span>   { <span class="code-value">"&male;"</span> },</pre>
    <pre>     <span class="code-attribute">_location</span> { <span class="code-value">"&#127464;&#127462;🍁"</span> },</pre>
    <pre>     <span class="code-attribute">_skills</span>   { <span class="code-value">"</span><span class="code-value" id="${personCardSkillID}"></span><span class="code-value">"</span> }</pre>
    <pre>   { }</pre>
    <pre>};</pre>`;
  changeLanguage(cppBtnID, data)
});
// python
const pythonBtnID = "person-card-control__python-btn";
document.getElementById(pythonBtnID).addEventListener("click", _ => {
  const skillElementID = "person-card__skill__python";
  const data =
    `<pre><span class="code-keyword">class</span> <span class="code-class">Person</span>:</pre>
  <pre>   <span class="code-keyword">def</span> <span class="code-attribute">__init__</span>(<span class="code-keyword">self</span>):</pre>
  <pre>      <span class="code-keyword">self</span>.<span class="code-attribute">name</span>     = <span class="code-value">"Minh"</span></pre>
  <pre>      <span class="code-keyword">self</span>.<span class="code-attribute">gender</span>   = <span class="code-value">"&male;"</span></pre>
  <pre>      <span class="code-keyword">self</span>.<span class="code-attribute">location</span> = <span class="code-value">"&#127464;&#127462;🍁"</span></pre>
  <pre>      <span class="code-keyword">self</span>.<span class="code-attribute">skills</span>   = [ <span class="code-value">"</span><span class="code-value" id="${personCardSkillID}"></span><span class="code-value">"</span> ]</pre>`;
  changeLanguage(pythonBtnID, data)
});
// csharp
const csharpBtnID = "person-card-control__csharp-btn";
document.getElementById(csharpBtnID).addEventListener("click", _ => {
  const data =
    `<pre><span class="code-keyword">class</span> <span class="code-class">Person</span> {</pre>
      <pre>  <span class="code-keyword">public</span> <span class="code-class">Person</span>() {</pre>
      <pre>     <span class="code-attribute">name</span>     = <span class="code-value">"Minh"</span>;</pre>
      <pre>     <span class="code-attribute">gender</span>   = <span class="code-value">"&male;"</span>;</pre>
      <pre>     <span class="code-attribute">location</span> = <span class="code-value">"&#127464;&#127462;🍁"</span>;</pre>
      <pre>     <span class="code-attribute">skills</span>   = </pre>
      <pre>       <span class="code-keyword">new</span> <span class="code-class">List</span>&lt;<span class="code-class">string</span>&gt; { <span class="code-value">"</span><span class="code-value" id="${personCardSkillID}"></span><span class="code-value">"</span> };</pre>
      <pre>  }</pre>
      <pre>}</pre>`;
  changeLanguage(csharpBtnID, data)
});
// java
const javaBtnID = "person-card-control__java-btn";
document.getElementById(javaBtnID).addEventListener("click", _ => {
  const data =
    `<pre><span class="code-keyword">class</span> <span class="code-class">Person</span> {</pre>
      <pre>  <span class="code-keyword">public</span> <span class="code-class">Person</span>() {</pre>
      <pre>    <span class="code-keyword">this</span>.<span class="code-attribute">name</span>     = <span class="code-value">"Minh"</span>;</pre>
      <pre>    <span class="code-keyword">this</span>.<span class="code-attribute">gender</span>   = <span class="code-value">"&male;"</span>;</pre>
      <pre>    <span class="code-keyword">this</span>.<span class="code-attribute">location</span> = <span class="code-value">"&#127464;&#127462;🍁"</span>;</pre>
      <pre>    <span class="code-keyword">this</span>.<span class="code-attribute">skills</span>   = <span class="code-keyword">new</span> <span class="code-class">Vector</span>&lt;&gt;() {{</pre>
      <pre>                       add(<span class="code-value">"</span><span class="code-value" id="${personCardSkillID}"></span><span class="code-value">"</span>);</pre>
      <pre>                    }};</pre>
      <pre>  }</pre>
      <pre>}</pre>`;
  changeLanguage(javaBtnID, data)
});

// PERSON CARD 
// -----------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------
// FAQs BUBBLES

const faqBubbleObserver = new IntersectionObserver((entries, faqBubbleObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      faqBubbleObserver.unobserve(entry.target);
    }
  });
}, {
  root: null, // use browser viewport as default
  rootMargin: "-25% 0% -25% 0%",
  threshold: 0
});

// set up observer for each bubble
const faqBubbleLefts = document.getElementsByClassName("speech-bubble-left-container");
for (let i = 0; i < faqBubbleLefts.length; ++i) {
  faqBubbleObserver.observe(faqBubbleLefts[i]);
}
const faqBubbleRights = document.getElementsByClassName("speech-bubble-right-container");
for (let i = 0; i < faqBubbleRights.length; ++i) {
  faqBubbleObserver.observe(faqBubbleRights[i]);
}

// FAQs BUBBLES
// -----------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------
// CONTACT FORM

// build the statement of agreement in the contact form
// with the time and day in toronto timezone
function buildContactFormAgreement() {
  const date = new Date();
  const myTimeZone = new Date(date.toLocaleDateString("en-US", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }));
  let hrs = myTimeZone.getHours();
  let postfix = "AM";
  if (hrs >= 12) {
    hrs -= 12;
    postfix = "PM";
  }
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  let mins = myTimeZone.getMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }
  const day = (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])[myTimeZone.getDay()];
  return `I am sure that there is no misspelling in my input, and I am totally aware that it is about ${hrs}:${mins} ${postfix} on ${day} in Ontario, CA.`;
}

// set the statement to the html element
const contactFormAgreement = document.getElementById("contact-form-agreement");
contactFormAgreement.innerHTML = buildContactFormAgreement();

// toggle the submit button based on whether the agreement is checked
const submitBtn = document.getElementById("contact-form-submit-btn");
const agreementCheckbox = document.getElementById("contact-form-checkbox");
agreementCheckbox.addEventListener("click", (e) => {
  if (e.target.checked == true) {
    submitBtn.classList.add("active");
    submitBtn.disabled = false;
  }
  else {
    submitBtn.classList.remove("active");
    submitBtn.disabled = true;
  }
});

const contactForm = document.forms["contact-form"];
const contactFormName = document.forms["contact-form"]["name"];
const contactFormNameError = document.getElementById("contact-form-name-error");
const contactFormEmail = document.forms["contact-form"]["email"];
const contactFormEmailError = document.getElementById("contact-form-email-error");
const contactFormMessage = document.forms["contact-form"]["message"];
const contactFormMessageError = document.getElementById("contact-form-message-error");

// check if the name in contact form is valid
// return true is valid (not empty), false otherwise
function isContactFormNameValid() {
  return (contactFormName.value.trim().length > 0) ? true : false;
}

function valivateContactFormName() {
  isContactFormNameValid()
    ? contactFormNameError.classList.remove("active")
    : contactFormNameError.classList.add("active");
}

// regex for most email (not all)
const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
// check if the email in contact form is valid
// return true is valid (follow the regex), false otherwise
function isContactFormEmailValid() {
  const val = contactFormEmail.value.trim().toLowerCase();
  return emailRegEx.test(val);
}

function validateContactFormEmail() {
  isContactFormEmailValid()
    ? contactFormEmailError.classList.remove("active")
    : contactFormEmailError.classList.add("active");
}

// check if the message in contact form is valid
// return true is valid (not empty), false otherwise
function isContactFormMessageValid() {
  return (contactFormMessage.value.trim().length > 0) ? true : false;
}

function validateContactFormMessage() {
  isContactFormMessageValid()
    ? contactFormMessageError.classList.remove("active")
    : contactFormMessageError.classList.add("active");
}

const contactFormCheckBox = document.getElementById("contact-form-checkbox");
function resetContactForm() {
  // clear input fields
  contactFormName.value = "";
  contactFormEmail.value = "";
  contactFormMessage.value = "";
  // hide errors
  contactFormNameError.classList.remove("active");
  contactFormEmailError.classList.remove("active");
  contactFormMessageError.classList.remove("active");
  // rebuild the content of the agreement
  contactFormAgreement.innerHTML = buildContactFormAgreement();
  // uncheck agreement checkbox
  agreementCheckbox.checked = false;
  // disable submit button
  submitBtn.classList.remove("active");
  submitBtn.disabled = true;
}

let firstTimeInput = true;
const contactFormBtnError = document.getElementById("contact-form-btn-error");
const scriptURL = "https://script.google.com/macros/s/AKfycbwiv84Z3C7X8Qm3T82WsoApJ9Q70XFssafyOxJZcj5KeeGEW_Nw/exec";
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stop the event, do not proceed further
  contactFormBtnError.classList.add("active");
  if (isContactFormNameValid() && isContactFormEmailValid() && isContactFormMessageValid()) {
    contactFormBtnError.innerHTML = "Pushing your input..."
    fetch(scriptURL, {
      method: "POST",
      body: new FormData(contactForm)
    })
    .then(response => {
      resetContactForm();
      contactFormBtnError.innerHTML = "Your input has been pushed successfully!";
      // console.log("Success!", response);
    })
    .catch(error => {
      resetContactForm();
      contactFormBtnError.innerHTML = "Oops, something went wrong!";
      // console.error("Error!", error.message);
    });
  }
  else {
    contactFormBtnError.innerHTML = "Please correct errors and try again.";
    valivateContactFormName();
    validateContactFormEmail();
    validateContactFormMessage();
    if (firstTimeInput) {
      contactFormName.addEventListener("input", valivateContactFormName);
      contactFormEmail.addEventListener("input", validateContactFormEmail);
      contactFormMessage.addEventListener("input", validateContactFormMessage);
      firstTimeInput = false;
    }
  }
});

// CONTACT FORM
// -----------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------
// HI THERE
console.log(`        
   __ ___   ________              
  / // (_) /_  __/ /  ___ _______ 
 / _  / /   / / / _ \/ -_) __/ -_)
/_//_/_/   /_/ /_//_/\__/_/  \__/ 
                             
😊
`);