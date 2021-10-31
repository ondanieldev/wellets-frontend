import * as Yup from 'yup';

export default Yup.object().shape({
  currency_id: Yup.string()
    .uuid('invalid currency')
    .required('currency required'),
});
