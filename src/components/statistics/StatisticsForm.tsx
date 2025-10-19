import React from 'react';
import { IconButton } from '@material-tailwind/react';
import { Plus, Trash2 } from 'lucide-react';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import CustomInputNumber from '@components/forms/CustomInputNumber';
import CustomLabel from '@components/forms/CustomLabel';
import CustomSelect from '@components/forms/CustomSelect';
import GridTwoColumns from '@components/common/GridTwoColumns';
import type { CustomSelectOption } from '@components/forms/CustomSelect';

import { initialStateStatistic, StatisticDto } from '@/constants/interfaces';
import { statistics as statisticsConst } from '@/constants/statistics';

import {
  handleArrayAdd,
  handleArrayChange,
  handleArrayRemove,
} from '@utils/forms';

interface StatisticsFormProps<T> {
  arrayKey: keyof T;
  emptyMessage?: string;
  label?: string;
  options?: CustomSelectOption[];
  setState: React.Dispatch<React.SetStateAction<T>>;
  statistics: StatisticDto[];
}

const StatisticsForm = <T,>({
  arrayKey,
  emptyMessage = 'No hay estadísticas agregadas.',
  label = 'Estadísticas',
  options = statisticsConst,
  setState,
  statistics,
}: StatisticsFormProps<T>) => {
  const handleNameChange = (index: number, value: string | undefined) => {
    if (!value) return;

    // Search for the selected option to get its unit
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;

    const selectedValue = selectedOption.value;
    const selectedUnit = selectedOption.unit || undefined;

    // Update the state with name and unit
    setState((prev) => {
      const array = prev[arrayKey] as unknown[];
      const newArray = [...array];
      newArray[index] = {
        ...(newArray[index] as Record<string, unknown>),
        name: selectedValue,
        unit: selectedUnit || undefined,
      };

      return {
        ...prev,
        [arrayKey]: newArray,
      };
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-start justify-between">
        <CustomLabel label={label} />
        <ButtonWithIcon
          text="Agregar"
          icon={<Plus />}
          onClick={() =>
            handleArrayAdd(arrayKey, initialStateStatistic, setState)
          }
        />
      </div>

      {statistics.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {statistics.map((statistic, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 rounded-lg border !border-text dark:!border-dk_text"
            >
              <IconButton
                color="red"
                size="sm"
                className="self-end -mb-2"
                onClick={() => handleArrayRemove(arrayKey, index, setState)}
              >
                <Trash2 size={16} />
              </IconButton>

              <CustomSelect
                label="Nombre"
                name={`statistic-name-${index}`}
                options={options}
                required
                value={statistic.name}
                onChange={(value) => handleNameChange(index, value)}
              />

              <GridTwoColumns>
                <CustomInputNumber
                  label="Cantidad"
                  name={`statistic-value-${index}`}
                  required
                  value={Number(statistic.value)}
                  onChange={(value) =>
                    handleArrayChange(
                      arrayKey,
                      index,
                      'value',
                      value,
                      setState,
                      true,
                    )
                  }
                />
                <CustomInputNumber
                  label="Meta"
                  name={`statistic-goal-${index}`}
                  value={Number(statistic.goal || 0)}
                  onChange={(value) =>
                    handleArrayChange(
                      arrayKey,
                      index,
                      'goal',
                      value,
                      setState,
                      true,
                    )
                  }
                />
              </GridTwoColumns>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsForm;
