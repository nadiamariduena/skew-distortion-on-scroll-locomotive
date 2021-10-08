# 🍌

#credits:

[Callback Hell](http://callbackhell.com/)

## What are callbacks?

> Callbacks are just the name of a convention for using JavaScript functions. There isn't a special thing called a 'callback' in the JavaScript language, **it's just a convention. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result**.

<br>

**The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now'.** Usually callbacks are only used when doing I/O, e.g. downloading things, reading files, talking to databases, etc.

When you call a normal function you can use its return value:

```javascript
var result = multiplyTwoNumbers(5, 10);
console.log(result);
// 50 gets printed out
```

#### However, functions that are async and use callbacks don't return anything right away.

```javascript
var photo = downloadPhoto("http://coolcats.com/cat.gif");
// photo is 'undefined'!
```

###### _In this case the gif might take a very long time to download, and you don't want your program to pause (aka 'block') while waiting for the download to finish._

**Instead, you store the code that should run after the download is complete in a function.** This is the callback! You give it to the downloadPhoto function and it will run your callback (e.g. 'call you back later') when the download is complete, and pass in the photo (or an error if something went wrong).

```javascript
downloadPhoto("http://coolcats.com/cat.gif", handlePhoto);

function handlePhoto(error, photo) {
  if (error) console.error("Download error!", error);
  else console.log("Download finished", photo);
}

console.log("Download started");
```

The biggest hurdle people have when trying to understand callbacks is understanding the order that things execute as a program runs.

In this example three major things happen. First the **handlePhoto** function is declared, then the **downloadPhoto** function is invoked and passed the handlePhoto as its callback, and finally 'Download started' is printed out.

**Note that the handlePhoto is not invoked yet,** <u>_it is just created and passed as a callback into downloadPhoto. But it won't run until downloadPhoto finishes doing its task_</u> , which could take a long time depending on how fast the Internet connection is.

```javascript
downloadPhoto("http://coolcats.com/cat.gif", handlePhoto);

function handlePhoto(error, photo) {
  if (error) console.error("Download error!", error);
  else console.log("Download finished", photo);
}

console.log("Download started");
```

###### This example is meant to illustrate two important concepts:

<br>

- **The handlePhoto callback is just a way to store some things to do at a later time**

<br>

- **The order in which things happen <u>_does not read top-to-bottom_,</u> it jumps around based on when things complete**

<br>
<br>

# 🥥 🌴

### How do I fix callback hell?

**Callback hell is caused by poor coding practices.** Luckily writing better code isn't that hard!

You only need to follow three rules:

## 1. <u>Keep your code shallow</u>

##### Here is some messy browser JavaScript that uses browser-request to make an AJAX request to a server:

```javascript
var form = document.querySelector("form");
//
//
form.onsubmit = function (submitEvent) {
  //
  var name = document.querySelector("input").value;
  //
  //
  request(
    {
      url: "http://example.com/upload",
      body: name,
      method: "POST", //Post is secure / GET is for tests or nothing to do with passing sensitive data
    },
    //
    // (err, response, body) these are arguments in a function
    // you will need these arguments inside the function (which by the way is anonymous because it has no name), as you can see it:   function (err, response, body)
    function (err, response, body) {
      var statusMessage = document.querySelector(".status");
      if (err) return (statusMessage.value = err);
      statusMessage.value = body;
    }
  );
};
```

<br>

#### This code has two anonymous functions. Let's give em names!

```javascript
var form = document.querySelector("form");
//
// here you will name the anonymous function, function formSubmit, compare the previous example above
form.onsubmit = function formSubmit(submitEvent) {
  //
  var name = document.querySelector("input").value;
  //
  request(
    {
      url: "http://example.com/upload",
      body: name,
      method: "POST",
    },
    // here you will name the anonymous function,  function postResponse, compare the previous example above
    function postResponse(err, response, body) {
      //
      var statusMessage = document.querySelector(".status");
      //
      if (err) return (statusMessage.value = err);
      statusMessage.value = body;
    }
  );
};
```

<br>

#### As you can see naming functions is super easy and has some immediate benefits:

- makes code easier to read thanks to the descriptive function names

<br>

- when exceptions happen you will get stacktraces that reference actual function names instead of "anonymous"

<br>

- <u>allows you to move the functions and reference them by their names</u>

<br>

### Now we can move the functions to the top level of our program:

```javascript
// _______________AFTER_____________________
//
document.querySelector("form").onsubmit = formSubmit;

function formSubmit(submitEvent) {
  var name = document.querySelector("input").value;
  request(
    {
      url: "http://example.com/upload",
      body: name,
      method: "POST",
    },
    postResponse
  );
}

function postResponse(err, response, body) {
  var statusMessage = document.querySelector(".status");
  if (err) return (statusMessage.value = err);
  statusMessage.value = body;
}
// _______________BEFORE_____________________
//
var form = document.querySelector("form");
//
// here you will name the anonymous function, function formSubmit, compare the previous example above
form.onsubmit = function formSubmit(submitEvent) {
  //
  var name = document.querySelector("input").value;
  //
  request(
    {
      url: "http://example.com/upload",
      body: name,
      method: "POST",
    },
    // here you will name the anonymous function,  function postResponse, compare the previous example above
    function postResponse(err, response, body) {
      //
      var statusMessage = document.querySelector(".status");
      //
      if (err) return (statusMessage.value = err);
      statusMessage.value = body;
    }
  );
};
```

#### Note that the function declarations here are defined at the bottom of the file. This is thanks to function hoisting.

## 2. <u> Modularize</u>

This is the most important part: **Anyone is capable of creating modules (aka libraries). To quote Isaac Schlueter (of the node.js project): "Write small modules that each do one thing, and assemble them into other modules that do a bigger thing.** You can't get into callback hell if you don't go there."

Let's take out the boilerplate code from above and turn it into a module by splitting it up into a couple of files. I'll show a module pattern that works for either browser code or server code (or code that works in both):

##### Here is a new file called formuploader.js that contains our two functions from before:

```javascript
// form uploader
module.exports.submit = formSubmit;

function formSubmit(submitEvent) {
  var name = document.querySelector("input").value;
  request(
    {
      url: "http://example.com/upload",
      body: name,
      method: "POST",
    },
    postResponse
  );
}

function postResponse(err, response, body) {
  var statusMessage = document.querySelector(".status");
  if (err) return (statusMessage.value = err);
  statusMessage.value = body;
}
```

# 🍌

**The module.exports bit** is an example of the node.js module system which works in node, Electron and the browser using browserify. <u>I quite like this style of modules because it works everywhere, is very simple to understand and doesn't require complex configuration files or scripts.</u>

> Now that we have **formuploader.js** (and it is loaded in the page as a script tag after being browserified) **we just need to require it and use it!** Here is how our application specific code looks now:

```javascript
var formUploader = require("formuploader");
document.querySelector("form").onsubmit = formUploader.submit;
```

#### Now our application is only two lines of code and has the following benefits:

> **easier for new developers to understand** -- they won't get bogged down by having to read through all of the formuploader functions
> formuploader can get used in other places without duplicating code and can easily be shared on github or npm

<br>

## 3. <u> Handle every single error</u>

> There are different types of errors: syntax errors caused by the programmer (usually caught when you try to first run the program), runtime errors caused by the programmer <u>(the code ran but had a bug that caused something to mess up),</u> platform errors caused by things like <u>invalid file permissions, hard drive failure, no network connection etc.</u>

###### This section is only meant to address this last class of errors.

> **The first two rules are primarily about making your code readable, but this one is about making your code stable.** When dealing with callbacks you are by definition dealing with tasks that get dispatched, go off and do something in the background, and then complete successfully or abort due to failure. Any experienced developer will tell you that you can never know when these errors happen, so you have to plan on them always happening.

# 🍉 🍌

##### With callbacks the most popular way to handle errors is the Node.js style where the first argument to the callback is always reserved for an error

```javascript
var fs = require("fs");

fs.readFile("/Does/not/exist", handleFile);

function handleFile(error, file) {
  if (error) return console.error("Uhoh, there was an error", error);
  // otherwise, continue on and use `file` in your code
}
```

**What is fs in node?**

> The built-in Node. js file system module helps us store, access, and manage data on our operating system. Commonly used features of the fs module include fs. readFile to read data from a file, fs.

<br>

#### Having the first argument be the error is a simple convention that encourages you to remember to handle your errors. If it was the second argument you could write code like function handleFile (file) { } and more easily ignore the error.

> Code linters can also be configured to help you remember to handle callback errors. The simplest one to use is called standard. All you have to do is run $ standard in your code folder and it will show you every callback in your code with an unhandled error.

<br>

#### Summary

- **Don't nest functions**. Give them names and place them at the top level of your program

<br>

- **Use function [hoisting](https://gist.github.com/maxogden/4bed247d9852de93c94c)** to your advantage to move functions 'below the fold'

<br>

- Handle every single error in every one of your callbacks. Use a linter like standard to help you with this.

<br>

- Create reusable functions and place them in a module to reduce the cognitive load required to understand your code. Splitting your code into small pieces like this also helps you handle errors, write tests, forces you to create a stable and documented public API for your code, and helps with refactoring.

[Continue reading](http://callbackhell.com/)
