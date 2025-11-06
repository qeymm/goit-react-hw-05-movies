import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getReviews } from 'Api/apiService';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getReviews(movieId).then(data => setReviewsList(data.results));
  }, [movieId]);

  return (
    <>
      {reviewsList.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviewsList.map(({ author, content, id }) => (
            <li key={id} className={styles.reviewItem}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>
          Sorry, we don't have any review for this movie
        </p>
      )}
    </>
  );
};
export default Reviews;
