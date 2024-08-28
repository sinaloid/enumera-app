import { IonButton } from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";

interface ZoomableIframeProps {
  description?: string;
}

const ZoomableIframe: React.FC<ZoomableIframeProps> = ({ description }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState<number>(1.0);

  useEffect(() => {
    if (iframeRef.current && description) {
      const blob = new Blob([description], { type: 'text/html' });
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
      iframeBody.style.transformOrigin = '0 0';
      iframeBody.style.width = `${100 / zoom}%`; // Adjust width for scaling
      iframeBody.style.height = `${100 / zoom}%`; // Adjust height for scaling
    }
  }, [zoom]);

  const handleZoomIn = () => setZoom(prevZoom => Math.min(prevZoom + 0.1, 3.0));
  const handleZoomOut = () => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.1));

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <IonButton onClick={handleZoomIn}>Zoom +</IonButton>
        <IonButton onClick={handleZoomOut} style={{ marginLeft: '10px' }}>Zoom -</IonButton>
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
