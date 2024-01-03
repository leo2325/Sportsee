import React, { useEffect, useState } from 'react';
import '../../styles/index.css';
import fetchUserData from '../../services/userService';

function SayHi() {
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
    <div id="sayHi">
      {userData ? (
        <>
          <h1> Bonjour <span>{userData.userInfos.firstName}</span> </h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default SayHi;