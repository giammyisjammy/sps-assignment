import { fakerIT as faker } from '@faker-js/faker';
import { randomIntFromInterval } from '../utils';

const nameGenerator = function* () {
  const size = randomIntFromInterval(10, 100);

  for (let i = 0; i < size; i++) {
    yield faker.commerce.product();
  }
};

export const names = [...nameGenerator()];
