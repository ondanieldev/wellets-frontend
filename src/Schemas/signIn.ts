import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email('invalid e-mail').required('e-mail required'),
  password: Yup.string().required('password required'),
});
