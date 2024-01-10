import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import fetchActivityData from '../../services/activityService';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p>{`${data.kilogram} kg`}</p>
        <p>{`${data.calories} KCal`}</p>
      </div>
    );
  }

  return null;
};

function DailyActivities() {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const userId = window.location.pathname.split('/').pop();
    const fetchData = async () => {
      try {
        const data = await fetchActivityData(userId);
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
          <XAxis dataKey='id' />
          <YAxis
            orientation='right'
            yAxisId="right"
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
            tickCount={3}
            domain={["dataMin -2", "dataMax +1"]}
            dataKey="kilogram"
          />
          <YAxis hide yAxisId="left" dataKey="calories" allowDataOverflow={true} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey='kilogram'
            yAxisId="right"
            fill='#282D30'
            radius={[50, 50, 0, 0]}
          />
          <Bar
            dataKey='calories'
            yAxisId="left"
            fill='#E60000'
            radius={[50, 50, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default DailyActivities;