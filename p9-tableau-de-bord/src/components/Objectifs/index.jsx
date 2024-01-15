import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import fetchAverageSessionsData from '../../services/average-sessionsService';
import '../../styles/index.css';

const dataKeyValue = (day) => {
  switch (day) {
    case 1:
      return 'L';
    case 2:
      return 'M';
    case 3:
      return 'M';
    case 4:
      return 'J';
    case 5:
      return 'V';
    case 6:
      return 'S';
    case 7:
      return 'D';
    default:
      return day;
  }
};
// Fonction - contenu personnalisé pour le composant Tooltip (Arguments 'active' & 'payload' fournis par le composant parent LineChart)
function CustomTooltip({ active, payload }) {
  // Si tooltip actif & payload existe & longueur > 0 (Garantit que les données nécessaires pour afficher le tooltip sont disponibles)
  if (active && payload && payload.length) {
    // Récupèration de la durée de la session à partir des données de payload
    const sessionLength = payload[0].payload.sessionLength;
    // affiche la durée de la session dans un élément de tooltip personnalisé
    return (
      <div className="custom-tooltip"> {`${sessionLength} min`} </div>
    );
  }
  // Si conditions pas remplies -> ne pas afficher de tooltip
  return null;
}

function Objectifs() {
  // Utilisation du hook useState: créer une var d'état dans le composant Objectifs. 
  // useState retourne un tableau avec 2 éléments: (1) valeur état actuel de la variable, (2) fonction de mis à jour variable d'état. 
  const [averageSessionsData, setAverageSessionsData] = useState(null);
  // Récupération du conteneur
  const div = document.querySelector( '#Objectifs' );
  
  useEffect(() => {
    const userId = window.location.pathname.split('/').pop();
    const fetchData = async () => {
      try {
        const data = await fetchAverageSessionsData(userId);
        setAverageSessionsData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'objectif:', error);
      }
    };
    fetchData();
  }, []); 

  const chartData = averageSessionsData
    ? averageSessionsData.sessions.map((session) => ({
        name: dataKeyValue(session.day), 
        sessionLength: session.sessionLength,
        fill: '#FF0000',
      }))
    : [];

  return (
    <section id='Objectifs' className='Stats_section'>
      <h2>Durée moyenne des sessions</h2>
      <ResponsiveContainer 
        width="100%" 
        height="72%"
      >
        <LineChart  
          data={chartData}
          strokeWidth={1}
          onMouseMove={(e) => {
            if (e.isTooltipActive === true) {
              // Valeur de la propriété 'Element.clientWidth' = largeur de l'élément (Largeur inclue: padding, exclut: bordures, et (éventuelles) barres de défilement verticales.
              const windowWidth = div.clientWidth;
              // calcul du % de la position de la souris / la largeur du graphique
              const mouseXpercentage = Math.round((e.activeCoordinate.x / windowWidth) * 100);
              // dégradé linéaire en fonction de la position horizontale de la souris sur le graphique.
              div.style.background = `linear-gradient(90deg, rgb(255, 0, 0) ${mouseXpercentage}%, rgba(175,0,0,1.5) ${mouseXpercentage}%, rgba(175,0,0,1.5) 100%)`;
            }
          }}
          onMouseLeave={() => {
            // reotur valeur initiale
            div.style.background = 'rgb(255, 0, 0)';
          }}
        >

         <defs>
            <linearGradient x1="309.906" y1="-1.97779" x2="-47.7754" y2="-1.97779" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="0.810441" stopColor="white" stopOpacity="0.403191" />
            </linearGradient>
          </defs>
          
          <XAxis 
            type="category"
            dataKey="name" 
            tickFormatter={dataKeyValue}
            tickLine={false} 
            stroke="none"
            padding={{ left:2, right:2}}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#FFFFFF', opacity: '0.5' }}
            axisLine={{ stroke: '#FF0000' }}  
          />
          <YAxis 
            hide 
            axisLine={{ stroke: '#FF0000' }}
            tickLine={ false }
            domain={['dataMin', 'dataMax']} 
          />
          <Line 
            type="monotone" 
            dataKey="sessionLength"
            stroke="#FFFFFF" 
            opacity={'0.5'}
            strokeWidth={2} 
            dot={false}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{
              stroke: 'rgba(0)',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default Objectifs;