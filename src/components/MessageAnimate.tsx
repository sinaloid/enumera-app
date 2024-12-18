import { IonIcon, IonModal, IonContent } from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import React, { useState, useRef, useEffect } from "react";
import { useAuth, useRequest, useNavigate, useDataProvider } from "../hooks";
import { Classe, Periode } from "../pages/matiere/components";
import useRequestMatiere from "../pages/matiere/hooks/useRequest";
import Container from "./Container";
import { ClasseSvg, SuccessSvg } from "./svg";
import { endPoint, request } from "../services";
import { useHistory } from "react-router";

const MessageAnimate: React.FC = () => {
  const { user } = useAuth();

  const { get } = useRequest();
 
  const [messages, setMessages]: any = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    get(endPoint.messagesDefilants, setMessages, () => {});
  }, [user]);
  useEffect(() => {
    // Démarre l'intervalle pour changer de message toutes les secondes
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // 1000 ms = 1 seconde

    // Nettoyage de l'intervalle à la destruction du composant
    return () => clearInterval(interval);
  }, [messages.length]);

  const onClickMessage = (e: any) => {
    e.preventDefault();
    history.push("/messages/" + messages[currentIndex]?.slug);
  };
  return (
    <div className="text-center" onClick={onClickMessage}>
      <span
        key={currentIndex}
        className="fw-bold me-auto animate-charcter zoom-text"
      >
        {messages[currentIndex]?.titre}
      </span>
    </div>
  );
};

export default MessageAnimate;
