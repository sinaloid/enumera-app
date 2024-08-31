import { IonButton } from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { Retour } from "../../components/Retour";

interface ZoomableIframeProps {
  description?: string;
}

const ZoomableIframe: React.FC<ZoomableIframeProps> = ({ description }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState<number>(1.0);
  const history = useHistory();

  useEffect(() => {
    if (iframeRef.current && description) {
      const blob = new Blob([description], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      iframeRef.current.src = url;

      // Clean up URL object when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [description]);

  useEffect(() => {
    if (iframeRef.current?.contentWindow?.document?.body) {
      const iframeBody = iframeRef.current.contentWindow.document.body;
      iframeBody.style.transform = `scale(${zoom})`;
      iframeBody.style.transformOrigin = "0 0";
      iframeBody.style.width = `${100 / zoom}%`; // Adjust width for scaling
      iframeBody.style.height = `${100 / zoom}%`; // Adjust height for scaling
    }
  }, [zoom]);

  const handleZoomIn = () =>
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3.0));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  return (
    <div>
      <div className="d-flex mt-3">
        <Retour />
        <div className="ms-auto ">
          <div
            className="btn btn-sm bg-primary-light text-primary"
            onClick={handleZoomIn}
          >
            Zoom +
          </div>
          <div
            className="btn btn-sm bg-primary-light text-primary"
            onClick={handleZoomOut}
            style={{ marginLeft: "10px" }}
          >
            Zoom -
          </div>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          overflow: "auto",
        }}
        title="Zoomable Content"
      />
    </div>
  );
};

export default ZoomableIframe;
