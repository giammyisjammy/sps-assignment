import { useEffect, useState } from 'react';

import { useDebounce } from 'react-use';

const debounceTimeMs = 300;

export type SearchProps = {
  onChange: (minPrice: number) => void;
};

export default function Search({ onChange }: SearchProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [searchKey, setSearchKey] = useState(0);
  const [debouncedKey, setDebouncedKey] = useState(0);
  useDebounce(
    () => {
      // Typing stopped
      setDebouncedKey(searchKey);
    },
    debounceTimeMs,
    [searchKey]
  );

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        await onChange(debouncedKey);
      } catch (error) {
        // noop
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [debouncedKey]);

  return (
    <div className="search">
      <label htmlFor="minPrice">Minimum price: </label>
      <input
        placeholder="Minimum price"
        name="minPrice"
        type="number"
        aria-label="search"
        min={0}
        value={searchKey}
        onChange={({ currentTarget }) => {
          setIsLoading(true);
          setSearchKey(parseFloat(currentTarget.value));
        }}
      />
      {isLoading && <span className="loading">loading...</span>}
    </div>
  );
}
