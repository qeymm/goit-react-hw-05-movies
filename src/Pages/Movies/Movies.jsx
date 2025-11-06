import { Loader } from 'components/Loader/Loader';
import styles from 'Pages/Home/Home.module.css';
import moviesStyles from './Movies.module.css';
import { useState, useEffect } from 'react';
import { searchMovies } from './../../Api/apiService';
import { useSearchParams, useLocation, Link } from 'react-router';
import { SearchBar } from './../../components/SearchBar/SearchBar';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? '';
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (movieName === '') {
      return;
    }
    setMoviesList([]);
    setIsLoading(true);

    searchMovies(movieName).then(data => {
      if (!data.results.length) {
        setIsLoading(false);
        setError(true);
        return console.log(
          'There is no movies with this request. Please, try again'
        );
      }
      setError(false);
      setMoviesList(data.results);
      setIsLoading(false);
    });
  }, [movieName]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };

  const getRatingStars = rating => {
    const stars = Math.round(rating / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <main>
      <SearchBar onSubmit={handleSubmit} />
      {error && (
        <p className={moviesStyles.errorMessage}>
          There is no movies with this request. Please, try again
        </p>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.movieList}>
          {moviesList.map(movie => {
            return (
              <li key={movie.id} className={styles.movieCard}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                  className={styles.movieLink}
                >
                  <div className={styles.moviePosterWrapper}>
                    <img
                      className={styles.moviePoster}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : 'http://www.suryalaya.org/images/no_image.jpg'
                      }
                      alt={movie.original_title || movie.name}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>
                      {movie.original_title || movie.name}
                    </h3>
                    <div className={styles.movieRating}>
                      <span className={styles.ratingStars}>
                        {getRatingStars(movie.vote_average || 0)}
                      </span>
                      <span className={styles.ratingValue}>
                        {(movie.vote_average || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default Movies;
