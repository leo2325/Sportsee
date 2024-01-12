import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import fetchPerformanceData from '../../services/performanceService'

const dataKeyValue = (subject) => {
  switch (subject) {
    case 'intensity':
      return 'Intensité';
    case 'speed':
      return 'Vitesse';
    case 'strength':
      return 'Force';
    case 'endurance':
      return 'Endurance';
    case 'energy':
      return 'Énergie';
    case 'cardio':
      return 'Cardio';
    default:
      return subject;
  }
};

function RadarRender() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rechartsArray, setRechartsArray] = useState(null);

  useEffect(() => {
    const userId = window.location.pathname.split('/').pop();
    // Appel du service pour obtenir les données utilisateur
    fetchPerformanceData(userId)
    
      .then((data) => {
        const kindArray = data.kind;
        const dataArray = data.data;

        // Définir l'ordre souhaité
        const order = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio'];

        // Filtrer et trier les données selon l'ordre défini
        const filteredAndSortedData = order.map(subject => {
          const dataEntry = dataArray.find(entry => kindArray[entry.kind] === subject);
          return { subject: dataKeyValue(subject), A: dataEntry ? dataEntry.value : 0 };
        });
        setLoading(false);
        setRechartsArray(filteredAndSortedData);
      })
      .catch((error) => 
        console.error('Erreur lors de la récupération des données utilisateur :', error));
        setError(error);
        setLoading(false);
  }, []);

  return (
    <section id='Radar' className='Stats_section'>
      <ResponsiveContainer 
        width="100%" 
        height="100%"
      >
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius="70%" 
          data={rechartsArray}
        >
          <PolarGrid 
            gridType="polygon"
          />

          <PolarAngleAxis 
            dataKey="subject"
            tickFormatter={dataKeyValue}
            stroke="white"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
      
          <Radar 
            dataKey="A" 
            stroke="#FF0101" 
            fill="#FF0101" 
            fillOpacity={0.7} 
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {error ? (
        <p>Erreur : {error}</p>
      ) : loading ? (
        <p>Chargement en cours...</p>
      ) : rechartsArray ? (
        <div></div>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </section>
  );
}

export default RadarRender;