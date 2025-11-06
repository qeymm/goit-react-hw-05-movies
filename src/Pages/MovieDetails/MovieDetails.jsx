import { useParams, useLocation, Link, Outlet } from 'react-router';
import { getMovieDetails } from '../../Api/apiService';
import { useState, useEffect } from 'react';
import styles from './MovieDetails.module.css';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const location = useLocation();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId).then(data => setMovieDetail(data));
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetail;
  const score = vote_average * 10;
  const scoreToFixed = score.toFixed(2);
  return (
    <main>
      <button type="button" className={styles.button}>
        <Link
          to={location.state?.from ?? '/'}
          className={styles.linkBack}
        >
          <HiArrowNarrowLeft size={16} />
          Go back
        </Link>
      </button>
      <div className={styles.movieBox}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : `http://www.suryalaya.org/images/no_image.jpg`
          }
          width={320}
          height={380}
          loading="lazy"
          alt="poster"
        />
        <div className={styles.movieInfo}>
          <h2 className={styles.title}>{original_title}</h2>
          <h3>User score: {scoreToFixed}%</h3>
          <h3>Overview</h3>
          <p>{overview} </p>
          <h3>Genres</h3>
          <ul className={styles.genresList}>
            {genres &&
              genres.length &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
      <div className={styles.infoBox}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast" state={{ ...location.state }}>
              Cast
            </Link>
          </li>
          <li>
            {' '}
            <Link to="reviews" state={{ ...location.state }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </main>
  );
};

export default MovieDetails;
