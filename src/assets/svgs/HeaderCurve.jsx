import React from "react";
import styled from "styled-components";

function HeaderCurve() {
  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        overflow: "hidden",
        top: 0,
        left: 0,
        zIndex: "0",
      }}
    >
      <SVG
        id="svg"
        viewBox="0 0 1440 2000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient" x1="1%" y1="59%" x2="99%" y2="41%">
            <stop offset="5%" stop-color="#635aff"></stop>
            <stop offset="95%" stop-color="#00f5e0" stop-opacity="0.8"></stop>
          </linearGradient>
        </defs>
        <path
          vector-effect="non-scaling-stroke"
          d="M 0,700 L 0,325 C 113.13875598086128,351.00956937799043 226.27751196172255,377.01913875598086 311,383 C 395.72248803827745,388.98086124401914 452.02870813397124,374.9330143540669 535,330 C 617.9712918660288,285.0669856459331 727.6076555023924,209.2488038277512 830,177 C 932.3923444976076,144.7511961722488 1027.5406698564593,156.0717703349282 1128,138 C 1228.4593301435407,119.92822966507178 1334.2296650717703,72.4641148325359 1440,25 L 1440,700 L 0,700 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="0.53"
          // className="curvedsvg"
          transform="rotate(-180 720 350)"
        ></path>

        <defs>
          <linearGradient id="gradient" x1="1%" y1="59%" x2="99%" y2="41%">
            <stop offset="5%" stop-color="#635aff"></stop>
            <stop offset="95%" stop-color="#00f5e0"></stop>
          </linearGradient>
        </defs>

        <path
          vector-effect="non-scaling-stroke"
          d="M 0,700 L 0,558 C 87.82775119617222,562.7464114832536 175.65550239234443,567.4928229665072 285,542 C 394.34449760765557,516.5071770334928 525.2057416267943,460.77511961722485 626,430 C 726.7942583732057,399.22488038277515 797.5215311004785,393.40669856459334 879,393 C 960.4784688995215,392.59330143540666 1052.7081339712918,397.5980861244019 1148,376 C 1243.2918660287082,354.4019138755981 1341.6459330143541,306.20095693779905 1440,258 L 1440,700 L 0,700 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="1"
          class="transition-all duration-300 ease-in-out delay-150 path-1"
          transform="rotate(-180 720 350)"
        ></path>
      </SVG>
    </div>
  );
}

export default HeaderCurve;

const SVG = styled.svg`
  width: 100%;
  height: 2000px;
`;
