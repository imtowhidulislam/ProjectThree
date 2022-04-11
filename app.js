"use strict";

/* TODO:: ALL HTML ELEMENTS */
const front = document.querySelector(".front");
const web = document.querySelector(".web");
const primaryNavigation = document.querySelector(".primary-navigation");
const mobileNavigation = document.querySelector(".mobile-nav-loggle");
const secOneBtn = document.querySelector(".sec--1__btn");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".primary-header");
const navLinks = document.querySelector(".nav__links");
const navlink = document.querySelectorAll(".nav__link");
const header = document.querySelector(".header");
const navHeader = document.querySelector(".header__nav");
const opetabContainer = document.querySelector(".operations__tab-container");
const opeTab = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__content");
const sliderbtnleft = document.querySelector(".slider__btn--left");
const sliderbtnright = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");
const cardTitle = document.querySelectorAll(".card_title");
const year = document.querySelector(".year");
const cardContainer = document.querySelector(".card__container");
console.log(cardContainer);
/* TODO:: navsection ====== */

// console.log(primaryNavigation.dataset.visibility);

mobileNavigation.addEventListener("click", () => {
  let x = primaryNavigation.getAttribute("data-visible");
  console.log(x);
  if (x === "false") {
    primaryNavigation.setAttribute("data-visible", true);
    mobileNavigation.setAttribute("aria-expanded", true);
    mobileNavigation.classList.add("cross");
  } else if (x === "true") {
    primaryNavigation.setAttribute("data-visible", false);
    mobileNavigation.setAttribute("aria-expanded", false);
    mobileNavigation.classList.remove("cross");
  }
});
const dataset = primaryNavigation.getAttribute("dataset");

// console.log(getComputedStyle(primaryNavigation).height);
// primaryNavigation.style.height =
// Number.parseFloat(getComputedStyle(primaryNavigation).height, 10) + 10 + "px";
/* TODO:: NAV SECITON END*/

/* change the color of the title */

const cngClr = () => {
  const color = "#4c4c4c";
  const color1 = "#444aaa";
  document.documentElement.style.setProperty("--color-secondary", color);
  document.documentElement.style.setProperty("--color-primary", color1);
};
cngClr();

/* TODO: Move to the first Section */
const headerBtn = () => {
  secOneBtn.addEventListener("click", (e) => {
    console.log("hello");
    console.log(section1);
    section1.scrollIntoView({ behavior: "smooth" });
  });
};

headerBtn();
/* TODO:smooth Scrolling */
const smoothingScroll = () => {
  navLinks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("nav__link")) {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      const link = e.target;
      const scrollTo = link.getAttribute("href");
      const specificSection = document.querySelector(scrollTo);
      specificSection.scrollIntoView({ behavior: "smooth" });
    }
  });
};

smoothingScroll();
/* TODO:: sticky navbar ======= */
const stickyNav = () => {
  const navHeight = nav.getBoundingClientRect().height;

  const obsOption = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) navHeader.classList.add("sticky");
    else {
      navHeader.classList.remove("sticky");
    }
  };

  const observer = new IntersectionObserver(obsOption, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  observer.observe(header);

  /* Operations tab content */

  opetabContainer.addEventListener("click", (e) => {
    opeTab.forEach((tab) => {
      tab.classList.remove("operations__tab--active");
    });
    if (!e.target.classList.contains("operations__tab")) return;
    else {
      e.target.classList.add("operations__tab--active");
      const particularContent = e.target.getAttribute("data-tab");
      const actualContent = document.querySelector(
        `.operations__content--${particularContent}`
      );

      operationsContent.forEach((con) => {
        con.classList.remove("operations__content--active");
      });
      actualContent.classList.add("operations__content--active");
    }
  });
};

