import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const fetchData = async (url) => {
    const result = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return result;
  };
  const getTransaction = (id) => {
    fetchData("/db/transactions.json").then((res) =>
      setTransactions(res.filter((el) => el.account_id === id))
    );
  };
  useEffect(() => {
    fetchData("/db/customers.json").then((res) => {
      setCustomers(res);
    });
  }, []);

  return (
    <>
      <header>
        <a className="appname" href="/">
          Demo App
        </a>
        <nav></nav>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Accounts</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 &&
              customers.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td className="acc_td">
                    <ul className="accounts">
                      {item.accounts.map((acc, i) => (
                        <li
                          key={i}
                          onClick={(e) => {
                            document
                              .querySelectorAll("ul li")
                              .forEach((el) => el.classList.remove("active"));
                            e.currentTarget.classList.toggle("active");
                            getTransaction(acc);
                          }}
                        >
                          {acc}
                          <ul>
                            {transactions.length > 0
                              ? transactions.map((ts, i) => <li key={i}></li>)
                              : "No transactions"}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
