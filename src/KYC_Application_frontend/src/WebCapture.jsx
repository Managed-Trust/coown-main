// WebcamCapture.jsx
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

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
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default WebcamCapture;
