import { useEffect, useState } from "preact/hooks";

export type TLocalStorageHandler<T> = [
  T,
  TUnqStateUpdater<T>,
  () => T,
  () => void
];

export type TUnqStateUpdater<T> = (value: T | ((prevState: T) => T)) => void;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): TLocalStorageHandler<T> {
  console.log("useLocalStorage called", key, initialValue);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return item as T;
      }
    } catch (error) {
      console.error("Failed to parse local storage item", error);
      return initialValue; // Return initialValue if parsing fails
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    console.log("setValue called", value);
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  const deleteValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        try {
          const parsedItem = JSON.parse(item);
          setStoredValue(parsedItem);
        } catch {
          setStoredValue(item as unknown as T);
        }
      } else {
        setValue(initialValue);
      }
    } catch (error) {
      console.error("Failed to parse local storage item", error);
    }
  }, [key]);

  const getStoredValue = () => storedValue;

  return [storedValue, setValue, getStoredValue, deleteValue];
}
