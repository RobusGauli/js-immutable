const reduce = require('./index');

function main() {
  const person = {
    detail: {
      address: {
        permanent: [3, 4, 6, 7],
        temporary: 'pokhara',
      },
    },
  };

  const addressReducer = reduce({
    detail: {
      address: {
        permanent: '#',
      },
    },
  });

  const result = addressReducer
    .delete(2)
    .apply(person);
  // console.log(result.);
  console.log(result.detail.address.permanent);
}

main();
