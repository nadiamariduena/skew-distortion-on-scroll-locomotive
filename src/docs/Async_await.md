# 🍌

### Check the Promises before you check this(unless you are already good with promises)

[Promises](src/docs/Promises.md)

```javascript
let location = "Google";

makeRequest(() => {
  return new Promise((resolve, reject) => {
    console.log(`making request to ${location}`);
    //
    if (location === "Google") {
      resolve("Google says hi");
    } else {
      reject("We can only talk to google");
    }
  });
});

makeRequest().then(response){
    return new Promise((resolve, reject)=>{
        console.log("Processing response")
        resolve(`Extra Information + ${response}`)
    })
}

```
