export default {
  __collection__: {
    contractList: {
      __doc__: {
        contract1: {
          id: 'contract1',

          __collection__: {
            existingList: {
              __doc__: {
                document1: {
                  id: 'document1',
                  name: 'document1',
                  deleted: false,
                },
                document2: {
                  id: 'document2',
                  name: 'document2',
                  deleted: false,
                },
                document3: {
                  id: 'document3',
                  name: 'document3',
                  deleted: false,
                },
                document4: {
                  id: 'document4',
                  name: 'document4',
                  deleted: false,
                },
              },
            },
          },
        },
        contract2: {
          id: 'contract2',

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
        contract3: {
          id: 'contract3',
        },
      },
    },
  },
};
