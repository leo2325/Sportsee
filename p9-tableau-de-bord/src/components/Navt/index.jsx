import React from 'react';
// Style

// Fichiers icônes
import iconBike from '../../assets/iconBike.svg';
import iconYogi from '../../assets/iconYogi.svg';
import iconSwim from '../../assets/iconSwim.svg';
import iconGym from '../../assets/iconGym.svg';

function Navt() {
    return (
        <section id='Navt_container'>
            <div>

                <div id='navt_container'>
                    <ul>
                        <li>
                            <img src={ iconBike } alt='icône' />
                        </li>
                        <li>
                            <img src={ iconYogi } alt='icône' />
                        </li>
                        <li>
                            <img src={ iconSwim } alt='icône' />
                        </li>
                        <li>
                            <img src={ iconGym } alt='icône' />
                        </li>
                    </ul>
                </div>

                <div id='copyright'>
                    <p>Copyright, SportSee2020</p>
                </div>

            </div>
        </section>
    )
}

export default Navt