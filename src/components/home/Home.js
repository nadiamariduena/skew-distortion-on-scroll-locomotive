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

      // ________ The transforming of the images ________

      leftColumnRef.current.style.transform = `skewY(${distance}deg)`;
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
