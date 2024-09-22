import * as Yup from "yup";

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const validationSchemaRegister = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const validationSchemaTransactions = Yup.object({
  type: Yup.string().required("Type is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});
