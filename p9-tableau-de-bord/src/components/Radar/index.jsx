import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

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
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rechartsArray, setRechartsArray] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/user/12/performance')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Données de performance reçues :', data);
        setPerformanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de performance :', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (performanceData && performanceData.data) {
      const kindArray = performanceData.data.kind;
      const dataArray = performanceData.data.data;

      // Définir l'ordre souhaité
      const order = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio'];

      // Filtrer et trier les données selon l'ordre défini
      const filteredAndSortedData = order.map(subject => {
        const dataEntry = dataArray.find(entry => kindArray[entry.kind] === subject);
        return { subject: dataKeyValue(subject), A: dataEntry ? dataEntry.value : 0 };
      });

      setRechartsArray(filteredAndSortedData);
    }
  }, [performanceData]);

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