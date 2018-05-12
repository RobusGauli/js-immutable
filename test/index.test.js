import { expect } from 'chai';

import reduce from '../src/index';

describe('React State Reducer', () => {
  context('#React State Reducer Function', () => {
    it('should be a function', () => {
      expect(reduce)
        .to.be.a('function');
    });

    it('should throw an error with undefined selector', () => {
      expect(reduce)
        .to.throw(Error);
    });
    it('should throw an error with array selector', () => {
      expect(() => reduce([]))
        .to.throw(Error);
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
        invalidKey: '#',
      };
      const randomReducer = reduce(selector);
      const newState = randomReducer(originalState)
        .set('new value')
        .apply();
      expect(originalState)
        .to.equal(newState);
    });

    it('should return the shallow state when a level deep selector is invalid', () => {
      const selector = {
        detail: {
          wrongKey: '#',
        },
      };
      const randomReducer = reduce(selector);
      const newState = randomReducer(originalState)
        .set('some new value')
        .apply();
      expect(originalState)
        .deep.equal(newState);
    });

    it('should return the new value when applying set to the valid selector', () => {
      const selector = {
        detail: {
          address: {
            permanent: '#',
          },
        },
      };
      const permanentReducer = reduce(selector);
      const actualState = permanentReducer(originalState)
        .set('New Permanent Location')
        .apply();
      const expectedState = {
        detail: {
          address: {
            permanent: 'New Permanent Location',
            temporary: 'Pokhara',
          },
          friends: ['Robus', 'Rahul', 'Ishan'],
          age: 23,
        },
      };
      expect(actualState)
        .to.deep.equal(expectedState);
    });

    it('should append new friend in the list and set a new age using the multiple selector', () => {
      const multipleSelector = {
        detail: {
          friends: '#1',
          age: '#2',
        },
      };
      const ageFriendReducer = reduce(multipleSelector);
      const newState = ageFriendReducer(originalState)
        .of('#1')
        .append('Chumlung')
        .of('#2')
        .set(24)
        .apply();
      const expectedState = {
        detail: {
          address: {
            permanent: 'Kathmandu',
            temporary: 'Pokhara',
          },
          friends: ['Robus', 'Rahul', 'Ishan', 'Chumlung'],
          age: 24,
        },
      };

      expect(newState)
        .deep.equal(expectedState);
    });

    it('should not set new value when there is undefined or null', () => {
      const state = {
        a: 'someValue',
      };
      const reducer = reduce({
        a: '#',
      });
      const result = reducer(state)
        .set(undefined)
        .apply();
      expect(state)
        .deep
        .equal(result);
    });

    it('should not append if the value is undefined or null', () => {
      const selector = {
        detail: {
          friends: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .append(undefined)
        .apply();
      expect(originalState)
        .deep.equal(result);
    });

    it('should not append if the selected value is not array', () => {
      const selector = {
        detail: {
          age: '#',
        },
      };

      const reducer = reduce(selector);
      const result = reducer(originalState)
        .append('try new value')
        .apply();
      expect(result)
        .deep.equal(originalState);
    });

    it('should not alter the original State when the value is appended to an array', () => {
      const selector = {
        detail: {
          friends: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .append('new value is appended')
        .apply();

      expect(result.detail.friends.length)
        .equal(4);
    });

    it('should merge the new key: value pair', () => {
      const selector = {
        detail: {
          address: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .merge({
          newKey: 'newValue',
        })
        .apply();

      expect(result.detail.address)
        .deep
        .equal({
          ...originalState.detail.address,
          newKey: 'newValue',
        });
    });

    it('should not merge if undefined or null is passed', () => {
      const selector = {
        detail: {
          address: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .merge(undefined)
        .apply();
      expect(result)
        .deep.equal(originalState);
    });

    it('should delete a key: value from the object', () => {
      const selector = {
        detail: {
          address: '#',
        },
      };

      const reducer = reduce(selector);
      const result = reducer(originalState)
        .delete('temporary')
        .apply();
      expect(result)
        .deep
        .equal({
          ...originalState,
          detail: {
            ...originalState.detail,
            address: {
              permanent: originalState.detail.address.permanent,
            },
          },
        });
    });

    it('should return the same state when key is undefined while deleting', () => {
      const selector = {
        detail: {
          adress: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .delete(undefined)
        .apply();
      expect(result)
        .deep
        .equal(originalState);
    });

    it('should delete a value in an index when deleting in an array', () => {
      const selector = {
        detail: {
          friends: '#',
        },
      };
      const reducer = reduce(selector);
      const result = reducer(originalState)
        .delete(1)
        .apply();
      expect(result.detail.friends)
        .deep
        .equal(['Robus', 'Ishan']);
    });
  });
});