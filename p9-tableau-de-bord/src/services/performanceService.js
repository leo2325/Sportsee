const fetchPerformanceData = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
    const performanceData = await response.json();
    return performanceData.data;
  } 
  catch (error) {
    console.error('Erreur lors de la récupération des données de performance :', error);
    throw error;
  }
};

export default fetchPerformanceData;