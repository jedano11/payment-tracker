export default function testData() {
  return {
    __collection__: {
      contractList: {
        __doc__: {
          contract1: {
            id: 'contractId1',
            __collection__: {
              friends: {
                __doc__: {
                  user_b: {
                    reference: '__ref__:users/user_b'
                  }
                }
              }
            }
          },
          contract2: {
            id: 'contractId2',
            __collection__: {
              friends: {
                __doc__: {
                  user_a: {
                    reference: '__ref__:users/user_a'
                  }
                }
              }
            }
          },
          contract3: {
            id: 'contractId2',
          }
        }
      }
    }
  };
}
