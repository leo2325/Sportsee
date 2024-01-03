import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchActivityData from '../../services/activityService';

function DailyActivities() {
  const [activityData, setActivityData] = React.useState(null);

  React.useEffect(() => {
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

  return (
    <section id='DailyActivities'>
      <ResponsiveContainer width='100%' height='100%'>
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
        <div className='DailyActivities-graph_container'>
          <BarChart
            width={702}
            height={145}
            data={adaptedData}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='id' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='kilogram' fill='#282D30' />
            <Bar dataKey='calories' fill='#E60000' />
          </BarChart>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export default DailyActivities;