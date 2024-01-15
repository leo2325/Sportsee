import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import fetchUserData from '../../services/userService';

import '../../styles/index.css';

// Définition des données du graphique
const data = [
  {
    name: 'objectifs',
    uv: 0.3,
  } 
];

// Composant React KPI
function KPI() {
  
  
  
  
  


  
  
  const [userData, setUserData] = useState(null);

  // Récupération du conteneur
  const div = document.querySelector( '#KPI' );
  
  useEffect(() => {
    // Récupération de l'ID à partir de l'URL
    const userId = window.location.pathname.split('/').pop();

    const userData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'objectif:', error);
      }
    };
    userData();
  }, []); 







  
  const uvValue = data[0] ? data[0].uv : null;

  return (
    <section id='KPI' className='Stats_section'>
      <div className="grid-container">
        <h2 className="scoreTitle">Score</h2>
        <div className="text-container">
          <p className="scoreValue">
            <span className="objectifSentence">{uvValue * 100} % </span>
            <br/>de votre objectif  
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%" className="RadialBarChartCenter">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="70%" 
            outerRadius="70%"
            startAngle={90}
            endAngle={450}
            barSize={10} 
            data={data}
          >
            {/* Configuration de l'axe des angles polaires */}
            <PolarAngleAxis
              type="number"
              domain={[0, 1]}
              angleAxisId={0}
              tick={false}
            />
            {/* Configuration du RadialBar */}
            <RadialBar
              minAngle={15}
              label={{display: 'none'}}
              background
              clockWise
              dataKey="uv"
              text="score"
              radius={[10]}
              fill="#E60000"
              cornerRadius={30 / 2}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

// Export du composant KPI
export default KPI;