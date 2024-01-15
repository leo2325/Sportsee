import React from 'react';

import SayHi from '../components/SayHi'

import DailyActivities from '../components/DailyActivities'

import Calories from '../components/Calories'
import Glucides from '../components/Glucides'
import Lipides from '../components/Lipides'
import Proteines from '../components/Proteines'

import KPI from '../components/KPI'
import Objectifs from '../components/Objectifs'
import Radar from '../components/Radar'

import '../styles/index.css';

function Dashboard() {
    
    return (
        <section id='Dashboard_container'>
            <SayHi />
            <div id="graphics">
                <DailyActivities />
                <div className='Stats_container'>
                    <Objectifs />
                    <Radar />
                    <KPI />
                </div>
                <div className='Diet_container'>
                    <Calories /> 
                    <Proteines />
                    <Glucides />
                    <Lipides />
                </div>
            </div>
        </section>
    )
}
export default Dashboard