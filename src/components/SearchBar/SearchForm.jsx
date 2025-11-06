import PropTypes from 'prop-types';
import styles from '../Styles/Element.module.css';

const SearchForm = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className={styles.form}>
    {children}
  </form>
);

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
