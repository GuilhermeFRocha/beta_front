import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldProps } from 'formik'
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../../components/Loading";

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    setIsLoading(true)
    console.log(values);
    setSubmitting(false); 
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Log in to Beta</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, isSubmitting, dirty }) => (
            <Form className="space-y-6">
              <div>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                        errors.email && touched.email ? 'border-red-500' : ''
                      }`}
                      placeholder="Email"
                    />
                  )}
                </Field>
                <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-sm" />
              </div>
              <div>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      className={`w-full px-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                        errors.password && touched.password ? 'border-red-500' : ''
                      }`}
                      placeholder="Password"
                    />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
                className={`
                  w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-full transition duration-300 ${  !isValid || !dirty || isSubmitting ? 'opacity-50' : ''}`}
              >
                {isLoading ? <Loading size="small" color="#fff" speed="normal" className="my-custom-class" /> : 'Log in'}
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
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
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
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}