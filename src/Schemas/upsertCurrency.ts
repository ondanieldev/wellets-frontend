import * as Yup from 'yup';

export default Yup.object().shape({
  acronym: Yup.string().required('acronym required'),
  alias: Yup.string().required('alias required'),
  dollar_rate: Yup.number()
    .typeError('invalid rate')
    .positive('rate must be positive')
    .required('rate required'),
  format: Yup.string().required('format required'),
});
