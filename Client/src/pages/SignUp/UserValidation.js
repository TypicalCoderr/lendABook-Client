import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .required(),
  phoneNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10)
    .required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required(),
});
