import { useEffect, useState } from "react";
import {web3} from "./utils/config"
import { connectWallet ,myContract  } from "./utils/config";


function App() {
    const [accounts,setAccounts]=useState(null);
    const [inputText, setInputText]=useState("");

    const viewMessege = async () =>{
        const data = await myContract.methods.getGreeting().call();
        console.log(data)
    }

    const setdata = async() => {
        const gas = await myContract.methods.setGreeting(inputText).estimateGas({from:accounts});
        const transaction = await myContract.methods.setGreeting(inputText).send({from:accounts,gas});
        console.log(transaction)
    }

    useEffect(()=>{
        checkConnection();
    },[]);

    const checkConnection= async () => {
        if (window.ethereum) {
            try{
        const accounts = await  web3.eth.getAccounts();        
             if(accounts.length > 0) {
                setAccounts(accounts[0]);
                return accounts[0];
             } else { 
                console.log("No account was found");
                return null;
             }  
            }catch(e) {
                console.error("error connecting to the wallet"+e);
                return null;
            }
        }else {
            console,log("you need to install your meta mask")
        }
        

    }
 

 return (
 <div>
      {accounts ? (
        <p>{accounts}</p>
      ) : (
        <button onClick={connectWallet}>connect wallet</button>
      )}

      <input type="text" onChange={(e) => {
        console.log(e.target.value)
        setInputText(e.target.value)

      }}
      />
      <button onClick={viewMessege}>view message</button>
      <button onClick={setdata}>SetGreeting</button>

      <p>Greeting</p>
    </div>
  );
}

export default App
