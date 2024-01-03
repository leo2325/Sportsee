import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import fetchPerformanceData from '../../services/performanceService';

function RadarRender() {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rechartsArray, setRechartsArray] = useState(null);

  useEffect(() => {
    fetchPerformanceData(12) // Remplacez 12 par l'ID de l'utilisateur approprié
      .then((performanceData) => {
        console.log('Données de performance reçues :', performanceData);
        setPerformanceData(performanceData);
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

      const rechartsArray = dataArray.map(({ kind, value }) => ({
        subject: kindArray[kind],
        A: value !== undefined && value !== null ? value : 0,
      }));

      setRechartsArray(rechartsArray);
    }
  }, [performanceData]);

  return (
    <section id='Radar' className='Stats_section'>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={rechartsArray || []}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>

      {error ? (
        <p>Erreur : {error}</p>
      ) : loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </section>
  );
}

export default RadarRender;