import { PropaneSharp } from "@suid/icons-material";
import source from "./car.png";
import { createMemo } from "solid-js";

const CarImg = (props) => {
  const leftPos = createMemo(() => {
    let left = 10;
    if (props.scrollPos) {
      left = left + (props.scrollPos * 0.02);
    }
    return `${left}%`
  })
  return <img src={source} alt="Car" style={{
    "position": "absolute",
    "top": 0,
    "left": leftPos(),
    "transform": "translate(-100%, -25%)",
    height: '128px',
    width: '128px',
    opacity: 0.5,
    "z-index": 1,
 }}/>;
};

export default CarImg;