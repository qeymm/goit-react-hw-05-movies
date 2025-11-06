import styles from 'components/Styles/Element.module.css';
import { BsSearch } from 'react-icons/bs';
import SearchForm from './SearchForm';
import SearchInput from './SearchInput';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => (
  <div className={styles.searchBox}>
    <SearchForm onSubmit={onSubmit}>
      <SearchInput />
      <button
        type="submit"
        aria-label="search button"
        className={styles.buttonIcon}
      >
        <BsSearch />
      </button>
    </SearchForm>
  </div>
);
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
