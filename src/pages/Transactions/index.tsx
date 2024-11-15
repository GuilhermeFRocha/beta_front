import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import { Sidebar } from "../../components/Sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import { TransactionProps, ValuesSubmitProps } from "../../utils/interfaces";
import { validationSchemaTransactions } from "../utils/validationSchema";
import { initialValuesTransactions } from "../utils/initialValues";
import { ModalForm } from "../../components/ModalForm";

export const Transactions = () => {
  const {
    user,
    getTransactions,
    fetchUserFromToken,
    createTransaction,
    deleteTransaction,
    editTransaction,
  } = useStore();
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(
    null
  );
  const [editingTransaction, setEditingTransaction] = useState<
    TransactionProps | any
  >(null);

  useEffect(() => {
    // Carregar o usuário do token quando a página for recarregada
    fetchUserFromToken();
  }, [fetchUserFromToken]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        const data = await getTransactions(user.id); // Chamando a API com o userId
        setTransactions(data); // Armazena as transações no state
      }
    };

    fetchTransactions();
  }, [user, getTransactions]);

  async function handleSubmit(
    values: ValuesSubmitProps,
    { resetForm }: { resetForm: () => void }
  ) {
    const transactionData = {
      ...values,
      date: new Date().toISOString().split("T")[0],
    };
    if (user?.id !== undefined) {
      try {
        const resTransaction = await createTransaction(
          user?.id,
          transactionData
        );

        // Verifique se o resTransaction contém os dados da transação
        if (resTransaction) {
          // Atualize as transações com o dado retornado pela API
          setTransactions((prevTransactions: TransactionProps[]) => [
            resTransaction as TransactionProps, // Utilize o retorno da API
            ...prevTransactions,
          ]);
          toast.success("Transaction created successfully!");
          resetForm();
        }
      } catch (error) {
        toast.error("Error creating transaction");
      }
    }
  }

  const handleEditTransaction = async (transaction: TransactionProps) => {
    if (transaction) {
      await editTransaction(transaction).then((res) => {
        setTransactions((prevTransactions: TransactionProps[]) =>
          prevTransactions.map((t) =>
            t.id === transaction.id ? { ...t, ...res } : t
          )
        );
        toast.success("Transaction updated successfully!");
      });
      setEditModalOpen(false);
    }
  };

  async function handleDeleteSubmit() {
    if (deleteTransactionId !== null) {
      await deleteTransaction(deleteTransactionId);
      setModalOpen(false);
      setDeleteTransactionId(null); // Limpa o ID após a exclusão
      setTransactions(transactions.filter((t) => t.id !== deleteTransactionId)); // Remove a transação da lista
      toast.success("Transaction deleted successfully!");
    }
  }

  const formatNumber = (number: number) => {
    const numStr = Math.trunc(number).toString();
    const length = numStr.length;

    // Define o índice onde o ponto deve ser inserido, dependendo do tamanho do número
    const pointIndex = length > 3 ? length - 3 : length;

    return (
      numStr.slice(0, pointIndex) +
      (length > 3 ? "." : "") +
      numStr.slice(pointIndex)
    );
  };

  const incomeAll = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
  const expenseAll = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const profit = incomeAll - expenseAll;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Income</h3>
            <p className="text-2xl font-bold mt-2">
              R$: {formatNumber(incomeAll)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Expense</h3>
            <p className="text-2xl font-bold mt-2">
              R$: {formatNumber(expenseAll)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Profit</h3>
            <p className="text-2xl font-bold mt-2">
              R$: {formatNumber(profit)}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
          <Formik
            initialValues={initialValuesTransactions}
            validationSchema={validationSchemaTransactions}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Type
                    </label>
                    <Field
                      as="select"
                      name="type"
                      id="type"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
                    >
                      <option value="">Selecione</option>
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
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <Field
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Insert category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <Field
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Insert description"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Amount
                    </label>
                    <Field
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Insert amount"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none"
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Tem certeza que deseja excluir?"
            onSubmit={handleDeleteSubmit}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          </div>

          {/* Tabela para telas maiores */}
          <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction: TransactionProps) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatNumber(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <Button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => {
                        setEditingTransaction(transaction);
                        setEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteTransactionId(transaction.id);
                        setModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Layout responsivo para telas menores */}
          <div className="block sm:hidden">
            {transactions.map((transaction: TransactionProps) => (
              <div
                key={transaction.id}
                className="bg-white border rounded-lg mb-4 p-4 shadow"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Type:</span>
                  <span>{transaction.type}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Category:</span>
                  <span>{transaction.category}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Description:</span>
                  <span>{transaction.description}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Amount:</span>
                  <span>{formatNumber(transaction.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Actions:</span>
                  <div>
                    <Button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => {
                        setEditingTransaction(transaction);
                        setEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteTransactionId(transaction.id);
                        setModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ModalForm
            isOpen={isEditModalOpen}
            initialValues={editingTransaction}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleEditTransaction}
          />
        </div>
      </div>
    </div>
  );
};
