import React from "react";

export default function GridItem({ url, description }) {
  return (
    <div className="grid-item">
      <img className="grid-item-media" src={url} alt="" />
      <p>{description}</p>
    </div>
  );
}
