import { useState, useEffect } from "react";

const TimerWithVisibility = () => {
    const [seconds, setSeconds] = useState(0); // État pour stocker le temps écoulé en secondes
    const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la page
  
    // Fonction pour formater les secondes en HH:MM:SS
    const formatTime = (totalSeconds: any) => {
      const hours = Math.floor(totalSeconds / 3600); // Calcul des heures
      const minutes = Math.floor((totalSeconds % 3600) / 60); // Calcul des minutes
      const secs = totalSeconds % 60; // Calcul des secondes restantes
  
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    };
  
    useEffect(() => {
      // Fonction de gestion de la visibilité
      const handleVisibilityChange = () => {
        setIsVisible(document.visibilityState === "visible");
      };
  
      // Ajouter l'écouteur pour les changements de visibilité
      document.addEventListener("visibilitychange", handleVisibilityChange);
  
      // Nettoyage à la destruction du composant
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);
  
    useEffect(() => {
      let interval: any;
      if (isVisible) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      // Nettoyer l'intervalle à chaque changement de visibilité
      return () => clearInterval(interval);
    }, [isVisible]);
  
    return (
      <div>
        <h1 className="text-center">{formatTime(seconds)}</h1>
      </div>
    );
  };

export default TimerWithVisibility