import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import {
  Button,
} from '@mui/material';
const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "user",
        }}
        style={{borderRadius:'15px'}}
      />
      <Button onClick={capture}>Capture Photo</Button>
    </div>
  );
};

export default WebcamCapture;
