import Data from './Api.data.json';
import { Promise } from 'es6-promise';
import _ from 'lodash';

class Api {
  elements() {
    return new Promise((resolve) => {
      let results = Data.data.map(datum => ({
        symbol: datum['Atomic Symbol'],
        number: datum['Atomic Number'],
        notes: datum.Notes,
        weight: datum['Standard Atomic Weight']
      }));
      resolve(results);
    });
  }

  isotopes(symbol) {
    return new Promise((resolve, reject) => {
      let element = _.find(Data.data, el => el['Atomic Symbol'] === symbol);
      if (element) {
        resolve(element.isotopes.map(isotope => ({
          symbol: isotope['Atomic Symbol'],
          massNumber: isotope['Mass Number'],
          relativeMass: isotope['Relative Atomic Mass']
        })));
      } else {
        reject(`No element ${symbol}`);
      }
    });
  }
}

export default Api;
