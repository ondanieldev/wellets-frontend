import * as Yup from 'yup';

export default Yup.object().shape({
  to_wallet_id: Yup.string().uuid('invalid wallet').required('wallet required'),
  value: Yup.number()
    .typeError('value must be a number')
    .required('value required')
    .positive('value must be positive'),
  static_rate: Yup.number()
    .typeError('static rate must be a number')
    .positive('static rate must be positive'),
  percentual_rate: Yup.number()
    .typeError('percentual rate must be a number')
    .positive('percentual rate must be positive'),
});
