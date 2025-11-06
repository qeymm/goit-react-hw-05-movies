import { ColorRing } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <ColorRing
      visible={true}
      height="160"
      width="160"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#E50914', '#D81F26', '#FFD700', '#FFFFFF', '#CFCFCF']}
    />
  </div>
);
