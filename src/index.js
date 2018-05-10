/**
 * React State Reducer
 *
 * Copyright © 2015-2016 Robus Gauli, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Accepts the selector object and operation intended
 *
 * ### Example (es module)
 * ```js
 * import reduce from 'react-state-reducer';
 * const deepObject = {
 *  person: {
 *    name: 'robus gauli',
 *    address: {
 *      permanent: 'Nepal',
 *      temporary: 'China'
 *    }
 *  }
 * }
 *
 * const selector = {
 *  person: {
 *    address: {
 *      permanent: '#'
 *    }
 *  }
 * }
 *
 * const reducer = reduce(selector)
 * const result = reducer
 *                  .set('Holy land')
 *                  .apply(deepObject)
 * // => {
 *    person: {
 *      name: ...,
 *      address: {
 *        permanent: 'Holy land',
 *        temporary: 'China'
 *      }
 *    }
 *  }
 * ```
 */

function reduce(selector) {
  function set(oldValue, newValue) {
    if (newValue === null || newValue === undefined) {
      return oldValue;
    }
    return newValue;
  }

  function extend(oldArray, newArray) {
    if (!Array.isArray(newArray) || !Array.isArray(oldArray)) {
      return oldArray;
    }
    if (newArray.length) {
      return oldArray.concat(newArray);
    }
    return oldArray;
  }

  function append(oldList, value) {
    // if value is null or undefined return the same original list
    if (
      value === undefined ||
      value === null ||
      !Array.isArray(oldList)
    ) {
      return oldList;
    }
    return oldList.concat(value);
  }

  function merge(oldObject, newObject) {
    if (
      newObject === null ||
      newObject === undefined ||
      typeof newObject !== 'object'
    ) {
      return oldObject;
    }
    if (typeof newObject === 'object' && !Object.keys(newObject).length) {
      return oldObject;
    }
    return Object.assign({}, oldObject, newObject);
  }

  function deleteOp(oldObject, key) {
    if (Array.isArray(oldObject)) {
      return oldObject.filter((val, index) => key !== index);
    }
    if (typeof oldObject === 'object' && oldObject !== null) {
      return Object.keys(oldObject)
        .reduce((acc, k) => (k === key)
           ? { ...acc }
           : { ...acc, [k]: oldObject[k]}, {});
    }
    return oldObject;
  }

  const operationalMapper = {
    set,
    append,
    merge,
    extend,
    delete: deleteOp,
  };

  let toUpdate = {};
  return new (class {
    constructor() {
      this.set = this.operationFactory('set');
      this.merge = this.operationFactory('merge');
      this.delete = this.operationFactory('delete');
      this.append = this.operationFactory('append');
      this.extend = this.operationFactory('extend');
      this.setMany = this.operationFactory('set', true);
      this.mergeMany = this.operationFactory('merge', true);
      this.appendMany = this.operationFactory('append', true);
      this.extendMany = this.operationFactory('extend', true);
      this.deleteMany = this.operationFactory('delete', true);
    }

    operationFactory(operationName, many) {
      return function wrapper(value) {
        if (many) {
          const updatedObject = Object.keys(value)
            .reduce((acc, key) => ({ ...acc,
              [key]: {
                operation: operationName,
                value: value[key],
              } }), {});
          toUpdate = {
            ...toUpdate,
            ...updatedObject,
          };
        } else if (value !== undefined || value !== null) {
          toUpdate = {
            toUpdate,
            default: {
              operation: operationName,
              value,
            },
          };
        }
        return this;
      }.bind(this);
    }

    selectTransform(originalObject, selectorObject) {
      if (
        typeof selectorObject === 'string' &&
        selectorObject.includes('#')
      ) {
        // we reached to the target
        if (!Object.keys(toUpdate).length) {
          throw new Error('Should at least has a one operation intended before applying changes');
        }

        if (selectorObject === '#') {
          if (Object.keys(toUpdate).indexOf('default') !== -1) {
            const updater = toUpdate.default;
            return operationalMapper[updater.operation](originalObject, updater.value);
          }
          return originalObject;
        }
      }

      const clonedObject = Object.assign({}, originalObject);

      Object.keys(selectorObject)
        .forEach((key) => {
          const keyedObject = clonedObject[key];
          const filteredObject = selectorObject[key];
          clonedObject[key] = this.selectTransform(
            keyedObject,
            filteredObject,
          );
        });
      return clonedObject;
    }

    apply(originalObject) {
      return this.selectTransform(originalObject, selector);
    }
  })();
}

module.exports = reduce;

