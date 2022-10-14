import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';
import { resolve } from 'path';
import { TransportationCarTypes } from './src/car/entities/car.entity';

enum ToSubType {
  'погрузчиков' = 'Погрузчик',
  'автовышек' = 'Автовышка',
  'кранов' = 'Кран',
}

const transportationTypes: TransportationCarTypes[] = [
  TransportationCarTypes.CARGO,
  TransportationCarTypes.PASSENGER,
];

const generateCar = () => ({
  id: +faker.phone.number('#######'),
  name: faker.name.firstName(),
  number: `A${faker.phone.number('###')}AA/999`,
  description: faker.lorem.sentence(),
  type: 'Перевозка',
  subType: transportationTypes[Math.round(Math.random())],
});

(async () => {
  const data = await readFile(resolve(__dirname, 'data.json'));

  const cars = JSON.parse(data.toString());

  const newCars = [
    ...cars.map((car) => ({
      id: +faker.phone.number('#######'),
      name: car['Наименование ТС'],
      number: car['Номер ТС'],
      description: car['описание характеристики'],
      type: 'Работа на точке',
      subType: ToSubType[car['Парк техники'].split(' ')[1]],
    })),
    ...Array(50)
      .fill(1)
      .map(() => generateCar()),
  ];

  // console.log(Array(2).map(() => generateCar()));

  await writeFile('data2.json', JSON.stringify(newCars));
})();
