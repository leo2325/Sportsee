// Récupération des données activité quotidienne
const fetchAverageSessionsData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
      const averageSessionsData = await response.json();
      return averageSessionsData.data;
    } 
    catch (error) {
      console.error('Erreur lors de la récupération des données activité :', error);
      throw error;
    }
  };
  
  export default fetchAverageSessionsData;
  