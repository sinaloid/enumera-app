import React from "react";
interface Props {
  percentage : any
}
const DynamicSVG : React.FC<Props> = ({ percentage }) => {
  // Clamp the percentage between 0 et 100
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));
  const fullHeight = 128; // Hauteur maximale de la partie rouge
  const height = fullHeight * (clampedPercentage / 100); // Hauteur proportionnelle

  // Déterminer les couleurs en fonction du pourcentage
  const getColor = (percentage : any) => {
    if (percentage < 50) return "#FF0000"; // Rouge
    if (percentage < 75) return "#9DCA91"; // Vert clair
    return "#41AD48"; // Vert foncé
  };

  const color = getColor(clampedPercentage); // Couleur calculée

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base */}
      <path
        d="M100 135.714V192.857"
        stroke={color} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 192.857H150"
        stroke={color} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Coins */}
      <path
        d="M50 7.14285H7.14282V50C7.14282 73.6693 26.3307 92.8571 50 92.8571V7.14285Z"
        stroke={color} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150 7.14285H192.857V50C192.857 73.6693 173.67 92.8571 150 92.8571V7.14285Z"
        stroke={color} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Contour toujours visible avec la couleur dynamique */}
      <path
        d="M50 7.14285V85.7143C50 113.329 72.3857 135.714 100 135.714C127.614 135.714 150 113.329 150 85.7143V7.14285H50Z"
        stroke={color} // Contour dynamique
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Partie rouge (remplissage dynamique) */}
      <clipPath id="clip-red-part">
        <rect x="50" y={135.714 - height} width="100" height={height} />
      </clipPath>
      <path
        d="M50 7.14285V85.7143C50 113.329 72.3857 135.714 100 135.714C127.614 135.714 150 113.329 150 85.7143V7.14285H50Z"
        fill={color} // Remplissage dynamique
        clipPath="url(#clip-red-part)"
        stroke={color} // Contour dynamique pour la partie rouge
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Affichage du pourcentage */}
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontSize="18"
        fill="#2507DB" // Couleur bleue pour le texte
        fontWeight="bold"
      >
        {`${clampedPercentage}%`}
      </text>
    </svg>
  );
};

export default DynamicSVG;
