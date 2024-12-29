import { useState, useEffect, Dispatch } from "react";

export function useDebounce<T>(
  initialValue: T,
  time?: number
): [T, T, Dispatch<T>] {
  const debounceTime = time || 500;
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, debounceTime]);
  return [debouncedValue, value, setValue];
}
