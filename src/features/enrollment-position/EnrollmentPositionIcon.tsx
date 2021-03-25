import * as React from "react";
import Svg, { Defs, G, Path, Polygon, Rect } from "react-native-svg";

export const EnrollmentPositionIcon = function EnrollmentPositionIcon({
  positionId,
  size,
}: {
  positionId: number;
  size: number;
}) {
  if (positionId === 1) {
    const aspectRatio = 319.3 / 500;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 319.3 500">
        <Defs />
        <Path
          d="M220.2,264.6c-19.6-19-77.5-69.2-85.8-58s0,20.6,21.5,41.4,48.7,46.4,48.7,46.4Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M206.6,298a15.7,15.7,0,0,1,.5-3.7c.3-1.3.6-2.5,1-3.7a74.1,74.1,0,0,1,3.1-7,98,98,0,0,1,7.9-13.2l-.2.4c1.2-4.6,1.5-9.9,2.9-15a29.7,29.7,0,0,1,1.3-3.9,18.1,18.1,0,0,1,1.8-3.7,21.2,21.2,0,0,1,2.3-3.5l3-3.2,1.9-1.9,3.5,4.4-2,1.8L231,248a27.8,27.8,0,0,0-2.1,2.7,14.9,14.9,0,0,0-1.8,3,19.2,19.2,0,0,0-1.4,3.3c-1.8,4.6-2.4,9.6-4.2,14.7v.3h-.2a103.7,103.7,0,0,0-8.8,12.1,71.6,71.6,0,0,0-3.6,6.6c-.6,1.2-.9,2.3-1.4,3.5A24.5,24.5,0,0,0,206.6,298Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M267.3,217.9a41.7,41.7,0,0,1,5.5-1.7,64,64,0,0,1,12.6-1.7,49.9,49.9,0,0,1,6.7,0,30.6,30.6,0,0,1,5.7.7,21,21,0,0,1,4,1l1.5.4-1.6-.2a19.8,19.8,0,0,0-4-.4,36.6,36.6,0,0,0-5.6.2,49.8,49.8,0,0,0-6.4,1,58.3,58.3,0,0,0-11.4,3.3,53.2,53.2,0,0,0-4.9,2.4L267,224l-2.2-5Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M229.6,312.3s1.5-.9,3.5-2.4a56.6,56.6,0,0,0,6.2-6.5,97.2,97.2,0,0,0,7.7-10.7l1.5-2.3,4.7,3.7-1.9,2a100.8,100.8,0,0,1-10.1,9.2,58,58,0,0,1-7.7,5.4Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M327.7,181c-7.7-12.7-43-47.2-49.8-51.7,0,0-45.4,95.9-64.8,141.5-21-1.3-47.5-3.2-59.9-4.8-19.4-2.5-58.3-10.9-61,2.3s12.4,23.7,49.6,29.8c11.1,1.8,43,4.3,50.2,4.9l11.1,1.5.4.2a16.3,16.3,0,0,1,7.4,4.4c4.4,11.3,11.7,29.8,25.3,58.5,24,50.8,45.3,62.5,53.9,63S354,289.7,354,289.7,335.4,193.6,327.7,181Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M148.8,224.1c-16.2-11-47.1-35.9-55.5-25.3s.5,26.7,31,48.8,86.8,34,86.8,34l15-11.3S167.5,236.7,148.8,224.1Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M325.6,408.7c-26.9-.9-60.1-9.4-68.3-53.8S253.6,307,242.2,268s-24.3-49.3-24.3-49.3,4.4,15,3.9,45.9c7.1,19.2,18.9,35.5,21.6,53.6,1.2,8.1,10.6,59.4,32.1,73.1C301.6,407.9,325.6,408.7,325.6,408.7Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M218.3,266.6s-4.6-4.8-11.8-11.6-17.1-15.8-27.3-24.3-20.9-16.6-29.6-21.4c-4.3-2.4-8.2-4-11.1-4.2a5.6,5.6,0,0,0-3.2.7l-.9.8.9-.9a5.1,5.1,0,0,1,3.2-.8c3,0,7.1,1.4,11.5,3.7,9.1,4.4,20.1,12,30.9,20s21,16.5,28.6,23,12.6,11.1,12.6,11.1l2,1.8-3.9,4Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M146.3,151.5c-7.5-5.1-34.1-26-41.6-16.6-10.7,13.2-3.5,31.4,41.6,61.3Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M255.9,206.6s35.4,41.6,69.7,60.1c-4.7-29.1-23.3-37.1-30.5-48s-12.5-35.9-12.5-35.9Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M276.9,281.9a12.4,12.4,0,0,1-12.3,12.3H138.7a12.3,12.3,0,0,1-12.2-12.3V12.3A12.3,12.3,0,0,1,138.7,0H264.6a12.4,12.4,0,0,1,12.3,12.3Z"
          transform="translate(-90.4)"
        />
        <Rect x={46.8} y={19.4} width={128.9} height={243.04} />
        <Path
          d="M192.7,144.7c11.8-6.6,15,0,51.2,47.1s71.6,69.8,86.5,77.5A69.8,69.8,0,0,1,354,289.7l33.5,150-85.6,3.6-11.8-12.7-17-41.2s-13.5-41.3-25.6-103.3c-3-15.5-16.7-49.7-32.8-72.1S171.5,156.6,192.7,144.7Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M325.6,408.7h-2.7c-1.7,0-4.3,0-7.6-.2a83,83,0,0,1-26.6-6.3,63.8,63.8,0,0,1-15.5-10.4,54.5,54.5,0,0,1-12.1-17c-3.2-6.5-5.1-13.8-6.5-21.2s-2.6-14.6-3.5-22.2c-1.6-15.1-1.9-29.9-5.4-43.2-1.5-6.8-3.6-13.2-5.3-19.3s-3.9-11.9-6.1-17a203.1,203.1,0,0,0-11.1-24.5,84.1,84.1,0,0,0-5.3-8.7,61.1,61.1,0,0,1,6.2,8.2c1.9,2.7,3.9,6.1,6.2,10.1s4.6,8.6,6.9,13.8,4.5,10.8,6.9,16.8,4.6,12.5,6.2,19.5c3.9,13.8,4.4,29.1,6.2,43.7.7,7.3,1.9,14.7,3,22s2.9,13.9,5.9,20,6.2,11.8,10.6,16.2a58.4,58.4,0,0,0,14,10.4,80.8,80.8,0,0,0,14,5.5,82.8,82.8,0,0,0,11.4,2.5C321.8,408.4,325.6,408.7,325.6,408.7Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M197.5,148.1c-6.9,3.5-5.1,12.6,1.6,21.1s10.7,7.5,16.9,3.3-.6-13.3-3.7-17.3S204.2,144.7,197.5,148.1Z"
          transform="translate(-90.4)"
        />
        <Path
          d="M386.5,457.3H274.1A11.2,11.2,0,0,1,263,446.1v-3.2a11,11,0,0,1,9.7-11l111.1-14.7a11.2,11.2,0,0,1,12.6,10.2l1.2,18A11.1,11.1,0,0,1,386.5,457.3Z"
          transform="translate(-90.4)"
        />
        <Rect x={163.5} y={452.9} width={155.8} height={47.12} rx={11.2} />
        <Rect x={241.4} y={452.9} width={77.9} height={47.12} rx={11.2} />
      </Svg>
    );
  }
  if (positionId === 2) {
    const aspectRatio = 340.3 / 500;
    const width = size;
    const height = width / aspectRatio;
    return (
      <Svg width={width} height={height} viewBox="0 0 340.3 500">
        <Defs />
        <Path
          d="M404.6,81.2c-1.8-12.1-16.1-28.1-16.1-28.1l-25.2-4.6,3.6,33.6,10,9.7Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M313.5,24.7c7.1-2.1,35.4-13.4,45.8-13.1S424.5,44,419.8,53.5c-5.7,11.5-31,5.8-48.5-.3s-55.9-18.1-55.9-18.1h-8.9Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M395,164.8c.5-9.8-4.2-19.2-4.2-19.2l-23.1,13.7v18Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M397.9,129.9c.4-11.7-7-30.3-7-30.3l-23.2,5.6v18.7Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M115.6,197.9s33.5-13.9,42.7-25.5,24.3-53.5,28.3-70.6,7-49.1,11.6-57.9S254.8.2,262.3,0s51.9,13.1,51.9,21.7-12.4,12.4-22.5,12.4-38.4,7-38.4,7l-3.7,225.1s-20-7.2-27.2-6-59.1,34.9-60.3,34.9S115.6,197.9,115.6,197.9Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M244.2,145.6c-3.4,7.2-11.7,26.6-11.7,26.6s2.1,17.4,11.7,29.1C263,223.9,244.2,145.6,244.2,145.6Z"
          transform="translate(-79.9 0)"
        />
        <Rect x={164.4} y={27.4} width={127.3} height={248.97} rx={10.4} />
        <Rect x={173.4} y={43.9} width={109.1} height={205.67} />
        <Path
          d="M397.4,69.5c8.2,6.4,9.7,17.1,2.9,29.5s-13.6,22.9-25.4,12.5-6.9-23.6-1-34.4S388.5,62.6,397.4,69.5Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M393.7,142a10.9,10.9,0,0,1-1.3,1.7,34.8,34.8,0,0,1-2.6,3c-3.8,4-6.7,7.1-9.1,9.3l-.8.6c-4.1,3.4-7.1,3.7-11.9.1-7.8-5.8-2.8-17.1,1.5-27.9s11-18.4,22.5-12.1C398.8,120.4,400.5,131.7,393.7,142Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M389.6,154.2c7.2,2.3,6.1,12.7,3.3,20.1s-11.1,16.9-16.3,14.9-6.9-11.2-3.4-22.1S381.5,151.5,389.6,154.2Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M126.1,184.2l69.4,107.9a8.5,8.5,0,0,0,11.7,2.6l6.9-4.4a8.6,8.6,0,0,0,2.6-11.7L148.4,170.1a8.5,8.5,0,0,0-11.6-2.7l-8,5A8.6,8.6,0,0,0,126.1,184.2Z"
          transform="translate(-79.9 0)"
        />
        <Rect
          x={116.3}
          y={170.1}
          width={53.7}
          height={164.49}
          rx={9.6}
          transform="translate(-193.2 116.7) rotate(-32.6)"
        />
        <Rect
          x={94.1}
          y={176.5}
          width={53.7}
          height={82.24}
          rx={9.6}
          transform="translate(-178 99.4) rotate(-32.6)"
        />
        <Path
          d="M396.1,90.9c-3.3-3.3-10.7-5.5-16.4,1.4s-1.3,12.9,3.1,16,8,1.8,12.1-4.4S399.2,93.9,396.1,90.9Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M392.4,143.7a34.8,34.8,0,0,1-2.6,3c-3.8,4-6.7,7.1-9.1,9.3l-.8.6a16.4,16.4,0,0,1-2.8-1.6c-6.3-4.4-5.2-8.5.8-13.6s10-3.3,13.5,0Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M404.3,399.9c-3.1,11.2-6.3,33.8-6.3,33.8H304.7s2.1-13.9-1.3-20-17.3-15.1-25.8-30.7-8.8-36.5-22.4-52.4l-1.9-2.1c-5.4-5.7-9.3-10.4-11.8-14.5l-.3-.4a24.5,24.5,0,0,1-1.9-3.5h-.1c-2.5-5.4-2.2-9.3.3-11.9,4.8-5,13.9-3.8,26,1.1a42.3,42.3,0,0,1,9,5.3h.1c9.8,7.5,18.9,19,23.6,25-.5-7.8-1.6-29.3-2.8-48.3v-1.3c-.8-18.5,6.5-34,6.5-74.5,0-43.9-2.3-67.1,15.1-67.2s14.1,20.5,14.1,37.3c0,12.5.5,39.2.7,52.1.1,4.5.2,7.3.2,7.3a4.3,4.3,0,0,1,2.2-2.7c2.5-1.4,7.3-2.1,16.4-1.1s10.8,6.1,12.1,12.7h0c.5,2.7.8,5.6,1.2,8.5l2.4.4c11.2,2.9,16.7,19.7,23.2,30.7s23,20.4,27.3,34.7S407.3,388.6,404.3,399.9Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M260.4,327.4a10.4,10.4,0,0,1-5.2,3.2l-1.9-2.1c-5.4-5.7-9.3-10.4-11.8-14.5l-.3-.4-1.9-3.5h-.1c3-5.4,9.1-9.4,16.3.7S263,324,260.4,327.4Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M316.7,144.2c-7.4,0-9.5,3.7-8.8,13.2s3.5,12.6,8.9,12.6,8.7-7.8,8.7-12.9C325.5,148.7,324,144.2,316.7,144.2Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M335.2,245.2a93.6,93.6,0,0,1-1.1,14,61.1,61.1,0,0,1-1.5,6.5,40.9,40.9,0,0,1-1.5-6.5,72.9,72.9,0,0,1-1.1-14,84.1,84.1,0,0,1,1.1-14.1c.2-1.3.5-2.5.7-3.5.1,4.5.2,7.3.2,7.3a4.3,4.3,0,0,1,2.2-2.7A83.8,83.8,0,0,1,335.2,245.2Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M366.5,259.3a82,82,0,0,1-1.1,14,37.7,37.7,0,0,1-1.5,6.4,37.7,37.7,0,0,1-1.5-6.4,93.6,93.6,0,0,1-1.1-14,95.1,95.1,0,0,1,1.1-14.1l.3-1.4c.5,2.7.8,5.6,1.2,8.5l2.4.4C366.4,254.8,366.5,257.1,366.5,259.3Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M302.3,354.6c-2.6-11.5-22.7-43.2-27.7-50.1,9.8,7.5,18.9,19,23.6,25-.5-7.8-1.6-29.3-2.8-48.3v-1.3C300.5,300.7,304.2,337.4,302.3,354.6Z"
          transform="translate(-79.9 0)"
        />
        <Path
          d="M399.3,459.2H307.6a10.7,10.7,0,0,1-10.7-11l.3-10.6a10.7,10.7,0,0,1,9.9-10.4l90.3-7a10.7,10.7,0,0,1,11.5,10l1.1,17.6A10.7,10.7,0,0,1,399.3,459.2Z"
          transform="translate(-79.9 0)"
        />
        <Rect x={209} y={455} width={131.2} height={45.02} rx={9.6} />
        <Rect x={274.7} y={455} width={65.6} height={45.02} rx={9.6} />
      </Svg>
    );
  }
  if (positionId === 3) {
    const aspectRatio = 499.3 / 444.1;
    const width = size;
    const height = width / aspectRatio;

    return (
      <Svg width={width} height={height} viewBox="0 0 499.3 444.1">
        <Defs />
        <Path
          d="M320.9,179.5c6,2.3,53.7,26.4,61.8,34.9s39.2,79.9,39.2,79.9-18.5,119.2-25.2,120.3-25.3-4.3-52.7-39.5-34.1-49.1-37.2-51.4S320.9,179.5,320.9,179.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M331.4,246.7s34.7,26.2,64.5,34.6c-8.7-21.8-24.4-24.7-32-32s-15.8-25.7-15.8-25.7Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M354.8,248.1s-3.9-3.5-10-8.5-14.4-11.7-23-17.9-17.3-12-24.5-15.4c-3.6-1.7-6.7-2.8-9-2.7a4.3,4.3,0,0,0-2.6.6l-.6.7.6-.7a4.1,4.1,0,0,1,2.5-.8c2.4-.2,5.7.7,9.4,2.3,7.4,3,16.5,8.5,25.5,14.2s17.5,12,23.9,16.8,10.5,8.1,10.5,8.1l3.2,2.5-4.3,2.3Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M186.2,281.7c18.6-11.4,72.1-40.4,76.6-30.3s-3.5,16-23.8,28.5-45.8,27.5-45.8,27.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M187.4,283.5s4.4-2.9,11.2-6.9,15.9-9.3,25.3-14.2,19-9.2,26.6-11.5c3.8-1.1,7.1-1.7,9.4-1.3a4.5,4.5,0,0,1,2.4,1l.5.8-.5-.8a4.4,4.4,0,0,0-2.4-1.2c-2.3-.5-5.7-.1-9.5.9-7.8,1.8-17.7,5.8-27.4,10.2s-19.2,9.1-26.2,12.9-11.7,6.4-11.7,6.4l-1.8,1.1,2.3,3.8Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M247.8,228.9c14.5-5.7,42.8-19.7,47.5-10.1s-5,20.7-32.5,32.6-77.7,37.4-77.7,37.4l-5.2-37.3S231.2,235.5,247.8,228.9Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M313.8,297.9c-18.6-11.4-72.1-40.3-76.6-30.2s3.5,16,23.8,28.4,45.8,27.6,45.8,27.6Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M312.6,299.8s-4.4-2.9-11.2-7-15.9-9.3-25.3-14.1-19-9.3-26.6-11.5c-3.8-1.2-7.1-1.7-9.4-1.4a5.4,5.4,0,0,0-2.4,1.1l-.5.8.5-.8a4.4,4.4,0,0,1,2.4-1.3c2.3-.4,5.7,0,9.5.9,7.8,1.9,17.7,5.9,27.4,10.2s19.2,9.2,26.2,12.9,11.7,6.5,11.7,6.5l1.8,1.1-2.3,3.7Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M252.2,245.2c-14.5-5.7-42.8-19.7-47.5-10.1s5,20.7,32.5,32.6S314.9,305,314.9,305l5.2-37.3S268.8,251.7,252.2,245.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M308.9,326.2c0-1-.2-2-.2-3s0-2.1.2-3.1.7-4,1.1-6a97.3,97.3,0,0,1,3.9-11.5v.3c.2-3.8-.5-7.9-.3-12.1.1-1.1.1-2.2.3-3.3a18.3,18.3,0,0,1,2-6.3l1.7-2.9,1.1-1.9,3.5,2.8-1.2,1.8-1.6,2.2a17.9,17.9,0,0,0-1.2,2.4,11.4,11.4,0,0,0-.9,2.6,27.4,27.4,0,0,0-.5,2.8c-.6,3.9-.2,7.9-.7,12.2v.2h0a71.8,71.8,0,0,0-4.8,11,53.6,53.6,0,0,0-1.7,5.7c-.2,1-.3,2-.4,2.9A16.1,16.1,0,0,0,308.9,326.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M179.1,163.2c-6,2.4-53.7,26.5-61.8,35S78.1,278,78.1,278s18.5,119.2,25.2,120.4,25.3-4.4,52.7-39.6,34.1-49.1,37.2-51.4S179.1,163.2,179.1,163.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M191.1,309.9c0-1,.2-2,.2-3s0-2-.2-3-.7-4-1.1-6a98.8,98.8,0,0,0-3.9-11.6v.4c-.2-3.8.5-8,.3-12.2-.1-1.1-.1-2.1-.3-3.2a16.5,16.5,0,0,0-.7-3.2,14.4,14.4,0,0,0-1.3-3.1l-1.7-3-1.1-1.9-3.5,2.9,1.2,1.7,1.6,2.2a17.9,17.9,0,0,1,1.2,2.4,12.2,12.2,0,0,1,.9,2.7,23.3,23.3,0,0,1,.5,2.8c.6,3.8.2,7.8.7,12.1v.4a66.7,66.7,0,0,1,4.8,10.9c.7,1.9,1.2,3.8,1.7,5.7s.3,2,.4,3A15.1,15.1,0,0,1,191.1,309.9Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M79.6,375.2c21,4,48.2,3.1,62.2-29.9s11.2-36.5,26.8-64.8S196,246.4,196,246.4s-6.1,10.9-11,35c-8.9,13.6-20.8,24.2-26.1,37.8-2.3,6-18.4,44.3-37.4,51.2C98.4,378.8,79.6,375.2,79.6,375.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M168.6,230.4s-34.7,26.2-64.5,34.6c8.7-21.7,24.4-24.7,32-31.9s15.8-25.7,15.8-25.7Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M145.2,231.9s3.9-3.6,10-8.6,14.4-11.6,23-17.8,17.3-12.1,24.5-15.5c3.6-1.7,6.7-2.7,9-2.7a4.3,4.3,0,0,1,2.6.7l.6.7-.6-.7a4.1,4.1,0,0,0-2.5-.9c-2.4-.1-5.7.8-9.4,2.3-7.4,3.1-16.5,8.5-25.5,14.3s-17.5,12-23.9,16.7-10.5,8.2-10.5,8.2l-3.2,2.5,4.3,2.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M420.4,391.5c-21,3.9-48.2,3.1-62.2-29.9S347,325,331.4,296.7,304,262.6,304,262.6s6.1,10.9,11,35c8.9,13.7,20.8,24.3,26.1,37.9,2.3,6,18.4,44.2,37.4,51.1C401.6,395,420.4,391.5,420.4,391.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M320.1,293a11.5,11.5,0,0,1-11.5,11.5h-118A11.5,11.5,0,0,1,179.1,293V40.4a11.6,11.6,0,0,1,11.5-11.5h118a11.6,11.6,0,0,1,11.5,11.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Rect x={188.9} y={18.2} width={120.8} height={227.72} />
        <Path
          d="M79.6,375.2l2.1.5,5.9,1.1a59.3,59.3,0,0,0,21.8-.3,47,47,0,0,0,13.7-5.4,44.3,44.3,0,0,0,12.4-11c3.6-4.5,6.3-9.9,8.7-15.4s4.5-10.8,6.5-16.6c3.9-11.4,6.6-22.8,11.7-32.6,2.3-4.9,5-9.6,7.4-14s5.1-8.6,7.7-12.1a170.2,170.2,0,0,1,12.8-17.2,55.3,55.3,0,0,1,5.7-5.8,45.2,45.2,0,0,0-6.3,5.3,88.9,88.9,0,0,0-6.5,6.8,104.9,104.9,0,0,0-7.7,9.5c-2.9,3.6-5.4,7.6-8.3,11.8s-5.8,8.9-8.2,14.1c-5.4,10-8.4,21.8-12.3,32.8-1.9,5.6-4.1,11.1-6.2,16.5a62.1,62.1,0,0,1-8,14.6,48.3,48.3,0,0,1-11,10.7,47.4,47.4,0,0,1-12.7,5.7A67.8,67.8,0,0,1,97,376a71.7,71.7,0,0,1-9.3,0C82.6,375.7,79.6,375.2,79.6,375.2Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M157.8,237.3a32.7,32.7,0,0,0-4-2.3,54.4,54.4,0,0,0-9.5-3.5,48.7,48.7,0,0,0-5.2-1.2,39.1,39.1,0,0,0-4.6-.4,15.7,15.7,0,0,0-3.2.1h-1.2l1.2.2a22.3,22.3,0,0,1,3.2.3,28.2,28.2,0,0,1,4.3,1.2,31.2,31.2,0,0,1,4.8,1.8,51.4,51.4,0,0,1,8.3,4.6,42,42,0,0,1,3.3,2.7L157,242l2.5-3.4Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M170.7,317a29.7,29.7,0,0,1-2.3-2.4,53.4,53.4,0,0,1-3.7-6.2,78.3,78.3,0,0,1-4.1-9.6l-.7-2-4.4,2,1.2,1.9a86.9,86.9,0,0,0,6.2,8.9,56.8,56.8,0,0,0,5.1,5.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M228.3,193.4c-8-7.2-11.6-2.6-47.9,27.7s-67.6,41.8-80.5,45.1A55.8,55.8,0,0,0,78.1,278L26.2,388.6,92,406.2l11.3-7.8,20.3-29.1s17.6-29.7,37.7-75.7c5-11.5,21.6-35.7,38-50.3S242.7,206.2,228.3,193.4Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M224,195.1c4.7,4,1.7,10.7-4.9,16.1s-9.6,4.1-13.7-.3,2.8-10.2,5.8-12.8S219.4,191.3,224,195.1Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M21.6,401.9l91.7,20.4a6.6,6.6,0,0,0,7.9-5.1l1.5-6.5a6.7,6.7,0,0,0-4.2-7.7L30.8,371a6.7,6.7,0,0,0-8.7,4.3l-5.4,18.2A6.7,6.7,0,0,0,21.6,401.9Z"
          transform="translate(-0.3 -28.9)"
        />
        <Rect
          x={44.4}
          y={364.8}
          width={37.5}
          height={123.82}
          rx={8.9}
          transform="translate(-367.5 366.8) rotate(-77.5)"
        />
        <Rect
          x={14.2}
          y={389.1}
          width={37.5}
          height={61.92}
          rx={8.9}
          transform="translate(-384.6 332) rotate(-77.5)"
        />
        <Path
          d="M420.4,391.5l-2.1.5-5.9,1.1a64.1,64.1,0,0,1-21.8-.3,47,47,0,0,1-13.7-5.4,43.2,43.2,0,0,1-12.4-11.1,67.4,67.4,0,0,1-8.7-15.3c-2.3-5.4-4.5-10.9-6.5-16.6-3.9-11.4-6.6-22.9-11.7-32.6-2.3-5-5-9.6-7.4-14.1s-5.1-8.5-7.7-12.1a179,179,0,0,0-12.8-17.1,66,66,0,0,0-5.7-5.9,56.7,56.7,0,0,1,6.3,5.3c1.9,1.8,4.1,4.1,6.5,6.8s5.1,5.9,7.7,9.5,5.4,7.6,8.3,11.9,5.8,8.9,8.2,14c5.4,10.1,8.4,21.9,12.3,32.9,1.9,5.5,4.1,11.1,6.2,16.5a63.5,63.5,0,0,0,8,14.5,42.1,42.1,0,0,0,23.7,16.4,60.1,60.1,0,0,0,11.8,1.9c3.6.2,6.7.1,9.3,0C417.4,391.9,420.4,391.5,420.4,391.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M342.2,253.5c.1.1,1.3-1,4-2.2a54.1,54.1,0,0,1,9.5-3.6,48.2,48.2,0,0,1,5.2-1.1,25.8,25.8,0,0,1,4.6-.5,29.2,29.2,0,0,1,3.2.1h0a14.5,14.5,0,0,0-3.2.4,27.2,27.2,0,0,0-4.3,1.1,47.8,47.8,0,0,0-4.8,1.9,44.7,44.7,0,0,0-8.3,4.6,31.7,31.7,0,0,0-3.3,2.6l-1.8,1.3-2.5-3.5Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M329.3,333.3l2.3-2.5a60.9,60.9,0,0,0,3.7-6.1,86.3,86.3,0,0,0,4.1-9.6l.7-2.1,4.4,2-1.2,1.9a95,95,0,0,1-6.2,9,45.4,45.4,0,0,1-5.1,5.4A32.2,32.2,0,0,1,329.3,333.3Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M271.7,209.6c8-7.1,11.6-2.6,47.9,27.7s67.6,41.8,80.5,45.2a55.8,55.8,0,0,1,21.8,11.8l51.9,110.5L408,422.4l-11.3-7.8-20.3-29.1s-17.6-29.6-37.7-75.7c-5-11.5-21.6-35.6-38-50.2S257.3,222.5,271.7,209.6Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M276,211.4c-4.7,3.9-1.7,10.7,4.9,16.1s9.6,4,13.7-.4-2.8-10.1-5.8-12.8S280.6,207.6,276,211.4Z"
          transform="translate(-0.3 -28.9)"
        />
        <Path
          d="M480.6,417.6,384.7,439a4.7,4.7,0,0,1-5.5-3.5l-2.3-10.4a4.6,4.6,0,0,1,2.9-5.2l91.5-33.4a4.5,4.5,0,0,1,5.9,2.9l6.7,22.5A4.4,4.4,0,0,1,480.6,417.6Z"
          transform="translate(-0.3 -28.9)"
        />
        <Rect
          x={375}
          y={424.3}
          width={123.8}
          height={37.45}
          rx={8.9}
          transform="translate(-86.1 76.6) rotate(-12.5)"
        />
        <Rect
          x={436.1}
          y={417.5}
          width={61.9}
          height={37.45}
          rx={8.9}
          transform="translate(-83.9 83) rotate(-12.5)"
        />
      </Svg>
    );
  }
  if (positionId === 4) {
    const aspectRatio = 103.9 / 37.1;
    const width = size;
    const height = width / aspectRatio;

    return (
      <Svg width={width} height={height} viewBox="0 0 103.9 37.1">
        <Defs />
        <G>
          <Polygon points="65.4 27.2 65.6 30.1 14.1 29.2 14 26.3 65.4 27.2" />
          <Path
            d="M268.7,253l.2,2.9c0,.1,0,.2-.2.2V253Z"
            transform="translate(-196.5 -225.8)"
          />
          <Polygon points="14 26.3 14.1 29.2 4.3 35.6 4.2 32.7 14 26.3" />
          <Path
            d="M196.7,261.5l-.2-3c0,.3.7.5,1.9.5v2.9C197.4,261.9,196.7,261.7,196.7,261.5Z"
            transform="translate(-196.5 -225.8)"
          />
          <Polygon points="55.6 33.6 55.8 36.5 4.3 35.6 4.2 32.7 55.6 33.6" />
          <Polygon points="65.4 27.2 65.6 30.1 55.8 36.5 55.6 33.6 65.4 27.2" />
          <Path
            d="M266.9,252.5c1.4.1,2.2.4,1.7.7l-9.6,6.2a7.6,7.6,0,0,1-3.5.6l-57.1-1c-1.5,0-2.2-.3-1.7-.7l9.5-6.2a8.3,8.3,0,0,1,3.6-.5Zm-14.7,6.9L262,253l-51.5-.9-9.8,6.4,51.5.9"
            transform="translate(-196.5 -225.8)"
          />
          <Polygon points="65.4 27.2 55.6 33.6 4.2 32.7 14 26.3 65.4 27.2" />
          <Polygon points="72 27.4 72.2 30.3 62.7 36.5 62.5 33.6 72 27.4" />
          <Polygon points="58.9 34.2 59.1 37.1 2 36.1 1.8 33.2 58.9 34.2" />
          <Path
            d="M259,259.4l.2,2.9a7.8,7.8,0,0,1-3.6.6V260A7.6,7.6,0,0,0,259,259.4Z"
            transform="translate(-196.5 -225.8)"
          />
        </G>
        <Path
          d="M264.4,245.7a13.3,13.3,0,0,1-4.8-2.7c-1.5-1.8,3.4-3.8,3.4-3.8l9.5.7,1.1,3.2Z"
          transform="translate(-196.5 -225.8)"
        />
        <Path
          d="M267.1,232.4a2.3,2.3,0,0,0-2.6-.5c-4.3,2.2-15.7,9-16.4,10s-7.7,6.3-9.7,9.8a2.3,2.3,0,0,0,1.3,3.2h.6a7.7,7.7,0,0,0,2.5-1l.6-.5a.1.1,0,0,1,.1-.1h0c2.8-2.3,5.1-3.9,5.8-5a21.1,21.1,0,0,1,3.5-3.2c1.9-.8,7-2.2,9-3.1a2.6,2.6,0,0,1,1.5-.1,11,11,0,0,0,8.5-1.4C273.6,239.4,269.2,234.5,267.1,232.4Z"
          transform="translate(-196.5 -225.8)"
        />
        <Path
          d="M249.9,249.4c.3,2.3,1.1,3.4,9.9,2.2s11.2,1.3,19.4.3a14.4,14.4,0,0,0,11.1-7.4l-1.8-14s-20.2.5-22.5.8,4.3,9.9,4.3,9.9,1.8-.4,1.8-.2c.4,2.8-12.5,4.5-17.5,5.1C251.8,246.4,249.6,247.1,249.9,249.4Z"
          transform="translate(-196.5 -225.8)"
        />
        <Path
          d="M291.6,229.9l2.1,15.8a1.8,1.8,0,0,1-1.5,1.9h-.5a1.8,1.8,0,0,1-1.9-1.3l-4.2-15.3a1.7,1.7,0,0,1,1.3-2.2l2.7-.5A1.7,1.7,0,0,1,291.6,229.9Z"
          transform="translate(-196.5 -225.8)"
        />
        <Rect
          x={291.9}
          y={226}
          width={7.3}
          height={22.42}
          rx={1.7}
          transform="translate(-224.4 -186.1) rotate(-7.3)"
        />
        <Rect
          x={291.2}
          y={226}
          width={7.3}
          height={11.21}
          rx={1.7}
          transform="translate(-223.7 -186.3) rotate(-7.3)"
        />
        <Path
          d="M251,249.1c-.2-1.6.8-1.8,2.1-1.9s2.1.1,2.3,1.2.1,1.8-1.8,2S251.1,250.2,251,249.1Z"
          transform="translate(-196.5 -225.8)"
        />
        <Path
          d="M241.1,248.5c1,.7,1.4,1.5.1,2.9s-2.1,1.4-2.9.6"
          transform="translate(-196.5 -225.8)"
        />
      </Svg>
    );
  }
  if (positionId === 5) {
    const aspectRatio = 111.2 / 52.5;
    const width = size;
    const height = width / aspectRatio;

    return (
      <Svg width={width} height={height} viewBox="0 0 111.2 52.5">
        <Defs />
        <G>
          <Polygon points="65.4 38.3 65.6 41.3 14.1 40.4 14 37.4 65.4 38.3" />
          <Path
            d="M265.1,258.6l.2,2.9c0,.1-.1.1-.2.2l-.2-2.9Z"
            transform="translate(-192.9 -220.2)"
          />
          <Polygon points="14 37.4 14.1 40.4 4.3 46.7 4.2 43.8 14 37.4" />
          <Path
            d="M193.1,267l-.2-2.9c0,.3.7.4,1.8.5l.2,2.9C193.8,267.5,193.1,267.3,193.1,267Z"
            transform="translate(-192.9 -220.2)"
          />
          <Polygon points="55.6 44.7 55.8 47.6 4.3 46.7 4.2 43.8 55.6 44.7" />
          <Polygon points="65.4 38.3 65.6 41.3 55.8 47.6 55.6 44.7 65.4 38.3" />
          <Path
            d="M263.3,258.1c1.4,0,2.2.3,1.6.7l-9.5,6.2a9.4,9.4,0,0,1-3.6.6l-57.1-1c-1.4-.1-2.1-.4-1.6-.7l9.5-6.2a9.4,9.4,0,0,1,3.6-.6Zm-14.8,6.8,9.8-6.3-51.4-.9-9.8,6.3,51.4.9"
            transform="translate(-192.9 -220.2)"
          />
          <Polygon points="65.4 38.3 55.6 44.7 4.2 43.8 14 37.4 65.4 38.3" />
          <Polygon points="72 38.5 72.2 41.5 62.7 47.7 62.5 44.7 72 38.5" />
          <Polygon points="58.9 45.3 59.1 48.2 2 47.2 1.8 44.3 58.9 45.3" />
          <Path
            d="M255.4,265l.2,2.9a9.8,9.8,0,0,1-3.6.6l-.2-2.9A9.4,9.4,0,0,0,255.4,265Z"
            transform="translate(-192.9 -220.2)"
          />
        </G>
        <Path
          d="M252.8,247.5s-3.4-.1-5.3-1.4,2.2-4.5,2.2-4.5l9.5-1.7,1.8,2.8Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M252,233.9a2.1,2.1,0,0,0-2.6.3c-3.6,3.2-13,12.5-13.4,13.7s-5.9,8-6.9,11.9a2.2,2.2,0,0,0,2,2.8h.1l.5-.3a6.5,6.5,0,0,0,2.1-1.6l.5-.6c0-.1,0-.1.1-.2h0c2.1-2.9,6.2-8.6,6.6-9.9s0,0,.4-.3,6.2-3.8,7.9-5.2a2.4,2.4,0,0,1,1.4-.5,11,11,0,0,0,7.9-3.4C260,239.1,254.6,235.5,252,233.9Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M242.8,253.2c.9,2.2,1.9,3,10.1-.2s8-.2,15.7-3.2a14.3,14.3,0,0,0,8.9-9.9l-5.2-13.1s-19.4,5.5-21.5,6.4,6.5,8.4,6.5,8.4,1.7-.8,1.8-.5c1,2.6-7.9,6-12.6,7.7C243.9,249.8,242,251.1,242.8,253.2Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M275.2,225.5l5.8,14.6a1.8,1.8,0,0,1-1,2.4h-.3a1.8,1.8,0,0,1-2.2-.8l-7.8-13.6a1.8,1.8,0,0,1,.8-2.6l2.2-1A1.8,1.8,0,0,1,275.2,225.5Z"
          transform="translate(-192.9 -220.2)"
        />
        <Rect
          x={277.2}
          y={220.3}
          width={7.3}
          height={22.42}
          rx={1.7}
          transform="translate(-258.7 -99.7) rotate(-21.7)"
        />
        <Rect
          x={275.1}
          y={220.7}
          width={7.3}
          height={11.21}
          rx={1.7}
          transform="translate(-256.9 -100.9) rotate(-21.7)"
        />
        <Path
          d="M243.7,253.3c-.6-1.5.3-2,1.5-2.4s2.1-.4,2.6.7.5,1.7-1.2,2.4S244.1,254.4,243.7,253.3Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M230.9,256c1.1.5,1.7,1.2.8,2.8s-1.7,1.8-2.7,1.3"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M246,257.6c3.3-.5,7.6-2.3,11.4-3.2l18.4-4.4-8.1,9.7h-5.9l1.6-3.1a6,6,0,0,0-3.1.7,49.2,49.2,0,0,1-5.1,2.6c-1.2.5-6.1,1.9-6.2,2-5.3,1.4-4.3,1.3-6.4,1.4a3.4,3.4,0,0,1-3.9-3.4A36.6,36.6,0,0,1,246,257.6Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M260.3,257.2a6,6,0,0,1,3.1-.7l-1.6,3.1a27.9,27.9,0,0,0-4.2.3,26.6,26.6,0,0,1-7.6,1.4c.1,0,4-1,5.2-1.5A49.2,49.2,0,0,0,260.3,257.2Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M266.7,255a7.5,7.5,0,0,0-4.9,3.2c-1.8,3-3.7,8.9-2.8,9.6a3.6,3.6,0,0,0,3.5.5Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M294.1,247.8c-4.5.8-9.9,0-16,1.6a93.9,93.9,0,0,0-11.6,3.7c-.8.4-4.1,10.1-4.7,11.7s-1.4,5.2,1,5.2a11.7,11.7,0,0,0,2.5-.3s.5,3.1,2.4,3.1,7.6-1.1,8.5-2.6-.4-2.7,1-4.7a34.4,34.4,0,0,0,12.9-1.9c.9-.3,2.8-1.8,4.9-2.6Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M277.2,265.5l-4.4.5a2.9,2.9,0,0,1-1.1,1.1c-1.9,1.4-.9,2.2-.9,2.2l1.4-.5a6.6,6.6,0,0,1,1.9.2,3.5,3.5,0,0,1,2.6-2.8A3.1,3.1,0,0,0,277.2,265.5Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M265.3,270s2.1-6,2.7-7.3,2.8-5.5,2.8-5.5-1.4.1-2.3,2.1a58.5,58.5,0,0,0-3,7.2,27.3,27.3,0,0,1-1.9,3.5Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M261.2,268.5a16.7,16.7,0,0,1,.6-3.7,96.7,96.7,0,0,1,4.2-8.9,2.5,2.5,0,0,0-1.8,1.3c-.6,1.1-2,4.6-2.6,5.6a36.1,36.1,0,0,0-1.6,5.5Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M238.7,259.8s.8.9,2.9.6l1.8-.4c.2,0,.3-.2.3-.4v-.9c0-.3-.2-.5-.5-.4l-2.3.7Z"
          transform="translate(-192.9 -220.2)"
        />
        <Path
          d="M297.3,247.2l-.6,15.7a1.9,1.9,0,0,1-1.9,1.8h-.3a1.8,1.8,0,0,1-1.8-1.6l-1.5-15.6a1.7,1.7,0,0,1,1.8-2h2.5A1.8,1.8,0,0,1,297.3,247.2Z"
          transform="translate(-192.9 -220.2)"
        />
        <Rect
          x={288.8}
          y={251.3}
          width={22.4}
          height={7.32}
          rx={1.7}
          transform="translate(-160.1 323.8) rotate(-87.6)"
        />
        <Rect
          x={294.6}
          y={245.7}
          width={11.2}
          height={7.32}
          rx={2.4}
          transform="translate(-154.3 318.7) rotate(-87.6)"
        />
      </Svg>
    );
  }
  const aspectRatio = 495.8 / 270.1;
  const width = size;
  const height = width / aspectRatio;
  return (
    <Svg width={width} height={height} viewBox="0 0 495.8 270.1">
      <Defs />
      <Path
        d="M171.7,241.2c16.4-6.9,63.4-23.5,65.7-14.8s-4.9,12.5-22.8,20-40.5,16.5-40.5,16.5Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M228.7,205.4c12.5-2.7,37.1-10.5,39.6-2.1s-6.6,16.1-30.3,22.2-67.5,20.4-67.5,20.4l.5-30.8S214.5,208.6,228.7,205.4Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M181,144.6c-5.2,1.1-46.8,14.5-54.5,20.3s-41.7,59.6-41.7,59.6-.2,98.7,5.1,100.5,21-.3,47.6-25.3,33.8-35.4,36.6-36.8S181,144.6,181,144.6Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M172.4,242.8s3.9-1.8,9.9-4.2,14.1-5.5,22.3-8.2,16.6-5.1,23-6c3.2-.4,5.9-.4,7.7.2a3.1,3.1,0,0,1,1.8,1.1l.3.7-.3-.7a3.3,3.3,0,0,0-1.8-1.3c-1.8-.7-4.5-.8-7.8-.5-6.5.5-15,2.5-23.4,4.8s-16.7,5-22.8,7.1-10.3,3.7-10.3,3.7l-1.6.7,1.4,3.3Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M73.7,303.3c16.4,5.8,38.6,8.6,54.1-16.3s13.6-28.1,29.8-49,26.5-24.1,26.5-24.1-6.3,8-13.3,26.9c-8.9,9.9-19.9,16.9-25.9,27.3-2.6,4.5-20.5,33.4-36.8,36.5C88.4,308.5,73.7,303.3,73.7,303.3Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M172,264.6a15.1,15.1,0,0,0,.8-4.9,42.1,42.1,0,0,0-.1-5,83.7,83.7,0,0,0-1.7-9.8v.3c.4-3.1,1.5-6.3,1.8-9.8a11.4,11.4,0,0,0,.2-2.6,24.5,24.5,0,0,0-.2-2.7,26.1,26.1,0,0,0-.6-2.7l-1-2.6-.7-1.7-3.2,1.9.8,1.6,1,1.9c.3.7.4,1.4.7,2.1a16,16,0,0,1,.3,2.3,8.7,8.7,0,0,1,.1,2.3c0,3.2-.8,6.4-.9,9.9v.2h0a63.3,63.3,0,0,1,2.5,9.5,39.3,39.3,0,0,1,.6,4.8,20.8,20.8,0,0,1,0,2.5A10,10,0,0,1,172,264.6Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M163.9,197.5s-31.3,16.8-56.5,19.8c9.8-16.5,22.9-16.9,29.9-21.8s16.1-18.7,16.1-18.7Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M144.9,195.7s3.6-2.3,9.2-5.6,13-7.6,20.7-11.5,15.6-7.6,21.8-9.4c3.1-.9,5.8-1.4,7.7-1.1a4.2,4.2,0,0,1,1.9.9l.5.6-.4-.6a3.7,3.7,0,0,0-2-1,18.7,18.7,0,0,0-7.8.7c-6.4,1.5-14.5,4.7-22.4,8.3s-15.7,7.4-21.5,10.5-9.5,5.2-9.5,5.2l-2.9,1.6,3.2,2.4Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M154.3,201.7a18.4,18.4,0,0,0-2.9-2.4,47.4,47.4,0,0,0-7.2-4,41.6,41.6,0,0,0-4-1.6,34.7,34.7,0,0,0-3.7-1l-2.6-.3h-1l.9.3a11.3,11.3,0,0,1,2.6.7,23,23,0,0,1,3.3,1.5,33.5,33.5,0,0,1,3.7,2,59.2,59.2,0,0,1,6.1,4.8,27.2,27.2,0,0,1,2.3,2.6l1.3,1.2,2.5-2.5Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M341.2,148.9c5,1.7,45.8,18.3,52.7,24.9s34.8,63.9,34.8,63.9-11,98.1-16.5,99.3-20.9-2.7-44.5-30.5-29.5-39-32.1-40.7S341.2,148.9,341.2,148.9Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M353.1,202s29.3,20.2,53.9,26c-7.8-17.4-20.8-19.3-27.2-25s-13.9-20.5-13.9-20.5Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M288.3,203.4c-12.1-4.1-35.7-14.6-39.1-6.6s4.7,16.7,27.6,25.5,64.8,27.9,64.8,27.9l3-30.7S302.1,208.2,288.3,203.4Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M368.2,204.7s-3.3-2.8-8.4-6.7-12.1-9.1-19.3-13.9-14.6-9.3-20.6-11.8a20,20,0,0,0-7.5-2,4.2,4.2,0,0,0-2,.7l-.5.6.5-.6a3.4,3.4,0,0,1,2-.8,17.6,17.6,0,0,1,7.7,1.6c6.2,2.2,13.8,6.4,21.3,10.8s14.7,9.3,20.1,13,8.9,6.3,8.9,6.3l1.4,1-2.2,2.9Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M430.8,317.3c-17,3.9-39.3,4.2-51.9-22.4s-10.4-29.4-24.1-52-23.6-27-23.6-27,5.4,8.7,10.2,28.3c7.7,10.8,17.9,19.1,22.6,30,2.1,4.9,16.6,35.5,32.4,40.5C415.6,320.8,430.8,317.3,430.8,317.3Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M340.4,244.4c-15.5-8.6-60.2-30.5-63.6-22.1s3.5,13,20.4,22.5,38.4,21,38.4,21Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M339.6,246s-3.7-2.2-9.4-5.3S316.8,233.6,309,230s-15.9-6.9-22.2-8.5a20.4,20.4,0,0,0-7.7-.8,3.8,3.8,0,0,0-1.9,1l-.4.6.4-.6a3.4,3.4,0,0,1,1.9-1.1,17.8,17.8,0,0,1,7.8.4c6.5,1.2,14.7,4.2,22.8,7.4s15.9,6.8,21.8,9.6,9.8,4.9,9.8,4.9l1.5.8-1.7,3.2Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M362.2,207.2a15.6,15.6,0,0,1,3.2-2A36.2,36.2,0,0,1,373,202a21.7,21.7,0,0,1,4.2-1.1,28.3,28.3,0,0,1,3.7-.6,24,24,0,0,1,2.7,0h1l-1,.2a15.1,15.1,0,0,0-2.6.4,17.5,17.5,0,0,0-3.5,1.1,32,32,0,0,0-3.9,1.6,42.2,42.2,0,0,0-6.6,4.1c-1.5,1.1-2.6,2.3-2.6,2.2l-1.4,1.2-2.2-2.8Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M337.5,267.7a20,20,0,0,1-.4-2.4c.1-.9,0-1.7.1-2.5s.4-3.3.7-5a64.5,64.5,0,0,1,2.8-9.5v.2c0-3.1-.8-6.4-.7-9.9a11.3,11.3,0,0,1,.1-2.6,25.6,25.6,0,0,1,.5-2.7,26.7,26.7,0,0,1,.9-2.6l1.3-2.4.9-1.6,2.9,2.2-.9,1.5-1.2,1.8a7.2,7.2,0,0,0-.9,2,9.4,9.4,0,0,0-.7,2.2,16,16,0,0,0-.3,2.3c-.3,3.2.1,6.5-.2,10h0v.2a66,66,0,0,0-3.5,9.1,35.9,35.9,0,0,0-1.2,4.7c-.1.8-.1,1.6-.2,2.4A10.5,10.5,0,0,0,337.5,267.7Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M361.8,115a9.4,9.4,0,0,1,9.4,9.4v96.5a9.5,9.5,0,0,1-9.4,9.4H155.1a9.5,9.5,0,0,1-9.4-9.4V124.4a9.4,9.4,0,0,1,9.4-9.4Z"
        transform="translate(-2.1 -115)"
      />
      <Rect x={158.5} y={8.2} width={186.3} height={98.83} />
      <Path
        d="M354.4,272.8l1.7-2.1a33,33,0,0,0,2.9-5.1,66.2,66.2,0,0,0,3-8l.5-1.7,3.6,1.5-.8,1.6s-2.2,3.9-4.8,7.5a32.2,32.2,0,0,1-4,4.6Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M430.8,317.3l-1.7.4-4.8,1.2a55.3,55.3,0,0,1-17.8.5,38,38,0,0,1-11.4-4,34.3,34.3,0,0,1-10.5-8.6,58.6,58.6,0,0,1-7.7-12.2c-2-4.4-4-8.8-5.9-13.4-3.5-9.2-6.1-18.4-10.6-26.3-2.1-3.9-4.5-7.6-6.6-11.2s-4.4-6.8-6.6-9.6a147.4,147.4,0,0,0-11.1-13.6,58.4,58.4,0,0,0-4.9-4.6,40.6,40.6,0,0,1,5.4,4.1c1.6,1.4,3.4,3.3,5.5,5.4a87.6,87.6,0,0,1,6.7,7.5c2.4,2.8,4.6,6,7.2,9.4s4.9,7.1,7.1,11.2c4.7,8,7.6,17.6,11.2,26.4,1.7,4.5,3.7,8.9,5.6,13.3a50,50,0,0,0,7.1,11.6,36.6,36.6,0,0,0,9.3,8.4,36,36,0,0,0,10.6,4.2,49.7,49.7,0,0,0,9.7,1.1,57.9,57.9,0,0,0,7.6-.3Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M303,173.7c6.3-6.1,9.4-2.5,40.1,21s56.7,31.9,67.4,34.2a45.1,45.1,0,0,1,18.2,8.8l46.2,88.6L421.7,343l-9.5-6-17.6-23.1s-15.4-23.6-33.4-60.6c-4.5-9.2-18.9-28.4-32.7-39.7S291.7,184.7,303,173.7Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M306.6,175c-3.7,3.4-1.1,8.8,4.5,13s8,3,11.3-.7-2.7-8.3-5.3-10.3S310.2,171.8,306.6,175Z"
        transform="translate(-2.1 -115)"
      />
      <Polygon points="482.6 220.6 397.5 243.3 393.5 228.2 473.8 195 482.6 220.6" />
      <Rect
        x={395.4}
        y={343.5}
        width={101.3}
        height={30.64}
        rx={7.3}
        transform="translate(-79.5 12.2) rotate(-14.9)"
      />
      <Rect
        x={445.2}
        y={337}
        width={50.7}
        height={30.64}
        rx={4.7}
        transform="matrix(0.97, -0.26, 0.26, 0.97, -77, 18.26)"
      />
      <Path
        d="M73.7,303.3l1.6.6a43.6,43.6,0,0,0,4.7,1.7,52.7,52.7,0,0,0,17.6,2.5,41.3,41.3,0,0,0,11.8-2.6,38.4,38.4,0,0,0,11.4-7.4,55.9,55.9,0,0,0,9-11.3c2.5-4.1,5-8.2,7.3-12.6,4.6-8.7,8.3-17.6,13.6-24.9,2.5-3.7,5.3-7.1,7.8-10.4s5.2-6.2,7.7-8.8a148.6,148.6,0,0,1,12.5-12.2,56.8,56.8,0,0,1,5.4-4,35.8,35.8,0,0,0-5.8,3.5,75,75,0,0,0-6.1,4.6c-2.3,1.9-4.9,4.1-7.5,6.7s-5.2,5.5-8.2,8.6a112.8,112.8,0,0,0-8.3,10.3c-5.7,7.4-9.6,16.6-14.2,25-2.2,4.2-4.6,8.4-7.1,12.5a47,47,0,0,1-8.3,10.8,35.1,35.1,0,0,1-10.2,7.2,36.2,36.2,0,0,1-11,3,52.3,52.3,0,0,1-9.7,0,45,45,0,0,1-7.6-1.2C76,304,73.7,303.3,73.7,303.3Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M154.7,267.8a21.4,21.4,0,0,1-1.5-2.3,35,35,0,0,1-2.3-5.4,82.4,82.4,0,0,1-2.1-8.3l-.3-1.8-3.8,1.1.7,1.7a84.4,84.4,0,0,0,3.9,8,39,39,0,0,0,3.4,5Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M216.9,175.1c-5.6-6.8-9.1-3.5-42.2,16.4s-59.9,25.2-70.8,26.3a45.5,45.5,0,0,0-19.1,6.7l-56,82.8,51,22.5L89.9,325,110,304.1s18-21.8,40.1-56.5c5.5-8.6,21.9-26.1,37-35.8S226.9,187.3,216.9,175.1Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M213.2,176c3.3,3.8,0,8.9-6,12.4s-8.3,2-11.1-2,3.6-7.9,6.4-9.6S210,172.4,213.2,176Z"
        transform="translate(-2.1 -115)"
      />
      <Path
        d="M26.1,318.5l66.4,26.1A8.2,8.2,0,0,0,103,340v-.4a8.1,8.1,0,0,0-3.6-10.1L37.2,295A8.1,8.1,0,0,0,26,298.6l-4.2,8.9A8,8,0,0,0,26.1,318.5Z"
        transform="translate(-2.1 -115)"
      />
      <Rect
        x={38.5}
        y={292.2}
        width={30.6}
        height={101.29}
        rx={7.3}
        transform="matrix(0.37, -0.93, 0.93, 0.37, -286.99, 152.58)"
      />
      <Rect
        x={14.9}
        y={308.2}
        width={30.6}
        height={50.65}
        rx={3.3}
        transform="translate(-293.3 124.8) rotate(-68.5)"
      />
    </Svg>
  );
};
