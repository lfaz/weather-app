import { FormEvent, useState } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  className?: string;
  isLoading?: boolean;
  onSearch: (query: string) => void;
}

export function SearchInput({ className, isLoading = false, onSearch }: SearchInputProps) {
  const [query, setQuery] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <form className={`${styles.form} ${className ?? ''}`} onSubmit={handleSubmit} role="search">
      <label className={styles.label} htmlFor="location-search">
        Search location
      </label>
      <div className={styles.controls}>
        <input
          id="location-search"
          className={styles.input}
          type="search"
          placeholder="City name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? '...' : 'Go'}
        </button>
      </div>
    </form>
  );
}
