import { expect } from 'chai';

import reduce from '../src/index';

describe('React State Reducer', () => {
  context('#React State Reducer Function', () => {
    it('should be a function', () => {
      expect(reduce).to.be.a('function');
    });

    it('should throw an error with undefined selector', () => {
      expect(reduce).to.throw(Error);
    });
    it('should throw an error with array selector', () => {
      expect(() => reduce([])).to.throw(Error);
    });
    it('should not throw an error with the object as a parameter to reduce', () => {
      const selector = {
        someKey: {},
      };
      expect(() => reduce(selector))
      .to.not.throw();
    });
    it('should throw an error with empty object as a parameter to reduce', () => {
      const selector = {};
      expect(() => reduce(selector))
      .to.throw(Error);
    });
    it('should return a function with valid selector', () => {
      const selector = {
        someKey: '#',
      };
      expect(() => reduce(selector))
        .to.be.a('function');
    });
  });

  context('#React State Reducer Usage', () => {
    let originalState;
    beforeEach(() => {
      originalState = {
        detail: {
          address: {
            permanent: 'Kathmandu',
            temporary: 'Pokhara',
          },
          friends: ['Robus', 'Rahul', 'Ishan'],
          age: 23,
        },
      };
    });

    it('should return the same original state when selector is invalid', () => {
      const selector = {
        details: '#',
      };
      const randomReducer = reduce(selector);
      const newState = randomReducer(originalState)
        .set('new value')
        .apply();
      console.log(newState, originalState);
      expect(originalState).to.equal(newState);
    });

  });
});

