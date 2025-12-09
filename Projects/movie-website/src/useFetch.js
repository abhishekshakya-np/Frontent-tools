import { useState, useEffect } from "react";
import { mockMovies, mockMovieDetails } from "./mockData";

// setting the api link
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;
/* plz subsribe to thapa technical channel 
          https://www.youtube.com/thapatechnical
         */

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        // If API fails, use mock data
        console.log("API failed, using mock data");
        setIsLoading(false);
        if (apiParams.includes("&i=")) {
          // Single movie request
          const movieId = apiParams.split("&i=")[1];
          setMovie(mockMovieDetails[movieId] || mockMovieDetails["tt0468569"]);
        } else {
          // Search request - use mock movies
          setMovie(mockMovies);
        }
        setIsError({ show: "false", msg: "" });
      }
    } catch (error) {
      console.log("Network error, using mock data:", error);
      setIsLoading(false);
      setMovie(mockMovies);
      setIsError({ show: "false", msg: "" });
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}${apiParams}`);
    }, 1000);
    console.log("set");
    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
