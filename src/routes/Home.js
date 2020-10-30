import React from 'react';
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";
//import propTypes from 'prop-types';

class Home extends React.Component{

  //state is an object
  state = {
    isLoading : true, 
    movies : []
  };
  getMovies = async() => {
    const {
      data: {
        data:{movies}
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by"); 
    this.setState({movies , isLoading :false});
    
  }
  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return (
      <section className="body">
        {isLoading ? (
        <div className = "loader">
            <span className="loader_text"> Loading..</span>
        </div>
        ):(
          <div className = "movies">
            {movies.map(movie =>(
              <Movie 
                key ={movie.id}
                id ={movie.id} 
                year ={movie.year}
                title ={movie.title} 
                summary ={movie.summary} 
                poster ={movie.medium_cover_image}
                genres = {movie.genres}
                />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
