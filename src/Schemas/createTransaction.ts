import * as Yup from 'yup';

export default Yup.object().shape({
  value: Yup.number()
    .typeError('value must be a number')
    .required('value required')
    .positive('value must be positive'),
  description: Yup.string().required('description required'),
  type: Yup.string()
    .equals(
      ['credit', 'debit'],
      'you must specify if the transaction is a credit or a debit',
    )
    .required('description required'),
});
