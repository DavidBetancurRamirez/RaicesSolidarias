import React from 'react';

export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const handleChange = <T>(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | { name: string; value: string | number | boolean },
  setState: React.Dispatch<React.SetStateAction<T>>,
  isNumber?: boolean,
) => {
  const name = 'target' in e ? e.target.name : e.name;
  const value = 'target' in e ? e.target.value : e.value;
  const safeValue = isNumber ? Number(value) : value;

  const keys = name.split('.');
  if (keys.length === 1) {
    setState((prev) => ({
      ...prev,
      [name]: safeValue,
    }));
    return;
  }

  const [parentKey, childKey] = keys;
  setState((prev) => ({
    ...prev,
    [parentKey]: {
      ...(prev[parentKey as keyof T] as Record<string, unknown>),
      [childKey]: safeValue,
    },
  }));
};

/**
 * Handles changes to array items in form state
 * @param arrayKey - The key of the array in the state (e.g., 'goals')
 * @param index - The index of the item to update
 * @param fieldKey - The field to update within the item (e.g., 'name', 'value')
 * @param value - The new value
 * @param setState - The setState function
 * @param isNumber - Whether to convert the value to a number
 */
export const handleArrayChange = <T>(
  arrayKey: keyof T,
  index: number,
  fieldKey: string,
  value: string | number,
  setState: React.Dispatch<React.SetStateAction<T>>,
  isNumber?: boolean,
) => {
  setState((prev) => {
    const array = prev[arrayKey] as unknown[];
    const newArray = [...array];
    const safeValue = isNumber ? Number(value) : value;
    newArray[index] = {
      ...(newArray[index] as Record<string, unknown>),
      [fieldKey]: safeValue,
    };

    return {
      ...prev,
      [arrayKey]: newArray,
    };
  });
};

/**
 * Adds a new item to an array in the state
 * @param arrayKey - The key of the array in the state
 * @param newItem - The new item to add
 * @param setState - The setState function
 */
export const handleArrayAdd = <T>(
  arrayKey: keyof T,
  newItem: unknown,
  setState: React.Dispatch<React.SetStateAction<T>>,
) => {
  setState((prev) => {
    const array = prev[arrayKey] as unknown[];
    return {
      ...prev,
      [arrayKey]: [...array, newItem],
    };
  });
};

/**
 * Removes an item from an array in the state
 * @param arrayKey - The key of the array in the state
 * @param index - The index of the item to remove
 * @param setState - The setState function
 */
export const handleArrayRemove = <T>(
  arrayKey: keyof T,
  index: number,
  setState: React.Dispatch<React.SetStateAction<T>>,
) => {
  setState((prev) => {
    const array = prev[arrayKey] as unknown[];
    return {
      ...prev,
      [arrayKey]: array.filter((_, i) => i !== index),
    };
  });
};
