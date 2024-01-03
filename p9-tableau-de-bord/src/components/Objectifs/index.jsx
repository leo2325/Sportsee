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

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <section id='Objectifs' className='Stats_section'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={style} />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default Objectifs;