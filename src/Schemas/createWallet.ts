import * as Yup from 'yup';

export default Yup.object().shape({
  alias: Yup.string().required('alias required'),
  currency_id: Yup.string()
    .uuid('invalid currency')
    .required('currency required'),
  balance: Yup.number()
    .typeError(() => 'invalid balance')
    .min(0, 'balance must be more than or equals to 0'),
});
