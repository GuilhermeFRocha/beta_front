import { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuth";
import { Sidebar } from "../../components/Sidebar";

interface TransactionProps {
  id: number;
  description: string;
  amount: string;
  category: string;
  type: string;
  date: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

export const ProfilePage = () => {
  const { user, getTransactions, fetchUserFromToken } = useAuthStore();
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div>
        <ul>
          {transactions.map((transaction: TransactionProps) => (
            <li key={transaction.id}>
              {transaction.description} - R$ {transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
