import * as Yup from 'yup';

export default Yup.object().shape({
  to_wallet_id: Yup.string().uuid('invalid wallet').required('wallet required'),
  value: Yup.number()
    .typeError('value must be a number')
    .required('value required')
    .positive('value must be positive'),
  static_rate: Yup.number()
    .typeError('static fee must be a number')
    .positive('static fee must be positive'),
  percentual_rate: Yup.number()
    .typeError('percentual fee must be a number')
    .positive('percentual fee must be positive'),
});
