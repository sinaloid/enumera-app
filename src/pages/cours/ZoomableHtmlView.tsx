import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { Retour } from "../../components/Retour";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./Zoom.css"
//import { locales } from "@blocknote/core";

interface ZoomableHtmlViewProps {
  description?: string;
}

const ZoomableHtmlView: React.FC<ZoomableHtmlViewProps> = ({ description }) => {
  const [zoom, setZoom] = useState(1.0);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  const editor = useCreateBlockNote({
    //dictionary: locales.fr,
  });

  useEffect(() => {
    if (description) {
      replaceBlocks();
    }
  }, [description]);

  const replaceBlocks = async () => {
    const blocks = await editor.tryParseHTMLToBlocks(description);
    editor.replaceBlocks(editor.document, blocks);
    console.log(blocks);
  };



  return (
    <div style={{ padding: "1rem" }}>
      <div className="d-flex align-items-center mb-3">
        <Retour />
        <div className="ms-auto d-flex gap-2">
          <IonButton size="small" onClick={handleZoomIn}>
            Zoom +
          </IonButton>
          <IonButton size="small" onClick={handleZoomOut}>
            Zoom -
          </IonButton>
        </div>
      </div>

      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          width: `${100 / zoom}%`,
        }}
        className="m-0 p-0 bg-gray-100"
      //dangerouslySetInnerHTML={{ __html: description || "<p>Aucune description</p>" }}
      >
        <BlockNoteView
          editor={editor}
        />
      </div>

    </div>
  );
};

export default ZoomableHtmlView;
