import { HTMLAttributes } from "react";

import Circle from "./Circle";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ConcentricCircles = ({ children, ...rest }: Props) => {
  return (
    <div {...rest} style={{ display: "relative" }}>
      <Circle
        style={{
          width: 940,
          height: 940,
          filter: "blur(146.05447387695312px)",
          background:
            "linear-gradient(0deg, rgba(116, 45, 129, 0.8) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(82, 31, 91, 0.8) 100%)",
          zIndex: -1,
          top: 161.5,
          left: -161.5,
          position: "absolute",
        }}
      ></Circle>
      <Circle style={{ width: 617, height: 617 }}>
        <Circle style={{ width: 493, height: 493 }}>
          <Circle style={{ width: 370, height: 370 }}>
            <Circle style={{ width: 246, height: 246 }}></Circle>
          </Circle>
        </Circle>
      </Circle>
    </div>
  );
};

export default ConcentricCircles;
