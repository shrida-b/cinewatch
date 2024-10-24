import axios from "axios";

export const searchMovies = async (title, page) => {
  const options = {
    method: 'GET',
    url: 'https://movie-database-alternative.p.rapidapi.com/',
    params: {
      s: title,     // Use the 'title' parameter
      r: 'json',
      page: page.toString()  // Ensure 'page' is a string
    },
    headers: {
      'x-rapidapi-key': '2067b69af2msh4a8f5cf136fc65ep1d4867jsn42d3f0f58bdd',
      'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Unexpected API response');
    }
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// const options = {
//   method: 'GET',
//   url: 'https://movie-database-alternative.p.rapidapi.com/',
//   params: {
//     s: 'Avengers Endgame',
//     r: 'json',
//     page: '1'
//   },
//   headers: {
//     'x-rapidapi-key': '2067b69af2msh4a8f5cf136fc65ep1d4867jsn42d3f0f58bdd',
//     'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {