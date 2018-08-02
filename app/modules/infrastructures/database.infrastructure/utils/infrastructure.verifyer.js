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

  verifyServerTimestamp = (timestamp: any) => {
    if (Number.isNaN(timestamp) || typeof timestamp === 'undefined') {
      throw new Error(ErrorMessages.noServerTime);
    }
  };
}

export default new InfrastructureVerifyer();
