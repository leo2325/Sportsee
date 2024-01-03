// Récupération des données activité quotidienne
const fetchActivityData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}/activity`);
      const activityData = await response.json();
      return activityData.data;
    } 
    catch (error) {
      console.error('Erreur lors de la récupération des données de performance :', error);
      throw error;
    }
  };
  
  export default fetchActivityData;
  