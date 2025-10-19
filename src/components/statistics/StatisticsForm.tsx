import React from 'react';
import { IconButton } from '@material-tailwind/react';
import { Plus, Trash2 } from 'lucide-react';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import GridTwoColumns from '@components/common/GridTwoColumns';
import CustomInputNumber from '@components/forms/CustomInputNumber';
import CustomLabel from '@components/forms/CustomLabel';
import CustomSelect from '@components/forms/CustomSelect';

import { initialStateStatistic, StatisticDto } from '@/constants/interfaces';

import {
  handleArrayAdd,
  handleArrayChange,
  handleArrayRemove,
} from '@utils/forms';

interface StatisticsFormProps<T> {
  arrayKey: keyof T;
  emptyMessage?: string;
  label?: string;
  options: { label: string; value: string }[];
  setState: React.Dispatch<React.SetStateAction<T>>;
  statistics: StatisticDto[];
}

const StatisticsForm = <T,>({
  arrayKey,
  emptyMessage = 'No hay estadísticas agregadas.',
  label = 'Estadísticas',
  options,
  setState,
  statistics,
}: StatisticsFormProps<T>) => {
  return (
    <div className="flex flex-col gap-4">
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
              className="flex gap-3 items-center border-b border-dashed pb-3"
            >
              <IconButton
                color="red"
                size="md"
                onClick={() => handleArrayRemove(arrayKey, index, setState)}
              >
                <Trash2 size={16} />
              </IconButton>

              <GridTwoColumns>
                <CustomSelect
                  label="Nombre"
                  name={`statistic-name-${index}`}
                  options={options}
                  value={statistic.name}
                  onChange={(value) =>
                    handleArrayChange(
                      arrayKey,
                      index,
                      'name',
                      value || '',
                      setState,
                    )
                  }
                />
                <CustomInputNumber
                  label="Cantidad"
                  name={`statistic-value-${index}`}
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
              </GridTwoColumns>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsForm;
