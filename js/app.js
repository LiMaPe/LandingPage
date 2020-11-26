//creates a HTMLCollections of all elements with class section
let sections = document.getElementsByClassName("section");

//creates an array of the above HTMLCollection
sections = Array.from(sections); 

//Creates an array of the sections Id´s 
const navItems = sections.map(element => {
   return element.id; 
});

//For each section, add it to the navbar with a link to the corresponding section.  
const parent = document.querySelector(".navbar")

navItems.forEach(section => {
    const navItem = document.createElement("li");
    const nameOfNavItem = section;
    const linked = document.createElement("a");
    navItem.classList.add("navbar__item", `${nameOfNavItem}`);
    linked.href = `#${nameOfNavItem}`;
    linked.textContent = nameOfNavItem;
    linked.classList.add("navItem__link");
    parent.appendChild(navItem);
    navItem.appendChild(linked);
});

//When a user scrolls set the active class to top section and corresponding nav item.
window.addEventListener("scroll", function(){

    //Creates an object with the sections ID and the sections Y cordinate
    let sectionCordinates = {};
    sections.forEach(section => {
    const position = section.getBoundingClientRect();
    const positionY = position.y;
    sectionCordinates[section.id] = positionY;
    });

    // Compare the Y coordinates to find the (positive) Y coordinate closets to 0.

    const yValues = Object.values(sectionCordinates);
    const activeY = yValues.reduce((acc, currVal, index) => {
        if (currVal >= 0 && (currVal < acc.val || acc.val === -1)) {
            return {
                val:  currVal,
                index: index
            }
        }
        return acc
    }, {val: -1, index: -1})

    const activeSection = Object.keys(sectionCordinates)[activeY.index];

    //when section is active set class to active--on, else active--off

    navItems.forEach(section => {
        const currSection = document.getElementById(`${section}`)
        if (section === activeSection) {
            currSection.classList.add("active--on");
            return;
        } else {
            currSection.classList.remove("active--on");
            return;
        }
    });

    //When a section is active set the corresponding navbar item to nav__item--active--on else nav__item--active--off

    const activeNavItem = document.querySelectorAll(`li.${activeSection}`)[0];
    const allNavItems = Array.from(document.getElementsByClassName("navbar__item"));

    allNavItems.forEach(item => {
        const currNavItem = document.querySelectorAll(`li.${item.classList[1]}`)[0];
        if(item === activeNavItem) {
            currNavItem.classList.add("nav__item--active--on");
            return;
        } else {
            currNavItem.classList.remove("nav__item--active--on");
            return;
        }
    });
});

//Makes the navbar stick to the top of the page

// adds a on-scroll eventlistener with a function to execute when user scrolls. 
window.onscroll = function() {stickToTop()};
const navBar = document.getElementsByClassName("navbar")[0];
const stickPos = navBar.offsetTop;

function stickToTop() {
  if (window.pageYOffset > stickPos) {
    navBar.classList.add("navbar--stick");
  } else {
    navBar.classList.remove("navbar--stick");
  }
}