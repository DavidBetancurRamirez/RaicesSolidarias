import React from 'react';

export const handleChange = <T>(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | { name: string; value: string | number | boolean },
  setState: React.Dispatch<React.SetStateAction<T>>,
  isNumber?: boolean,
) => {
  const name = 'target' in e ? e.target.name : e.name;
  const value = 'target' in e ? e.target.value : e.value;

  const keys = name.split('.');
  if (keys.length === 1) {
    setState((prev) => ({
      ...prev,
      [name]: isNumber ? Number(value) : value,
    }));
    return;
  }

  const [parentKey, childKey] = keys;
  setState((prev) => ({
    ...prev,
    [parentKey]: {
      ...(prev[parentKey as keyof T] as Record<string, unknown>),
      [childKey]: value,
    },
  }));
};
