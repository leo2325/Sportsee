import React, { useEffect, useState } from 'react';
import '../../styles/index.css';
import fetchUserData from '../../services/userService';
import iconCalories from '../../assets/iconCalories.svg';

function Calories() {
  
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
    <section id='Calories' className='Diet_section'>
      {userData ? (
        <>
          <div className='icon_container'>
            <img src={iconCalories} alt='icône' />
          </div>
          <div className='infos_container'>
            <p className='infoQuantity'>{(userData.keyData.calorieCount / 1000).toFixed(3)}kCal</p>
            <p className='quantityValue'>Calories</p>
          </div>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </section>
  );
}

export default Calories;