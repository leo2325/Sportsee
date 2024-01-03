import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Intensité',
    A: 90
  },
  {
    subject: 'Vitesse',
    A: 200
  },
  {
    subject: 'Force',
    A: 50
  },
  {
    subject: 'Endurance',
    A: 40
  },
  {
    subject: 'Energie',
    A: 80
  },
  {
    subject: 'Cardio',
    A: 120
  },
];

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

      const rechartsObj = {};
      dataArray.forEach(({ kind, value }) => {
        const kindName = kindArray[kind];
        rechartsObj[kindName] = value;
      });

      setRechartsArray(rechartsObj);
    }
  }, [performanceData]);

  return (
    <section id='Radar' className='Stats_section'>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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
      ) : rechartsArray ? (
        // Ici, vous pouvez ajouter le code que vous souhaitez pour afficher les données,
        // par exemple, afficher un autre graphique ou des statistiques.
        <div>
          {/* Le bloc ul et la boucle map pour la liste ont été supprimés */}
        </div>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </section>
  );
}

export default RadarRender;