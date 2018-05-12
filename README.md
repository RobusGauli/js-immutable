
<a href="https://travis-ci.org/RobusGauli/react-state-reducer">
    <img src="https://travis-ci.org/RobusGauli/react-state-reducer.svg?branch=master" hspace="10px" align="right" vspace="2px">
</a>

# React State Reducer 🐬🐬

React State Reducer provides you beautiful api for managing state change. The three most important benefits are
> a. It hides the internal structure of your redux state from your reducer.
> b. It prevents you from accidentally modifying your deeply nested redux state.
> c. It tries to share the structure as much as possible when you change state, and won't modify your original state during transformation.  

## Usage



```javascript
import reduce from 'react-state-reducer';
```

```javascript
// Sample State
const originalState = {
	detail: {
		address: {
			permanent: 'Kathmandu',
		},
		friends: ['robus', 'rahul', 'ishan'],
		age: 24,
		isOnline: false,
		education: {
			primary: 'blah',
			secondary: 'blah blah'
		}
		
	}
}
```
```javascript
// create a selector for address object
const addressSelector = { 
	detail: {
		address: '#'
	}
}
```
```javascript
// React State Reducer in action.
const addressReducer = reduce(addressSelector);

const newState = addressReducer(addressSelector)
	.merge({temporary: 'Pokhara'})
	.apply();
	
```

<img src="https://raw.githubusercontent.com/robb/Cartography/master/images/pirates1.png" align="right" height="200px"  hspace="30px" vspace="30px">

## Result

```javascript
	console.log(newState);
	// => {
	detail: {
		address: {
			permanent: 'Kathmandu',
			temporary: 'Pokhara' // merged //
		},
		friends: ['robus', 'rahul', 'ishan'],
		age: 24,
		isOnline: false,
		education: {
			primary: 'blah',
			secondary: 'blah blah'
		}
		
	}
}
```


### License

Copyright © 2015-2016 Robus, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt]
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


---
Made with ♥ by Robus Gauli ([@robusgauli]
