import React from "react";
import Svg, { Path, G } from "react-native-svg";
import { TextStyle } from "react-native";

import { constants } from "~/style/constants";

export interface IconProps {
  name:
    | "check-box"
    | "check-box-blank"
    | "account"
    | "plus"
    | "arrow-left"
    | "email-outline"
    | "dashboard"
    | "list"
    | "search"
    | "filter"
    | "location"
    | "share"
    | "chevron-down"
    | "chevron-up"
    | "chevron-right"
    | "three-dots"
    | "edit"
    | "send"
    | "radio-button-off"
    | "radio-button-on"
    | "cancel"
    | "trash-can-outline"
    | "question-mark"
    | "text"
    | "logout";

  color?: string;
  size?: number;
  style?: TextStyle;
}

export function Icon({
  name,
  color = constants.colorTextLight,
  size = 28,
}: IconProps) {
  if (name === "check-box") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "check-box-blank") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "account") {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 12h6a5 5 0 015 5 1 1 0 01-1.993.117l-.012-.293a3 3 0 00-2.819-2.819L13 14H7a3 3 0 00-3 3 1 1 0 11-2 0 5 5 0 014.783-4.995L7 12h6-6zm3-10a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "plus") {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2a1 1 0 00-1 1v6H3a1 1 0 000 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "arrow-left") {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 10a1 1 0 00-1-1H5.414l2.293-2.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L5.414 11H17a1 1 0 001-1z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "list") {
    const aspectRatio = 16 / 12;
    const width = size;
    const height = width / aspectRatio;

    return (
      <Svg width={width} height={height} viewBox="0 0 16 12" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 10a1 1 0 110 2H1a1 1 0 110-2h14zm0-5a1 1 0 110 2H1a1 1 0 010-2h14zm0-5a1 1 0 110 2H1a1 1 0 010-2h14z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "search") {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.2 1.6a5.6 5.6 0 014.48 8.96l.044.035.042.04 2.4 2.4a.8.8 0 01-1.056 1.197l-.076-.066-2.4-2.4a.808.808 0 01-.075-.087A5.6 5.6 0 117.2 1.6zm0 1.6a4 4 0 100 8 4 4 0 000-8z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "filter") {
    const aspectRatio = 15 / 16;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 16 15" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 8.645c1.306 0 2.418.835 2.83 2H15a1 1 0 110 2l-4.171.001a3.001 3.001 0 01-5.658 0H1a1 1 0 110-2h4.17a3.001 3.001 0 012.83-2zm0 2a1 1 0 100 2 1 1 0 000-2zm5-10a3 3 0 11-2.829 4.001H1a1 1 0 110-2h9.17a3.001 3.001 0 012.83-2zm0 2a1 1 0 100 2 1 1 0 000-2z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "location") {
    const aspectRatio = 10 / 12;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 10 12" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 0c2.754 0 5 2.378 5 5.328 0 1.716-1.487 3.88-4.685 6.425L5 12C1.584 9.349 0 7.099 0 5.328 0 2.378 2.246 0 5 0zm0 3a2 2 0 100 4 2 2 0 000-4z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "share") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 2a4 4 0 11-2.954 6.697L10 11.58v.84l5.046 2.883a4 4 0 11-.938 1.769L9.27 14.305a4 4 0 110-4.611l4.84-2.766A4 4 0 0118 2zm0 14a2 2 0 100 4 2 2 0 000-4zM6 10a2 2 0 100 4 2 2 0 000-4zm12-6a2 2 0 100 4 2 2 0 000-4z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "chevron-down") {
    const aspectRatio = 12 / 7;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 12 7" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.293.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5A1 1 0 011.707.293L6 4.586 10.293.293z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "chevron-up") {
    const aspectRatio = 12 / 7;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 12 7" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.293 6.707a1 1 0 101.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 001.414 1.414L6 2.414l4.293 4.293z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "chevron-right") {
    const aspectRatio = 12 / 7;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.293726 10.2933C-0.0972733 10.6842 -0.0972733 11.3162 0.293726 11.7072C0.684726 12.0982 1.31673 12.0982 1.70773 11.7072L6.70773 6.70725C7.09873 6.31625 7.09873 5.68425 6.70773 5.29325L1.70773 0.29325C1.31673 -0.09775 0.684726 -0.09775 0.293726 0.29325C-0.0972733 0.68425 -0.0972733 1.31625 0.293726 1.70725L4.58673 6.00025L0.293726 10.2933Z"
          fill="#1A1A1A"
        />
      </Svg>
    );
  }

  if (name === "three-dots") {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 14a2 2 0 110 4 2 2 0 010-4zm0-6a2 2 0 110 4 2 2 0 010-4zm0-6a2 2 0 110 4 2 2 0 010-4z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "edit") {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 13L2 10C2 9.73478 2.10536 9.48043 2.29289 9.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711L6.70711 13.7071C6.51957 13.8946 6.26522 14 6 14L3 14C2.44772 14 2 13.5523 2 13ZM10 4.41421L4 10.4142L4 12H5.58579L11.5858 6L10 4.41421Z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "send") {
    const aspectRatio = 24 / 20;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 24 20" fill="none">
        <Path
          d="M22.34 8.643l-.007-.003L2.313.336a1.104 1.104 0 00-1.04.102 1.155 1.155 0 00-.523.965v5.31a1.125 1.125 0 00.915 1.105l10.919 2.019a.188.188 0 010 .368l-10.919 2.02a1.125 1.125 0 00-.915 1.103v5.312a1.105 1.105 0 00.496.923 1.122 1.122 0 001.066.097l20.02-8.256.008-.005a1.5 1.5 0 000-2.756z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "radio-button-off") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12z"
          stroke="#A1A1A1"
          fill="#F1F1F1"
        />
      </Svg>
    );
  }

  if (name === "radio-button-on") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12a6 6 0 1112 0 6 6 0 01-12 0z"
          fill={color}
        />
        <Path
          d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12z"
          stroke={color}
        />
      </Svg>
    );
  }

  if (name === "cancel") {
    return (
      <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.414 6l4.293-4.293A.999.999 0 1010.293.293L6 4.586 1.707.293A.999.999 0 10.293 1.707L4.586 6 .293 10.293a.999.999 0 101.414 1.414L6 7.414l4.293 4.293a.997.997 0 001.414 0 .999.999 0 000-1.414L7.414 6z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "trash-can-outline") {
    return (
      <Svg
        width={size}
        height={size * (14 / 16)}
        viewBox="0 0 14 16"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6C12.5523 6 13 6.44772 13 7V13C13 14.6569 11.6569 16 10 16H4C2.34315 16 1 14.6569 1 13V7C1 6.44772 1.44772 6 2 6H12ZM11 8H3V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V8ZM4 1C4 0.447715 4.44772 0 5 0H9C9.55229 0 10 0.447715 10 1V2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H1C0.447715 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H4V1Z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "question-mark") {
    return (
      <Svg width={size} height={size} viewBox="0 0 97 96" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.5 8C70.5914 8 88.5 25.9086 88.5 48C88.5 70.0914 70.5914 88 48.5 88C26.4086 88 8.5 70.0914 8.5 48C8.5 25.9086 26.4086 8 48.5 8ZM48.5 16C30.8269 16 16.5 30.3269 16.5 48C16.5 65.6731 30.8269 80 48.5 80C66.1731 80 80.5 65.6731 80.5 48C80.5 30.3269 66.1731 16 48.5 16ZM48.5 64C50.7091 64 52.5 65.7909 52.5 68C52.5 70.2091 50.7091 72 48.5 72C46.2909 72 44.5 70.2091 44.5 68C44.5 65.7909 46.2909 64 48.5 64ZM48.5 24C57.3366 24 64.5 31.1634 64.5 40C64.5 47.1792 59.7716 53.2541 53.2592 55.2803L52.5 55.4959V56C52.5 58.2091 50.7091 60 48.5 60C46.4487 60 44.758 58.4558 44.5269 56.4665L44.5 56V52C44.5 49.9487 46.0442 48.258 48.0335 48.0269L49.097 47.9781C53.2365 47.6727 56.5 44.2174 56.5 40C56.5 35.5817 52.9183 32 48.5 32C44.0817 32 40.5 35.5817 40.5 40C40.5 42.2091 38.7091 44 36.5 44C34.2909 44 32.5 42.2091 32.5 40C32.5 31.1634 39.6634 24 48.5 24Z"
          fill={color}
        />
      </Svg>
    );
  }

  if (name === "email-outline") {
    return (
      <Svg width={size} height={size} viewBox="0 0 512 512">
        <G>
          <G>
            <Path
              fill={color}
              d="M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106 C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z  M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787 L338.213,256L482,112.212V399.787z"
            />
          </G>
        </G>
      </Svg>
    );
  }
  if (name === "dashboard") {
    return (
      <Svg width={size} height={size} viewBox="0 0 512 512">
        <G>
          <G>
            <G>
              <Path
                fill={color}
                d="M435.143,129.356c-6.796-6.795-17.463-7.797-25.407-2.384c-29.926,20.398-180.03,122.969-196.162,139.1 c-23.394,23.395-23.394,61.459,0,84.854c11.697,11.696,27.063,17.545,42.427,17.545c15.364,0,30.729-5.849,42.427-17.545 c16.131-16.132,118.701-166.236,139.1-196.162C442.939,146.821,441.938,136.153,435.143,129.356z M270.142,322.641 c-7.797,7.799-20.486,7.799-28.283,0c-7.798-7.797-7.799-20.482-0.004-28.28c6.268-6.194,48.885-36.588,101.319-73.035 C306.728,273.76,276.334,316.375,270.142,322.641z"
              />
              <Path
                fill={color}
                d="M92.231,401.523l-24.69,12.044C49.475,381.325,40,345.338,40,308.499c0-26.991,4.977-52.842,14.06-76.683l28.291,13.57 c2.79,1.338,5.735,1.972,8.636,1.972c7.453,0,14.608-4.185,18.047-11.355c4.776-9.959,0.576-21.906-9.384-26.683l-27.932-13.398 c34.717-56.62,94.784-96.095,164.283-102.505v30.081c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V93.402 c23.828,2.169,46.884,8.237,68.771,18.117c10.065,4.545,21.912,0.066,26.457-9.999c4.545-10.068,0.068-21.913-10-26.458 C328.063,60.091,292.659,52.499,256,52.499c-68.38,0-132.667,26.628-181.02,74.98C26.629,175.832,0,240.119,0,308.499 c0,50.53,14.998,99.674,43.373,142.115c3.822,5.715,10.141,8.886,16.639,8.886c2.954,0,5.946-0.655,8.757-2.026l41-20 c9.928-4.843,14.05-16.816,9.207-26.744C114.133,400.803,102.159,396.682,92.231,401.523z"
              />
              <Path
                fill={color}
                d="M489.436,203.271c-4.544-10.067-16.387-14.547-26.458-10c-10.067,4.545-14.544,16.39-9.999,26.457 C465.601,247.686,472,277.553,472,308.499c0,36.894-9.506,72.939-27.625,105.218l-25.777-12.275 c-9.971-4.748-21.906-0.515-26.656,9.459c-4.749,9.972-0.514,21.907,9.459,26.656l42,20c2.763,1.315,5.692,1.944,8.588,1.944 c6.5,0,12.82-3.175,16.637-8.886C497.002,408.173,512,359.029,512,308.499C512,271.84,504.408,236.436,489.436,203.271z"
              />
            </G>
          </G>
        </G>
      </Svg>
    );
  }

  if (name === "text") {
    return (
      <Svg height={size} viewBox="0 0 24 24" width={size}>
        <Path
          fill={color}
          d="m19.5 24h-15c-1.378 0-2.5-1.122-2.5-2.5v-19c0-1.378 1.122-2.5 2.5-2.5h15c1.378 0 2.5 1.122 2.5 2.5v19c0 1.378-1.122 2.5-2.5 2.5zm-15-23c-.827 0-1.5.673-1.5 1.5v19c0 .827.673 1.5 1.5 1.5h15c.827 0 1.5-.673 1.5-1.5v-19c0-.827-.673-1.5-1.5-1.5z"
        />
        <Path
          fill={color}
          d="m11.5 10c-.276 0-.5-.224-.5-.5v-.5h-5v.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5h6c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m8.5 15c-.276 0-.5-.224-.5-.5v-6c0-.276.224-.5.5-.5s.5.224.5.5v6c0 .276-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m9.5 15h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m18.5 9h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m18.5 12h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m18.5 15h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m18.5 18h-13c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h13c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
        <Path
          fill={color}
          d="m18.5 21h-13c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h13c.276 0 .5.224.5.5s-.224.5-.5.5z"
        />
      </Svg>
    );
  }

  if (name === "logout") {
    return (
      <Svg height={size} width={size} viewBox="0 0 471.2 471.2">
        <G>
          <G>
            <Path
              fill={color}
              d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5 s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5 S235.019,444.2,227.619,444.2z"
            />
            <Path
              fill={color}
              d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5 s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8 C455.319,239.9,455.319,231.3,450.019,226.1z"
            />
          </G>
        </G>
      </Svg>
    );
  }

  return null;
}
