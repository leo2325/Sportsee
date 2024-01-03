import React from 'react';
import logo from '../../assets/logo.svg';
import '../../styles/index.css';

function Navl() {
    return (
        <section id='Navl_container'>
                    <ul>
                        <div id='logo'>
                            <img src={logo} alt='logo entreprise' />
                        </div>
                        <li>Acceuil</li>
                        <li>Profil</li>
                        <li>Réglages</li>
                        <li>Communauté</li>
                    </ul>
        </section>
    )
}

export default Navl