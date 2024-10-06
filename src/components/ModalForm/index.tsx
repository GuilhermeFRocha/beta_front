import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaTransactions } from "../../pages/utils/validationSchema";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues: {
    type: string;
    category: string;
    description: string;
    amount: number;
  };
}

export const ModalForm: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-sm:w-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaTransactions}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <Field
                  name="category"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Amount</label>
                <Field
                  name="amount"
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
