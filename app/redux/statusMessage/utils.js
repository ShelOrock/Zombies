import statusMessage from './actions';

export const checkError = (dispatch, e) => {
  switch (e) {
    case 400:
      dispatch(
        statusMessage({
          status: 'FAIL',
          message: 'The information you have provided is not valid.',
        })
      );
      break;

    case 403:
      dispatch(
        statusMessage({
          status: 'FAILED',
          message: 'You do not have permission to perform this action. Contact an administator',
        })
      );
      break;

    case 404:
      dispatch(
        statusMessage({
          status: 'FAIL',
          message: '404 - Not Found',
        })
      );
      break;

    default:
      dispatch(
        statusMessage({
          status: 'FAIL',
          message:
            'There was an error processing your request. Try again later',
        })
      );
      break;
  }
};

export const checkSuccess = (dispatch, e) => {
  switch (e) {
    case 200:
      dispatch(
        statusMessage({
          status: 'SUCCESS',
          message: 'Success!',
        })
      );
      break;

    case 201:
        dispatch(
          statusMessage({
            status: 'SUCCESS',
            message: 'Successfully edited!',
          })
        );
      break;

    case 204:
      dispatch(
        statusMessage({
          status: 'SUCCESS',
          message: 'Successfully deleted!',
        })
      );
      break;

    default:
      dispatch(
        statusMessage({
          status: 'SUCCESS',
          message: 'Request successfu!',
        })
      );
      break;
  }
};
