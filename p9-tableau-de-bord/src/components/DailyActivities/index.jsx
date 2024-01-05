import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchActivityData from '../../services/activityService';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p>{`Poids: ${data.kilogram} kg`}</p>
        <p>{`Calories: ${data.calories} KCal`}</p>
      </div>
    );
  }

  return null;
};

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

  const yTicks = [0, 300, 600];

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
          <CartesianGrid
            height="100%"
            strokeDasharray="3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis axisLine={false} tickLine={false} dataKey='id' />
          <YAxis
            orientation="right"
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
            ticks={yTicks}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar dataKey='kilogram' fill='#282D30' radius={[5, 5, 0, 0]} />
          <Bar dataKey='calories' fill='#E60000' radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default DailyActivities;