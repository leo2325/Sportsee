import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchActivityData from '../../services/activityService';

function DailyActivities() {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchActivityData(18);
        setActivityData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données activité :', error);
      }
    };

    fetchData();
  }, []);

  const adaptedData = activityData
    ? activityData.sessions.map((session, index) => ({
        id: index + 1,
        kilogram: session.kilogram,
        calories: session.calories,
      }))
    : [];

  const minYKg = Math.floor(adaptedData.reduce((min, data) => Math.min(min, data.kilogram), Number.POSITIVE_INFINITY));
  const maxYKg = Math.ceil(adaptedData.reduce((max, data) => Math.max(max, data.kilogram), Number.NEGATIVE_INFINITY));

  const minYCal = Math.floor(adaptedData.reduce((min, data) => Math.min(min, data.calories), Number.POSITIVE_INFINITY));
  const maxYCal = Math.ceil(adaptedData.reduce((max, data) => Math.max(max, data.calories), Number.NEGATIVE_INFINITY));

  const yDomainKg = [minYKg, maxYKg + 1];
  const yDomainCal = [minYCal, maxYCal + 1];

  const tickCount = 3;

  return (
    <section id='DailyActivities'>
      <div id='DailyActivities-titles_container'>
        <div id='DailyActivities-title_container'>
          <h3>Activité quotidienne</h3>
        </div>
        <div id='DailyActivities-index_container'>
          <p>
            <span>.</span>Poids (kg)
          </p>
          <p>
            <span style={{ color: 'red' }}>.</span>Calories brûlées (KCal)
          </p>
        </div>
      </div>
      <ResponsiveContainer width='100%' height='70%'>
        <BarChart
          width={702}
          height={145}
          data={adaptedData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          barGap={8}
          barCategoryGap="35%"
          style={{ backgroundColor: '#FBFBFB' }}
        >
          <XAxis axisLine={false} tickLine={false} dataKey='id' />
          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
           
            tickCount={tickCount}
          />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar dataKey='kilogram' fill='#282D30' />
          <Bar dataKey='calories' fill='#E60000' />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default DailyActivities;