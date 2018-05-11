const reduce = require('./index');

function main() {
  const person = {
    detail: {
      address: {
        permanent: { hi: 'there', hola: 'hloa' },
        temporary: 'pokhara',
      },
    },
    phone: 3,
  };

  const addressReducer = reduce({
    detail: {
      address: {
        permanent: '#',
        temporary: '#1',
      },

    },
  });

  const result = addressReducer
    .of('#')
    .set('new value for permanent')
    .of('#1')
    .set(7)
    .apply();

  // const resultOne = addressReducer(person)
  //   .of('#')
  //   .set('love is in the air')
  //   .apply();
  // console.log(result);
  // console.log(resultOne);
  // console.log(person);

  // console.log(result.detail.address.permanent);
  // console.log(person.detail.address.permanent);
}

main();
