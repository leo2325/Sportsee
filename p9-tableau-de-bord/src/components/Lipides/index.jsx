import React, { useEffect, useState } from 'react';
import '../../styles/index.css';
import fetchUserData from '../../services/userService';
import iconLipides from '../../assets/iconLipides.svg';

function Lipides() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Récupération de l'ID à partir de l'URL
    const userId = window.location.pathname.split('/').pop();

    // Appel du service pour obtenir les données utilisateur
    fetchUserData(userId)
      .then((data) => setUserData(data))
      .catch((error) => console.error('Erreur lors de la récupération des données utilisateur :', error));
  }, []);

  return (
    <section id='Lipides' className='Diet_section'>
      {userData ? (
        <>
          <div className='icon_container'>
            <img src={ iconLipides } alt='icône' />
          </div>
          <div className='infos_container'>
            <p className='infoQuantity'>{userData.keyData.lipidCount}g</p>
            <p className='quantityValue'>Lipides</p>
          </div>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </section>
  );
}

export default Lipides;