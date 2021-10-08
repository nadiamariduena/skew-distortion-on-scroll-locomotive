# CREDITS:

Big thanks to **[
Nicu Barbaros](https://github.com/nicubarbaros)** , for sharing this **Great tutorial** on how to get started with Locomotive scroll

[Awwwards Remake | Skew Distortion Effect on Scroll Using Locomotive Scroll & React
](https://youtu.be/8TnD-g3AMjk)

## START by installing all the dependencies 🚀

<p> If you have issues with copying and pasting the dependencies from the json package, delete the node modules and install it again, as the scss package can cause problems, sometimes you have to install it separately from all the other dependencies (you have to leave it like so "node-sass": "^4.14.1", then paste this on the console npm install node-sass@4.14.1, as if you remove the package it wont work, unless it didnt for me) </p>

#### before start:

###### READ MORE ABOUT CALLBACK FUNCTIONS

[callback functions](src/docs/callbacks.md)

###### READ MORE ABOUT PROMISES

[callback functions](src/docs/Promises.md)

```javascript
//  <u>*underline text</u>
// git markdown:
// https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
//
//
// 1 if you already installed it and it caused issues
npm uninstall node-sass
// 2
npm install node-sass@4.14.1
//  https://stackoverflow.com/questions/64625050/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0
npm i imagesloaded
npm i locomotive-scroll
npm i gsap
```

## ONCE IT'S ready 🍌

> ADD A home folder inside the components folder, inside of it add a file and call it Home.js

> this is the basic

```javascript
import React, { useState } from "react";
import photos from "../../data";
//
//
//

const Home = () => {
  return (
    <div className="main-container" id="main-container">
      <div className="grid-wrap">
        <div className="left-column"></div>
        <div className="middle-column"></div>
        <div className="right-column"></div>
      </div>
    </div>
  );
};

export default Home;
```

#### Add the data file inside the src folder and call it data.js

```javascript
// you have "Block 15", in total so check the data, as if you have less than that the following step will not work as desired
//
const photos = [
  {
    url:
      "https://images.unsplash.com/photo-1622901120958-ae569882629c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    description: "Block 1",
  },
  {
    url:
      "https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80",
    description: "Block 2",
  },
  {
    url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    description: "Block 3",
  },
];
export default photos;
```

#### Next we will get the photos and split them in Chunks

```javascript

 // the splice will handle how many images you will have in each row
  const leftChunk = photos.splice(0, 5);
  const middleChunk = photos.splice(5, 5);
  const rightChunk = photos.splice(10, 5);
  /*

```

# .SPLICE 🥥

> **The Array.splice() method adds array elements**
> the splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. To access part of an array without modifying it, see slice().

> READ MORE ABOUT SPLICE:
> [Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

#### Add each chunk to the correspondent block

```javascript
const Home = () => {
  //
  //
  const leftChunk = photos.splice(0, 5);
  const middleChunk = photos.splice(5, 5);
  const rightChunk = photos.splice(10, 5);
  /*




  */
  return (
    <div className="main-container" id="main-container">
      <div className="grid-wrap">
        {/*


        */}
        <div className="left-column">
          {leftChunk.map(({ url, description }, index) => (

          ))}
        </div>
        {/*


        */}
        <div className="middle-column"></div>
        {/*


        */}
        <div className="right-column"></div>
      </div>
    </div>
  );
};

export default Home;
```

> You will have an error but dont worry

#### CREATE A NEW COMPONENT

```javascript
// type rfc (you need to have the react snippets installed for this to work)
import React from "react";

export default function GridItem() {
  return <div></div>;
}
```

#### You need to pass through (props) the data from the the other file here, as this file will contain the image, the other file is the wrapper.

```javascript
import React from "react";

export default function GridItem({ url, description }) {
  return (
    <div className="grid-item">
      <img className="grid-item-media" src={url} />
      <p>{description}</p>
    </div>
  );
}
```

#### Now import the grid to the home component (wrapper)

```javascript
import React, { useState } from "react";
import photos from "../../data";
import GridItem from "../gridItem/GridItem";
//
//
//

const Home = () => {
  //
  // the splice will handle how many images you will have in each row
  const leftChunk = photos.splice(0, 5);
  const middleChunk = photos.splice(5, 5);
  const rightChunk = photos.splice(10, 5);
  /*
  The Array.splice() method adds array elements
  READ MORE ABOUT SPLICE:
  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_splice
  
  
  */
  return (
    <div className="main-container" id="main-container">
      <div className="grid-wrap">
        {/* 
        
        
        */}
        <div className="left-column">
          {leftChunk.map(({ url, description }, index) => (
            //   in the key you can add an id inside the file containing the images, and here adding it like so: key={id}
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>

        <div className="middle-column"></div>

        <div className="right-column"></div>
      </div>
    </div>
  );
};

export default Home;
```

### All that to have a cleaner code

> So i went to the other file and i created some container to nest the image and the paragraph, i passed the data from the photos **import photos from "../../data";** and then i went back to the home to initialize it so that it shows the imgs on the browser: **<GridItem key={url} url={url} description={description} />**

> Now you can see the images but there s an issue when refreshing, it disappears somehow, you have to save (strg+s) to relaunch the imgs

## Now add the same data to the other chunks

```javascript
import React, { useState } from "react";
import data from "../../data";
import GridItem from "../gridItem/GridItem";
//
//
//

const Home = () => {
  //
  //
  const leftChunk = photos.splice(0, 5);
  console.log(photos);
  //
  const middleChunk = photos.splice(5, 5);
  const rightChunk = photos.splice(10, 5);

  return (
    <div className="main-container" id="main-container">
      <div className="grid-wrap">
        <div className="left-column">
          {leftChunk.map(({ url, description }, index) => (
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>

        <div className="middle-column">
          {middleChunk.map(({ url, description }, index) => (
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>

        <div className="right-column">
          {rightChunk.map(({ url, description }, index) => (
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
```

## At this point you should see the images (most of the text is under the images) thats why I will add some styles.

> You can either add the styles inside the folder gridItem, or add it inside the scss styles and then import the file inside the main.scss, i choose the last one

[<img src="/src/img_readme/imgaes_grid_styles.jpg"/>](src/docs/delta-request-animation-frame.md)

```scss
.grid-item {
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    // The aspect-ratio  CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
  }

  margin-bottom: 20px;
  //
  //
  p {
    margin-top: 15px;
    font-size: 24px;
    text-transform: uppercase;
    text-align: right;
  }
}
```

> **The aspect-ratio** CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.
> [The aspect-ratio CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) > <br>

#### So after this you should normally have the 3 columns of images side by side.

#### 🔴 issue

> It showed just one column and it was because of this:

```javascript
// before
const leftChunk = photos.splice(0, 5);
console.log(photos);
//
const middleChunk = photos.splice(5, 5);
const rightChunk = photos.splice(10, 5);
//
//
//
//
// after
const leftChunk = [...photos].splice(0, 5);
console.log(photos);
//
const middleChunk = [...photos].splice(5, 5);
const rightChunk = [...photos].splice(10, 5);
```

#### solved

[<img src="/src/img_readme/3columns_grid.jpg"/>](src/docs/delta-request-animation-frame.md)

<br>
<br>
<br>

# 🍌 🐒

## LOCOMOTIVE SCROLL

> **Locomotive scroll is a simple scroll library**, built as a layer on top of ayamflow’s virtual-scroll, it provides smooth scrolling with support for parallax effects, toggling classes, and triggering event listeners when elements are in the viewport.

> In other words, **it detects when elements are in the viewport and then alters CSS transform property values on those elements to create scrolling effects**.

#### Here’s how it works

> Locomotive Scroll works primarily through specific attributes in the HTML. Elements with these attributes trigger event listeners in JavaScript when they are in the viewport, then apply CSS transform values as inline styles.

<br>

> There are **two key attributes to always call upon Locomotive**:

- **data-scroll**: detects whether or not an element is in the viewport
- **data-scroll-container**: wraps all the HTML content you want to watch for scrolling

<br>

[READ MORE | How to Use the Locomotive Scroll for all Kinds of Scrolling Effects ](https://css-tricks.com/how-to-use-the-locomotive-scroll-for-all-kinds-of-scrolling-effects/)

#### more options

```javascript
Element attributes
Attribute	Values	Description
data-scroll		Detect if in-view.
data-scroll-id	string	(Optional) Useful if you want to scope your element and get the progress of your element in the viewport for example.
data-scroll-container		Defines the scroll container. Required for basic styling.
data-scroll-section		Defines a scrollable section. Splitting your page into sections may improve performance.
data-scroll-class	string	Element in-view class.
data-scroll-offset	string	Element in-view trigger offset : bottom,top
First value is bottom offset, second (optional) is top offset.
Percent is relative to viewport height, otherwise it's absolute pixels.
E.g. "10", "100,50%", "25%, 15%"
data-scroll-repeat	boolean	Element in-view detection repeat.
data-scroll-call	string	Element in-view trigger call event.
data-scroll-position	string	top, bottom, left or right
Window position of in-view trigger.
data-scroll-speed	number	Smooth only
Element parallax speed. A negative value will reverse the direction.
data-scroll-delay	number	Smooth only
Element's parallax lerp delay.
data-scroll-direction	string	Smooth only
Element's parallax direction. vertical or horizontal
data-scroll-sticky		Smooth only
Sticky element. Starts and stops at data-scroll-target position.
data-scroll-target	string	Smooth only
Target element's in-view position.

```

[<img src="/src/img_readme/locomotive_options.gif"/>](https://www.youtube.com/watch?v=D-vYtfcz0NI)

> min:10:58

[Locomotive Scroll (Smooth Scrolling) in Webflow](https://www.youtube.com/watch?v=D-vYtfcz0NI)

#### the data-scroll-container is what the tutorial will be using but i personally want to try something that allows me more space from the bottom and the top, so will be using perhaps data-scroll-offset, i still dont know if it s the correct choice but i will see.

<br>
<br>

> **START by adding** a Ref default and a ref to each of the 3 column chunks

### 1

```javascript
// add the useRef here:
import React, { useState, useRef } from "react";

//
//
//
const Home = () => {
  //
  // Assign an unique Ref for each, set it up to null
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
```

### 2

```javascript
// const ref = useRef(null); add it here below like so:  ref={ref}
<div className="main-container" id="main-container" ref={ref}>
  <div className="grid-wrap">
    //leftColumnRef add it here below like so: ref={leftColumnRef}
    <div className="left-column" ref={leftColumnRef}>
      {leftChunk.map(({ id, url, description }, index) => (
        <GridItem key={id} url={url} description={description} />
      ))}
    </div>
    <div className="middle-column" ref={middleColumnRef}>
      {middleChunk.map(({ id, url, description }, index) => (
        <GridItem key={id} url={url} description={description} />
      ))}
    </div>
    <div className="right-column" ref={rightColumnRef}>
      {rightChunk.map(({ id, url, description }, index) => (
        <GridItem key={id} url={url} description={description} />
      ))}
    </div>
  </div>
</div>
```

#### IMPORT THE LOCOMOTIVE SCROLL AND INITIATE IT

```javascript
import React, { useState, useRef, useEffect } from "react";
//
//
import LocomotiveScroll from "locomotive-scroll";
//

const Home = () => {
  //
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  //
  //
  // basic set up
  useEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [input]);
```

### First steps initiation

```javascript

const Home = () => {
  //
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  //
  //
  //
  useEffect(() => {
    const scrollElement = new LocomotiveScroll({
      // ------ object
      el: ref.current,
      smooth: true,
      // to work on mobile
      smartphone: {
        smooth: true,
      },
      // here I  get the direction for the scroll
      getDirection: true,
      //  and the speed (how much i will scroll)
      getSpeed: true,
    });
  }, []);
  //
  //
  //
  // how many images you want in each row
  const leftChunk = [...photos].splice(0, 5);
  console.log(photos);
  //
  const middleChunk = [...photos].splice(5, 5);
  const rightChunk = [...photos].splice(10, 5);
  /*




  */
  return (
    <div
      className="main-container"
      id="main-container"
      data-scroll-container  //**** important!!!
      ref={ref}
    >
      <div className="grid-wrap">
        {/*

- **data-scroll-container**: wraps all the HTML content you want to watch for scrolling
     */}
```

#### the data-scroll-container

> Will tell the locomotive which element is the parent

<br>

### THE SCROLL STYLES 🥥

> Once you will add the following line, you will notice the smooth scrolling

```javascript
import "locomotive-scroll/src/locomotive-scroll.scss";
```

##### You dont have to code anything, the styles comes with the package locomotive

[<img src="/src/img_readme/locomotive_styles.gif"/>](src/docs/delta-request-animation-frame.md)

<br>

##### The scroll is working smooth(due to the speed on the video, you cant really see it). So i tested the scroll with and without the styles, in the second, you can really notice a huge space on the bottom.

[<img src="/src/img_readme/locomotive_styles2.gif"/>](src/docs/delta-request-animation-frame.md)

### So what we have until now:

```javascript
import React, { useState, useRef, useEffect } from "react";
import photos from "../../data";
import GridItem from "../gridItem/GridItem";
import "locomotive-scroll/src/locomotive-scroll.scss";
//
//
import LocomotiveScroll from "locomotive-scroll";
//

const Home = () => {
  //
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  //
  //
  //
  useEffect(() => {
    const scrollElement = new LocomotiveScroll({
      // ------ object
      el: ref.current,
      smooth: true,
      // to work on mobile
      smartphone: {
        smooth: true,
      },
      // here I  get the direction for the scroll
      getDirection: true,
      //  and the speed (how much i will scroll)
      getSpeed: true,
    });
  }, []);
  //
  //
  //
  // how many images you want in each row
  const leftChunk = [...photos].splice(0, 5);
  console.log(photos);
  //
  const middleChunk = [...photos].splice(5, 5);
  const rightChunk = [...photos].splice(10, 5);
  /*
  
  
  
  
  */
  return (
    <div
      className="main-container"
      id="main-container"
      data-scroll-container
      ref={ref}
    >
      <div className="extra">
        <h1>hello</h1>
      </div>

      <div className="grid-wrap">
        {/* 
     I added the id  to the kew to the 3 blocks to prevent that error
     
     */}
        <div className="left-column" ref={leftColumnRef}>
          {leftChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>

        <div className="middle-column" ref={middleColumnRef}>
          {middleChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>

        <div className="right-column" ref={rightColumnRef}>
          {rightChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
```

<br>

## Now lets use the imagesLoaded dependency 🥥

for the images you will need promises, i still dont know why is he usng this since for me that images loaded correctly from the first try and for him not, but if he wants to add it just to be sure that if there is any error it will launch some sort of message, then yes.

# 🚀

## refreshing my memory: What are Promises?

[READ MORE](src/docs/Promises.md)

#### 1

> CREATE THE FUNCTION
> You will pass the css DOM **selector**

```javascript
// IMPORT IT
import imagesLoaded from "imagesloaded";
import LocomotiveScroll from "locomotive-scroll";
//
//
// CREATE THE FUNCTION
//  You will pass the css DOM selector
const preloadImages = (selector) => {
  // the resolve will be pass as the promise
  return new Promise((resolve) => {
    imagesLoaded(
      // it will take 3 parameter
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

/*


 *
 */
const Home = () => {
```

#### 2

##### Now go to the UseEffect and pass the "promise" that you just created "preloadImages"

> Inside the useEffect pass the **promiseAll**, inside the array add the **preloadImages** you created on top, ALSO, grab the className that is nesting the images in the **GridItem.jsx** file and add it to the promiseAll **([preloadImages(".grid-item-media")])**, all of them will be loaded, add also a callback **then(() => { });**

```javascript
    //
    //
    Promise.all([preloadImages(".grid-item-media")]).then(() => {
      scrollElement.update();
    });
    //
  }, []);
  //
```

<br>
<br>

# 🥥

### Now lets listen to the scroll event to do some stuff

```javascript
scrollElement.on("scroll", (obj) => {
  // here you need to pass something
});
```

#### but before create another ref (to keep up the previous scroll/or cache and the current scroll position), all this to avoid UPDATING the state and update or re-rendering the component.

> We will use the reference, because the reference doesn't make the component to update

```javascript
  //
  //
  const scroll = useRef({
    // the initial scroll is supposed to be 0, if the user doesnt do anything
    cache: 0,
    current: 0,
  });
  //
  //
  //
  useEffect(() => {

    //
    // more data here ...

      //
    scrollElement.on("scroll", (obj) => {
      scroll.current.current = obj.scroll.y;
      // compute the distance from the current to the previous
      const distance = scroll.current.current - scroll.current.cache;
      // Then we will need to update the cache with the current scroll
      scroll.current.cache = scroll.current.current;
    });
    //
```

<br>
<br>
<br>

# UNTIL here it was all about the locomotive scroll

```javascript
import React, { useState, useRef, useEffect } from "react";
import photos from "../../data";
import GridItem from "../gridItem/GridItem";
import "locomotive-scroll/src/locomotive-scroll.scss";
//
//
import imagesLoaded from "imagesloaded";
import LocomotiveScroll from "locomotive-scroll";
//
//  You will pass the css DOM selector
const preloadImages = (selector) => {
  // the resolve will be pass as the promise
  return new Promise((resolve) => {
    imagesLoaded(
      // it will take 3 parameter
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

/*


 *
 */
const Home = () => {
  //
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  //
  //
  //
  const scroll = useRef({
    // the initial scroll is supposed to be 0, if the user doesnt do anything
    cache: 0,
    current: 0,
  });
  //
  //
  //
  useEffect(() => {
    const scrollElement = new LocomotiveScroll({
      // ------ object
      el: ref.current,
      smooth: true,
      // to work on mobile
      smartphone: {
        smooth: true,
      },
      // here I  get the direction for the scroll
      getDirection: true,
      //  and the speed (how much i will scroll)
      getSpeed: true,
    });
    //
    //
    //
    scrollElement.on("scroll", (obj) => {
      scroll.current.current = obj.scroll.y;
      // compute the distance from the current to the previous
      const distance = scroll.current.current - scroll.current.cache;
      // Then we will need to update the cache with the current scroll
      scroll.current.cache = scroll.current.current;
    });
    //
    //
    //
    Promise.all([preloadImages(".grid-item-media")]).then(() => {
      scrollElement.update();
    });
    //
  }, []);
  //
  //
  //
  // how many images you want in each row
  const leftChunk = [...photos].splice(0, 5);
  console.log(photos);
  //
  const middleChunk = [...photos].splice(5, 5);
  const rightChunk = [...photos].splice(10, 5);

  /*




  */
  return (
    <div
      className="main-container"
      id="main-container"
      data-scroll-container
      ref={ref}
    >
      <div className="extra1">
        <h1>hello</h1>
      </div>
      <div className="grid-wrap">
        {/*
     I added the id  to the kew to the 3 blocks to prevent that error

     */}
        <div className="left-column" ref={leftColumnRef}>
          {leftChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>

        <div className="middle-column" ref={middleColumnRef}>
          {middleChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>

        <div className="right-column" ref={rightColumnRef}>
          {rightChunk.map(({ id, url, description }, index) => (
            <GridItem key={id} url={url} description={description} />
          ))}
        </div>
      </div>

      <div className="extra1">
        <h1>hello</h1>
      </div>
      <div className="extra2">
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default Home;
/*

styles


*/
// _grid-Item-styles.scss
.grid-item {
  background-color: green;
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
  }
  margin-top: 70px;
  margin-bottom: 20px;
  //
  //
  p {
    margin-top: 15px;
    font-size: 24px;
    text-transform: uppercase;
    text-align: right;
  }
}
// the _main.scss
@import "_grid-Item-styles.scss";

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  outline: none;
  // CURSOR DEFAULT NONE
  // cursor: none;
}
/* ---------BAR STYLES------- */

// THE ERROR IN THIS FILE COMES FROM HERE********
body::-webkit-scrollbar {
  width: 1rem;
}
body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(248, 248, 248);
}
//   background-color: rgb(248, 248, 248);
body::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  outline: none;
  border-radius: 50px;
}

/* ---------BAR STYLES------- */

body {
  overflow-x: hidden;
  background-color: #edebe4;
  // rgb(248, 248, 248) original,matte white
  //  background-color: #002200; //emeraude
  // ------------
  // ------------
  // ------------
  // ------------
}
.page {
  display: flex;
  flex-wrap: wrap;
}

.extra1 {
  background-color: pink;
  margin-top: 70px;
  margin-bottom: 20px;
  //  i notice the scroll dont function
  // correctly when i add a height of 50vh for example
  // but if i add a padding top and bottom it s okay
  padding: 50vh 0;
}
.extra2 {
  background-color: rgb(255, 195, 104);
  margin-top: 70px;
  margin-bottom: 20px;
  //  i notice the scroll dont function
  // correctly when i add a height of 50vh for example
  // but if i add a padding top and bottom it s okay
  padding: 50vh 0;
}

.grid-wrap {
  display: grid;
  grid-template-columns: repeat(3, 20%);
  gap: 5%;
  justify-content: center;
  margin: 0 auto;
}
```

<br>
<br>
<br>

# 🍌🍌 **_THE SKEW_** 🍌🍌

### Now I will proceed to "Transform" the images

> the images will SKEW a bit when the user will launch the scroll

```javascript
   // ________ The transforming of the images ________

      leftColumnRef.current.style.transform = `skewY(${distance}deg)`;
    });
    // dont forget to add the deg otherwise it will not work!!
```

##### Dont forget to add the deg otherwise it will not work!!

[<img src="/src/img_readme/locomotive_skew1.gif"/>]()

#### But if you notice, its a bit too much, so to clamp the value or reduce the strength we will have to CREATE a small function:

```javascript
/*

      The following clamp** function
      is related to the skew, since
      its a bit too strong when scrollinh, this function
      will serve to control the amount of the 
      skew on the images.
 
 */

const clamp = (value, min, max) =>
  // if the value is sm or equal to min then we return minimum,
  // BUT if the value is greater or equel to max we return maximum ,
  // OR else we return the value
  value <= min ? min : value >= max ? max : value;

//
```

#### now replace the following in the useEffect

```javascript
//
  // ________ The transforming of the images ________
  console.log(distance);
  // replace this: leftColumnRef.current.style.transform = `skewY(${distance}deg)`;
  // for this:
  leftColumnRef.current.style.transform = `skewY(${clamp(
    distance,
    -10,
    10
  )}deg)`;
});
// You can play with the clamp value, lets say add -5, 5, this is less of course or -20, 20 this is more
//
//
```
