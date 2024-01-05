import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchAverageSessionsData from '../../services/average-sessionsService';
import '../../styles/index.css';

function Objectifs() {
  const [averageSessionsData, setAverageSessionsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAverageSessionsData(18); // Remplacez 18 par ${id} ?
        setAverageSessionsData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'activité :', error);
      }
    };

    fetchData();
  }, []);

  const chartData = averageSessionsData
    ? averageSessionsData.sessions.map((session) => ({
        name: session.day, 
        pv: session.sessionLength,
        fill: '#FF0000',
      }))
    : [];

 

  return (
    <section id='Objectifs' className='Stats_section'>
      <ResponsiveContainer 
  width="100%" 
  height="72%"
>
  <LineChart  
    data={chartData}
  >
    {/* ... autres composants d'axe et de grille ... */}
    <XAxis 
      dataKey="name" 
      stroke="#FFFFFF"   // Couleur du texte de l'axe des X
      tick={{ fill: '#FFFFFF', opacity: '0.5' }}
      axisLine={{ stroke: '#FF0000' }}  // Couleur de la barre de l'axe des X
      tickLine={false}  // Désactive les lignes de grille
    />

    <YAxis 
      hide  // Cache l'axe des Y à l'écran
      axisLine={{ stroke: '#FF0000' }}
      tickLine={false}  // Désactive les lignes de grille
      domain={['dataMin', 'dataMax']}  // Définir le domaine pour correspondre aux valeurs min et max des données
    />

    <Line 
      type="monotone" 
      dataKey="pv" 
      stroke="#FFFFFF" 
      opacity={'0.5'}
      strokeWidth={2} 
      dot={false}
    />

  </LineChart>
</ResponsiveContainer>
    </section>
  );
}

export default Objectifs;