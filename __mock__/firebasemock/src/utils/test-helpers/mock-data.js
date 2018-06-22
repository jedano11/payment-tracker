export default function fixtureData() {
  return {
    __collection__: {
      contractsList: {
        __doc__: {
          contractID1: {
            age: 10,
            createdOn: new Date('2017-01-01'),
            username: 'user_b',
            __collection__: {
              anyList: {
                __doc__: {
                  user_a: {
                    reference: '__ref__:users/user_a',
                  },
                },
              },
            },
          },
          contractID2: {
            __collection__: {
              anyList: {
                __doc__: {
                  user_a: {
                    reference: '__ref__:users/user_a',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
