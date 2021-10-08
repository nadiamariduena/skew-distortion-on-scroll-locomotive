### A promise is an object {}

> Let say we have a loadJson function, which expect a URL and then a callback(), like here below:

```javascript
loadJSON(url, callback);
```

> we may need several call backs, which is called **callback hell** see a detailed example of what call back hell is, here: [What is "callback hell"?](http://callbackhell.com/)

## What are callbacks?

> Callbacks are just the name of a convention for using JavaScript functions. There isn't a special thing called a 'callback' in the JavaScript language, **it's just a convention. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result**.

### READ MORE ABOUT CALLBACK FUNCTIONS

[callback functions](src/docs/callbacks.md)

<br>

**The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now'.** Usually callbacks are only used when doing I/O, e.g. downloading things, reading files, talking to databases, etc.

<br>
<br>
<br>
<br>

#### The reason why we will may get stuck in a callback hell...

<p>  is because we will probably need callbacks for different things like an error callback for example, then the code will be a mess because we will have sequences and different things for the success callback</p>

##### so this is what our code looks like with a callback

```javascript
loadJSON(url, callback);
```

So based on this video example [Promises Part 1](https://www.youtube.com/watch?v=QO4NXhWo_NM) (4:40), **P5 doesnt support promises** but if it did, we could say something like this:

```javascript
let promise = loadJSON(url),
```

So the idea is, that **instead of passing a function callback**\_\_\_ , **you ask a function for a promise**.

#### p5.js | loadJSON() Function

> The loadJSON() function is used to read the contents of a JSON file or URL and return it as an object. In case the file contains a JSON array, this function would still return it as an object with the index numbers specifying the different keys of the object. This method can support file sizes up to 64MB.

[READ MORE: p5.js | loadJSON() Function](https://www.geeksforgeeks.org/p5-js-loadjson-function/)

 <br>
<br>
<br>
<br>

### SO the idea is, instead of passing a function s "callback", you ask a function for a promise

In this example instead of using the loadJSON we will use **fetch** and that is because p5 dont support promises

> let promise = ~~loadJSON(url),~~

#### fetch is a fucntion native to javascript in the browser that supports promises, so FETCH gives me a promise

Once i have that promise, i have it as an object

> let promise = ~~loadJSON(url),~~

[<img src="/src/img_readme/promises_diagram.png"/>](src/docs/delta-request-animation-frame.md)

**Then** is a function that receives a function to be executed, when it has been fulfilled.

**Catch** receives a function to be executed, when it has been rejected.

#### Below:

> Is the Promise we have in the project, it relates to the error the teacher(youtube video) got.He created this to solve his error.

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


const Home = () => {

  //
  useEffect(() => {


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


```

<br>
<br>
<br>

[JavaScript Promises In 10 Minutes
](https://www.youtube.com/watch?v=DHvZLI7Db8E)

### EXAMPLES of promises

> 1. This promise will take one parameter, which is a fucntion which gets passed to variables of resolve and reject.

> 2. Now we need to create a definition of that function inside, so in step 2 I am creating a promise, the promise will be that 1+1=2 , if its true it will **resolve**, resolve is a succesful outcome, and if it fails, lets say a==3, we will **reject** it, which is a bad outcome.

##### if statement is a programming conditional statement that, if proved true, performs a function or displays information.

> 3. Anything inside **.then** is going to run for a **resolve**, because its the outcome you are going to get after you are done with the process in step 1 and 2

> 4. So **.then** takes a method, in our case its going to just have a single parameter **.then(())** to resolve, and that is going to be our **message**,
>    <u>p.then((message))</u>

```javascript
//  1
let p = new Promise((resolve, reject) => {
  //2
  let a = 1 + 1;
  // outcome:
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});
//
//
//3
// do this when it succeeds
p.then((message) => {
  console.log("This is in the then" + message);
  // do this when it fails
}).catch((message) => {
  console.log("This is in the catch" + message);
});
```

# 🍌 2 example

```javascript
// min: 7:60 https://youtu.be/DHvZLI7Db8E
const userLeft = false;
const UserWatchingCatMeme = false;

function watchTutorialPromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: "userLeft",
        message: baby_bottle,
      });
    } else if (UserWatchingCatMeme) {
      reject({
        name: "UserWatchingCatMeme",
        message: " 🐈 📺 meme ",
      });
    } else {
      resolve(" 👍 ");
    }
  });
}

watchTutorialPromise()
  .then((message) => {
    console.log("Success: " + message);
  })
  .catch((error) => {
    console.log(error.name + "" + error.message);
  });
```

# 🥥 3 example

> Lets say we want to run all the following functions in parallel, for that we can use the **Promise all**, <u>so that we dont have to wait for them to run one after another</u>

> **check the step2:** THE **<ul>Promise.all</ul>** is going to run every single one of this promises and as soon its done it going to call the **.then** , **.catch** methods depending on if they resolved or fail.

> **check the step3:** The **.then** is going to send an array of all of the successful messages

> Another option is to use **Promise.race** instead of **Promise.all**

<br>
<br>

```javascript
// STEP1
const recordVideoOne = new Promise((resolve, reject) => {
  resolve("Video 1  Recorded");
});
//
//
//
const recordVideoTwo = new Promise((resolve, reject) => {
  resolve("Video 2  Recorded");
});
//
//
//
const recordVideoThree = new Promise((resolve, reject) => {
  resolve("Video 3  Recorded");
});
//
//
// STEP 2
Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree])
  // STEP3
  .then((messages) => {
    console.log(messages);
  });
```

> **You use Promises when you know you are going to take a long time in the background, such as downloading an image from a different server**. and you just want to do something after it's complete

##### Callbacks are a long way to have the result you got with promises, that s why people use more often promises\_\_ but apparently Async await is better than PROMISES

<br>
<br>
<br>

## 🤗 Lets continue with Async Await [Async Await](src/docs/Async_await.md)

a
