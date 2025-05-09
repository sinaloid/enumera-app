import React, { useEffect, useRef } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { JitsiMeeting } from '@jitsi/react-sdk'; // Assure-toi d’avoir installé ce package
import { ContentHeader } from '../../components/ContentHeader';
import { Container } from '../../components';

const JitsiPage: React.FC = () => {
  const iframeRef: any = useRef(null);

  useEffect(() => {
    let data :any = localStorage.getItem('meet_link');
    data = data ? JSON.parse(data) : {}
    const domain = 'meet.enumera.tech';
    const token = data.meet_token; // <- remplace avec le token réel
    const room = data.meet?.jitsi_room_name;
    const url = data.lien;

    iframeRef.current.src = url;
    iframeRef.current.style.height = '600px';
    iframeRef.current.style.borderRadius = '12px';
    iframeRef.current.style.border = 'none';
    iframeRef.current.style.width = '100%';
  }, []);
  return (
    <IonPage>
      <ContentHeader idPopover={"Classe Virtuelle"} />
      <IonContent>
        <Container>
          <div
            className="w-full max-w-4xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-lg0"
            style={{ minHeight: '80vh' }}
          >
            {/**
            <h2 className="text-2xl font-semibold text-center mb-4">Session Mathématique</h2>
              * 
              */}
            <iframe
              ref={iframeRef}
              allow="camera; microphone; display-capture"
              title="Jitsi Meeting"
            />
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default JitsiPage;
