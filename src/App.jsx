import { createContext, useEffect, useState } from "react";
import axios from "axios";
import hatIcon from './assets/hat.svg';
import translateIcon from './assets/transl.svg'
import { OpenAi } from "../hooks/api/OpenAi";
import './styles/index.scss'
import { Intro } from "./pages/Intro";
import { Choose } from "./pages/Choose";
import { Loading } from "./pages/Loading";
import { Result } from "./pages/Result";

export const IngredientContext = createContext()
export const ResultContext =  createContext()
function App() {
  const [result,setResult] = useState([])
  const [page,setPage] = useState(0);
  const {Ask,response} = OpenAi();
 const [history, setHistory] = useState([
  {
    role: "system",
    content: `I am going to list products and you recommend me what to cook. Answers should be in JSON format and instructions should be detailed. Response in Georgian language. JSON key names should be in English. Include cook_time. Recommend a couple of dishes. Result should always be in this format: 
    "dishes": [
      {
        "name": "",
        "ingredients": [],
        "instructions": [],
        "cook_time": ""
      }
    ]`
      }
]);

  return (
    <>
    <IngredientContext.Provider value={{history,setHistory,page,setPage}}>
      <div className="cover">
        <div className={`page ${page === 0 ? "active" : "inactive"}`}>
          <Intro onNext={() => setPage(1)} />
        </div>
        <ResultContext.Provider value={{result,setResult}}>
          <div className={`page ${page === 1 ? "active" : "inactive"}`}>
            <Choose onBack={() => setPage(2)} />
          </div>
          <div className={`page ${page === 2 ? "active" : "inactive"}`}>
            <Loading onBack={() => setPage(0)} />
          </div>
          <div className={`page ${page === 3 ? "active" : "inactive"}`}>
            <Result />
          </div>
        </ResultContext.Provider>
      </div>
    </IngredientContext.Provider>
    </>
  )
  }

export default App
