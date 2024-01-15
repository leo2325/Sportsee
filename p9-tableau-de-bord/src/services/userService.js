// Récupération des données utilisateurs
const fetchUserData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    const userData = await response.json();
    return userData.data;
  } 
  catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur :', error);
    throw error;
  }
};

export default fetchUserData; 
