import React, { useRef, useState } from 'react';
import ParamEditor, { Param, Model } from './paramEditor';

const possibleParams: Param[][] = [
  [
    {
      id: 1,
      name: 'Назначение',
      type: 'string',
    },
    {
      id: 2,
      name: 'Длина',
      type: 'string',
    },
  ],
  [
    {
      id: 1,
      name: 'Назначение',
      type: 'string',
    },
    {
      id: 2,
      name: 'Длина',
      type: 'number',
    },
    {
      id: 3,
      name: 'Цвет',
      type: 'enum',
      values: ['Красный', 'Зеленый', 'Синий'],
    },
  ],
  [
    {
      id: 1,
      name: 'Тип',
      type: 'enum',
      values: ['Одежда', 'Обувь', 'Аксессуары'],
    },
    {
      id: 2,
      name: 'Цвет',
      type: 'enum',
      values: ['Красный', 'Зеленый', 'Синий'],
    },
    {
      id: 3,
      name: 'Размер',
      type: 'enum',
      values: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Количество',
      type: 'number',
    },
    {
      id: 5,
      name: 'Размер в числах',
      type: 'enum',
      values: ['38', '40', '42', '44', '46'],
    },
  ],
];

const possibleModels: Model[] = [
  {
    paramValues: [
      {
        paramId: 1,
        value: 'повседневное',
      },
      {
        paramId: 2,
        value: 'макси',
      },
      {
        paramId: 3,
        value: 'мини',
      },
    ],
  },
  {
    paramValues: [
      {
        paramId: 1,
        value: 'повседневное',
      },
      {
        paramId: 2,
        value: 1,
      },
      {
        paramId: 3,
        value: 'Красный',
      },
    ],
  },
  {
    paramValues: [
      {
        paramId: 1,
        value: 'Одежда',
      },
      {
        paramId: 2,
        value: 'Синий',
      },
      {
        paramId: 3,
        value: 'M',
      },
      {
        paramId: 4,
        value: 1,
      },
      {
        paramId: 5,
        value: '48',
      },
    ],
  },
];

const App: React.FC = () => {
  const randomIndexRef = useRef(0);
  // Функция для принудительного обновления компонента

  const [isLoading, setLoading] = useState(false);
  const getRandomData = () => {
    setLoading(true);
    // Имитация асинхронной операции с задержкой 1 секунда
    setTimeout(() => {
      randomIndexRef.current = Math.floor(
        Math.random() * possibleParams.length
      );
      setLoading(false);
    }, 1000);
  };

  // function handleChange() {
  //   forceUpdate((s) => !s);
  // }
  console.log(possibleModels[randomIndexRef.current], randomIndexRef.current);
  return (
    <div>
      <h1>Param Editor</h1>
      {isLoading ? (
        'LOADING...'
      ) : (
        <button onClick={getRandomData}>Generate Random Data (Async)</button>
      )}

      {/* <input type="checkbox" checked={s} onChange={handleChange} /> */}
      <ParamEditor
        params={possibleParams[randomIndexRef.current]}
        model={possibleModels[randomIndexRef.current]}
      />
    </div>
  );
};

export default App;