stickyNav();
/* TODO:: ============ section 3rd ======== */
const sliderFunc = () => {
  // * Slider section ==================

  // ! taking a counter
  let currSlide = 0;
  // * restrict the counter within the lenght;
  const slideLength = slide.length;

  const targetSlide = (curSlide = 0) => {
    slide.forEach((slides, i) => {
      return (slides.style.transform = `translateX(${100 * (i - curSlide)}%)`);
    });
  };
  /* slide.forEach((slides, i) => {
  return (slides.style.transform = `translateX(${100 * i}%)`);
}); */
  targetSlide();

  // * Creating Dots
  console.log(slide);
  const createDot = () => {
    // ! using underscore we can make it as through away variable.
    slide.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button> `
      );
    });
  };
  createDot();

  const activeDots = (slideNo = 0) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((el) => el.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slideNo}"]`)
      .classList.add("dots__dot--active");
  };
  activeDots();
  //! end of dots functionality

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      console.log("Dots");
      const getAtt = e.target.dataset.slide;
      targetSlide(getAtt);
      activeDots(getAtt);
    }
  });

  console.log(sliderbtnright);

  const nextBtn = function () {
    currSlide++;
    if (currSlide > slideLength - 1) {
      currSlide = 0;
    }
    targetSlide(currSlide);
    activeDots(currSlide);
  };
  sliderbtnright.addEventListener("click", nextBtn);
  const prevBtn = function () {
    currSlide--;
    if (currSlide < 0) {
      currSlide = slideLength - 1;
    }
    targetSlide(currSlide);
    activeDots(currSlide);
  };
  sliderbtnleft.addEventListener("click", prevBtn);
  // * implimenting the arrow keys functionality
  document.addEventListener("keydown", (e) => {
    e.key === "ArrowRight" && nextBtn();
    e.key === "ArrowLeft" && prevBtn();
    // console.log(e.key);
    // console.log(e);
  });
  /* document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextBtn();
  } else if (e.key === "ArrowLeft") {
    prevBtn();
  } else return;
}); */
};

sliderFunc();

/* document.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});
 */

// ! Lazy loading images ======== !!!!
const allImages = document.querySelectorAll(".sec-2-image");
// const allImages1 = document.querySelectorAll("img[data-src");
const loadImage = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  // * guart clause.
  if (!entry.isIntersecting) return;

  // ! Replace image with data-src image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("blur");
  });

  // ! restrict the effects to happend in reverse way
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

allImages.forEach((img) => imageObserver.observe(img));

/* // ! revealing the section */
const sectionAll = document.querySelectorAll(".section");

const loadSection = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0.15,
});
sectionAll.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/* ! Fifth Section Start */

cardTitle.forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    card.style.color = "#afafaf";
    card.style.transition = "250ms ease-in-out";
  });
});
cardTitle.forEach((card) => {
  card.addEventListener("mouseout", (e) => {
    card.style.color = "";
    card.style.transition = "250ms ease-in-out";
  });
});

/* ! Fifth Section End */
/* Footer section Start */
const currYear = new Date().getFullYear();
year.textContent = currYear;
/* Footer section End */

// ? Setting card data..
const cardData = [
  {
    id: 1,
    img: "./Assets/img1.png",
    title: "Project one",
    link: "https://github.com/imtowhidulislam/Portfolio-websites",
  },
  {
    id: 2,
    img: "./Assets/img4.png",
    title: "Project two",
    link: "https://github.com/imtowhidulislam/ReactProject",
  },
  {
    id: 3,
    img: "./Assets/img3.png",
    title: "Project three",
    link: "https://github.com/imtowhidulislam/PortfolioWebsiteFour",
  },
];

const setCard = () => {
  const html = cardData
    .map((card) => {
      const { id, img, title, link } = card;
      return `
    <div class="card card_1">
          <a href=${link} class="linkGit">
            <i class="fab fa-github"></i>
          </a>
          <img src=${img} />
          <h4 class="card_title">${title}</h4>
    </div>
    `;
    })
    .join("");
  cardContainer.insertAdjacentHTML("beforeend", html);
};
setCard();
