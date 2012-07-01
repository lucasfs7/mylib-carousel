# Mylib Carousel Plugin

A simple carousel plugin for MyLib js library.

### How?

you must have mylib.js and mylib-carousel.js linked to your HTML document
	<pre><code>
	&lt;script type="text/javascript" src="mylib.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" src="mylib-carousel.js"&gt;&lt;/script&gt;
	</code></pre>
	
call myLibCarousel function passing the parameters you want using elements ids:
	<pre><code>
	var carouselOptions = 
    {
        carouselContainer: "carousel-container",
        carouselListContainer: "carousel-list",
        carouselList: "li",
        carouselLeftArrow: "move-left",
        carouselRightArrow: "move-right"
    };
    myLibCarousel(carouselOptions);
	</code></pre>

or using the instantiated elements
	<pre><code>
	var carouselContainer = API.getEBI("carousel-container");
	var carouselListContainer = API.getEBI("carousel-list");
	var carouselList = API.getEBTN("li", carouselListContainer);
	var carouselLeftArrow = API.getEBI("move-left");
	var carouselRightArrow = API.getEBI("move-right");
	var carouselOptions = 
    {
        carouselContainer: carouselContainer,
        carouselListContainer: carouselList,
        carouselList: carouselList,
        carouselLeftArrow: carouselLeftArrow,
        carouselRightArrow: carouselRightArrow
    };
    myLibCarousel(carouselOptions);
	</code></pre>

you can setup many other options to configure the plugin:
	<pre><code>
	opt = 
    {
         carouselContainer: [html obj or element id],
         carouselListContainer: [html obj or element id],
         carouselList: [html obj colection or tag name of items elements],
         carouselLeftArrow: [html obj or element id],
         carouselRightArrow: [html obj or element id],
         carouselEaseEffect: [mylib ease obj],
         carouselTransitionTime: [time in ms],
         carouselTransitionDistance: [distance from 1 item to another],
         carouselTriggerEvent: [event to arrows (click, mouseover)]
    };
	</code></pre>