**The Landing Page Project**

This project is a part of the Front End Web Developer Nanodegree at Udacity. This project was made independently and without any starter code. The project is made with HTML, CSS and JavaScript, following a series of lectures on the theme “JavaScript & the DOM”. The project required me to build a landing page that uses JavaScript to create an interactive navigational experience for the user. 

Below is first an overview of the subjects covered in this part of the course and later I walk you thru the process step by step of building this project. 

**Preview the website live on https://limape.github.io/LandingPage/**


**Part 1. Course overview – JavaScript and the DOM**

**Syntax**
- Template literals
- Destructuring
-	Iteration and Family of For Loops
-	Spread… and …Rest

**The Document Object Model**
-	The DOM
-	Different methods to access elements, e.g. select page elements by ID or Class. 
-	Nodes, Elements and Interfaces
-	Other ways to access elements

**Creating Content with JavaScript**
-	Update, add and remove content
-	Style page content

**Working with Browser Events**
-	Respond to Events
-	Remove an Event listener
-	What to avoid and know when the DOM is ready

**Performance**
-	Add page content efficiently
-	Reflow and repaint
-	The call stack
-	The event loop
-	setTimeout

**Part 2. About the design and process of making this project**

**What is a landing page?**

The main difference between a landing page and a home page is that a landing page has a narrow scope. For a homepage you want to be able to fulfill more needs or goals. Therefore, homepages include e.g. navigation bars and multiple outbound links that offer visitors easy access to the content they seek. Most example I come by are commercials with a post-click landing page. With a page with a narrow focus and a few as possible links you want to keep to potential customers focus. 

**The goal of my landing page**

I find it more inspirational to build and code when I set a real (or at least imaginative real) purpose for my project. This landing page will have the purpose of getting me a job. It´s a narrow and important goal. Let´s begin.  

**Building Process**

**1.	HTML and CSS**

-	I started with setting up a mockup of the page, for this I used https://app.moqups.com. 
-	Next, I built the skeleton of the webpage in HTML and filled it with some lorem ipsum and mock-images. 
-	After this, I set up the CSS styles.
-	In my last project the main focus was a set of cards, for this project I decided to use cards again and this time with animation. This was a new challenge and I think it turned out well. The flipping cards make it possible to reveal some extra information in a neat matter. The animation is a hoover-animation made with HTML and CSS only. 
-	When the styling and content was ready I turned my attention to the functionality, that is the JavaScript part. 

**2.	JavaScript**

The project specification set up a few criteria for the navigation: 

-	*Navigation is built dynamically as an unordered list.*
-	*It should be clear which section is being viewed while scrolling through the page.*
-	*When clicking an item from the navigation menu, the link should scroll to the appropriate section.*

In the following sections you can follow my process of building the navigation bar. 

**Challenge 1. Navigation is built dynamically as an unordered list.**

**Step 1. Collect all section IDs**
-	Since I have the class set to “section” for all sections I decided to use .getElementsByClassName(). This method returns an HTML collection of all elements with the specified class. 
-	The method Array.from() will take an iterable object and return an array of it. So in this case take the HTML collection of the elements and return an array of the same elements. 
-	Since we only are going to use the ID´s, I used a .map() to get an new array of only the ID´s. 

**Step 2. Create one *li* with a nested *a* for each ID and add a href attribute to the *a*.**
-	I used the .forEach() method to loop thru the array of sections ID´s. 
-	For each ID I created a new list element *li*
-	For each ID I created a new hyperlink element *a*
-	I set the text in the hyperlink to the ID of the section. 
-	I set the href attribute of the hyperlink to the ID of the section. 
-	I then appended the new list item as a child to the parent element being the unorderd list with the class “navbar” and finally appended the hyperlink element to the list item. 

These two steps result in a navbar that is dynamically created and contains all the sections of the page. It is important to add the class “section” when adding a new section, otherwise it will not appear in the navbar. It is also important to choose a appropriate ID to the section as it will appear as the text on the navbar. 

**Challenge 2. It should be clear which section is being viewed while scrolling through the page.**

**Step 1. Find out which section is active in the viewport**
-	“The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.” (MDN definition)
-	I use .forEach() to loop thru the elements with the class “section” and create an array with the result. 
-	To choose the element that is in focus I decided that the section that is on top is the section in focus. 
-	Therefor I want the element that is closest to zero but not negative (>=0). If the Y coordinate is negative, the section is above the viewport. 
To accomplish this, I use the .reduce() method. “The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.” (MDN defintition). 
The source array is an array of the section Y coordinated. The function will take the current value (an Y coordinate) and run it thru the reducer function. The reducer function in this case is an if() function that will compare the current value to the accumulated value and return the value that is closest to 0 but not negative. This will result in the accumulated value being the Y coordinate of the section we seek. The coordinated was stored in an object with key: “section” value: “Y-coordinate”, to get and array of the values and to retrieve the key corresponding to the value of the top section I used  Object.values() and Object.keys(). 
We now have the active section!

**Step 2. Style the active section**
-	I added a class “active—on” for the active section (and removed it for non-active sections..). This is done by the forEach() loop that will add and remove the class via the classList.add() and classList.remove() methods. 
-	I then added a darker shade of gray for the background of the active section making in clear which section is being viewed. 

**Step 3. Style the navbar to show the active section**
-	When a section is active, the corresponding navbar-item will also have an active styling. Here a green background will appear for the active section. It is done in a similar matter as for the active section styling. 

**Challenge 3. Scroll to anchor links**
- Requirement: Implement a smooth scroll using the native JS methods.
- I added an on click eventlistener to each li element in the navbar. When the event is fired, the function prevents the event default behaviour. It then accesses the event target thru the event object. It selects the target element and then uses the scrollIntoView() method on this element with the smooth scroll setting, making the page scroll to the target element (section). 
-	An alternativ solution thru CSS is a great option if you do not wish to add the functionality thru JS. “The scroll-behavior CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation or CSSOM scrolling APIs.” (MDN definition)
The default value makes a jump to the section in the link. To make a nice scrolling effect I set the property to: scroll-behavior: smooth;

**Challenge 4. Bonus: Sticky navbar**
-	I decided to add a sticky navbar making it extra clear which section is being viewed. This is made thru adding an on-scroll-eventhandler and using the offsetTop property.
-	“The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.” (MDN definition)
-	The position of the navbar is retrieved and compared to the position of the window. If the navbar goes above the window it is given a “navbar--stick” class and a fixed position at the top. 

**That´s it. The landing page is finished, enjoy!**









