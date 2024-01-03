import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

import '../../styles/index.css';

const data = [
    {
      name: 'objectifs',
      uv: 0.3,
      pv: 1,
      fill: '#FF0000',
    },
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

function KPI() {
    return (
        <section id='Objectifs' className='Stats_section'>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="50%" barSize={10} data={data}>
                <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="uv"
                    text="score"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </RadialBarChart>
            </ResponsiveContainer>
        </section>
    )
}

export default KPI