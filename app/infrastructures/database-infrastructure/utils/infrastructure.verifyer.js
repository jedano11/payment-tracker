import ErrorMessages from '../../error.messages';

class InfrastructureVerifyer {
  verifySnapshot = (snapshot: any) => {
    if (!snapshot.exists) {
      throw new Error(ErrorMessages.snapshotNotExist);
    }
  };

  verifyData = (data: any) => {
    if (data.deleted) {
      throw new Error(ErrorMessages.alreadyDeleted);
    }
  };
}

export default new InfrastructureVerifyer();
