import propTypes from 'prop-types';
import styles from './FilterOptions.module.css';

const filterOptions = ['ALL', 'TO WATCH', 'WATCHED'];

const FilterOptions = ({ filter, setFilter }) => (
  <div className="pb-1">
    <section className="flex flex-row gap-8 mb-4 mx-1 pb-1 border-b-2 border-gray-500 sticky bg-primary z-50" style={{ top: '4.1rem' }}>
      {filterOptions.map((value) => (
        <div role="button" tabIndex={0} onKeyDown={() => { }} onClick={() => setFilter(value)} className={`${styles.filterOption} ${filter === value ? styles.selected : ''} text-lg relative text-white text-opacity-70 group cursor-pointer`} key={value}>
          <span className={styles.optionName}>{value}</span>
          <div className={styles.optionHighlight} />
        </div>
      ))}
    </section>
  </div>
);

export default FilterOptions;

FilterOptions.propTypes = {
  filter: propTypes.string.isRequired,
  setFilter: propTypes.func.isRequired,
};
