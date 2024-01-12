import React, { useEffect, useState } from 'react';

export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'enum'; // Обновленные типы параметров
  values?: string[]; // Свойство для списка значений (для типа 'enum')
}

export interface ParamValue {
  paramId: number;
  value: string | number;
}

export interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  useEffect(() => {
    setParamValues(model.paramValues);
  }, [model]);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedValues = paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    setParamValues(updatedValues);
  };

  console.log(paramValues, params);
  const getModel = (): Model => ({
    paramValues,
  });

  return (
    <div className="paramEditor">
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          {param.type === 'string' || param.type === 'number' ? (
            <input
              type={param.type}
              value={
                paramValues.find((p) => p.paramId === param.id)?.value || ''
              }
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          ) : param.type === 'enum' && param.values ? (
            <select
              value={
                paramValues.find((p) => p.paramId === param.id)?.value || ''
              }
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            >
              {param.values.map((enumValue) => (
                <option key={enumValue} value={enumValue}>
                  {enumValue}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ))}
      <button onClick={() => console.log(getModel())}>Save</button>
    </div>
  );
};

export default ParamEditor;
