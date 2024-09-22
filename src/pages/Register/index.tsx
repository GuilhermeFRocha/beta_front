import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from "formik";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { validationSchemaRegister } from "../utils/validationSchema";
import { initialValuesRegister } from "../utils/initialValues";

interface SignValues {
  email: string;
  password: string;
}

export const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { registerUser, isTokenValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate("/dashboard");
    }
  }, [isTokenValid, navigate]);

  const handleSubmit = async (
    values: SignValues,
    { setSubmitting }: FormikHelpers<SignValues>
  ) => {
    setIsLoading(true);
    await registerUser(values);
    setSubmitting(false);
    setIsLoading(false);
  };

  if (isTokenValid()) {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign up to Beta
        </h2>
        <Formik
          initialValues={initialValuesRegister}
          validationSchema={validationSchemaRegister}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, isSubmitting, dirty }) => (
            <Form className="space-y-6">
              <div>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="email"
                      className={`w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                      placeholder="Email"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>
              <div>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="password"
                      className={`w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Password"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>
              <Button
                type="submit"
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-full transition duration-300 ${
                  !isValid || !dirty || isSubmitting ? "opacity-50" : ""
                }`}
                disabled={!isValid || !dirty || isSubmitting}
              >
                {isLoading ? (
                  <Loading
                    size="small"
                    color="#fff"
                    speed="normal"
                    className="my-custom-class"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded-full transition duration-300 flex items-center justify-center"
            >
              <FaGithub className="mr-2" />
              GitHub
            </Button>
            <Button
              type="button"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded-full transition duration-300 flex items-center justify-center"
            >
              <FaGoogle className="mr-2" />
              Google
            </Button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
