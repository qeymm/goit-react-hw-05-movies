import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import styles from './Home.module.css';
import { getTrending } from '../../Api/apiService';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrending().then(data => {
      setTrendMovies(data.results);
      setIsLoading(false);
    });
  }, []);

  const getRatingStars = rating => {
    const stars = Math.round(rating / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <main>
      <h2 className={styles.title}>Top Movies for today</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.movieList}>
          {trendMovies.map(movie => (
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
          ))}
        </ul>
      )}
    </main>
  );
};
export default Home;
