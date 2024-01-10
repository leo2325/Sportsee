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

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const sessionLength = payload[0].payload.sessionLength;
    return (
      <div className="custom-tooltip">
        {`${sessionLength} min`}
      </div>
    );
  }

  return null;
}

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
        >
          <Tooltip 
            wrapperStyle={{ zIndex: 1000 }}
            content={<CustomTooltip />}
          />
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
            tickLine={ false }  // Désactive les lignes de grille
            domain={['dataMin', 'dataMax']} 
          />
          <Line 
            type="monotone" 
            dataKey="sessionLength"  // Utilisez sessionLength comme dataKey
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