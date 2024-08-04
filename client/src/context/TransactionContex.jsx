import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import BN from "bn.js";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  if (ethereum) {
    // const provider = new ethers.providers.Web3Provider(ethereum);
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return transactionContract;
  }
  return null;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions()
      } else {
        console.log("no accounts found");
      }
    } catch (error) {
      console.log("🚀  ~ error:", error);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("🚀 ~ connectWal ~ error:", error);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask");
      const transactionContract = await getEthereumContract();

      const { addressTo, amount, keyword, message } = formData;
      console.log("currentAccount", currentAccount);
      console.log(formData);
      const parsedAmount = ethers.parseEther(amount);
      console.log("🚀 ~ sendTransaction ~ parsedAmount:", parsedAmount);
      const parsedAmountBN = new BN(parsedAmount, 10);
      console.log(
        "🚀 ~ sendTransaction ~ parsedAmountBN._hex:",
        parsedAmount._hex
      );
      await ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208", //21000 GWEI
              value: parsedAmountBN.toString(16),
            },
          ],
        })
        .then((txHash) => console.log("eth txhash", txHash))
        .catch((error) => console.log("error", error.message));

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      // setIsLoading(true);
      // console.log(`Loading ${transactionHash.hash}`);
      // await transactionHash.wait();
      // setIsLoading(false);
      // console.log(`Success ${transactionHash.hash}`);

      // const transactionCount = await transactionContract.getTransactionCount();

      // setTransactionCount(transactionCount.toNumber());
      // what u did last is this npm i -S ethers@5.7.2 
      console.log("transactionHash", transactionHash.hash);
      const count = await transactionContract.getTransactionCount();
      console.log(count);
      setTransactionCount(count);
      setIsLoading(true);
      await transactionHash.wait();
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ sendTransaction ~ error:", error.message);

      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
