import { Stack } from '@mui/material';
import Image2 from '../assets/image_1.jpg';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from '../customs/CustomButton';
import { useContext, useState } from 'react';
import { IngredientContext, ResultContext } from '../App';
import { OpenAi } from '../../hooks/api/OpenAi';

export const Choose = ({ onBack }) => {
  const {Ask,response} = OpenAi();
  const {result,setResult} = useContext(ResultContext)
  const {history,setHistory,page,setPage} = useContext(IngredientContext)
  const [inputValue, setInputValue] = useState('');
  const [words, setWords] = useState([]);

  const handleAddWord = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !words.includes(trimmed)) {
      setWords(prev => [...prev, trimmed]);
      setInputValue('');
    }
  };

  const handleRemoveWord = (wordToRemove) => {
    setWords(prev => prev.filter(w => w !== wordToRemove));
     
  };
  const handleSubmit = async () => {
    onBack();
    let updateHistory = [...history,{role:"user",content:words.toString()}] 
    setHistory([...history,{role:"user",content:words.toString()}])

    let res = await Ask(updateHistory)
    const cleaned = res
      .replace(/```json\s*/i, '')   
      .replace(/```$/, '');       
    console.log(cleaned)
    await setResult(JSON.parse(cleaned).dishes);
    setPage(3)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddWord();
  };

  return (
    <Stack
      style={{ height: "80vh" }}
      gap="20px"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <img width="500px" src={Image2} alt="ingredient" />

      <div className="input-ingredients">
        <div className="input-group">
          <input
            type="text"
            placeholder="პროდუქტი..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="sbt" onClick={handleAddWord} style={{ cursor: 'pointer' }}>
            <CheckIcon />
          </div>
        </div>
      </div>

      <Stack
        direction="row"
        style={{ width: "70%" }}
        flexWrap="wrap"
        gap="10px"
      >
        {words.map((word, index) => (
          <Stack
            key={index}
            className="inp-cover"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div className="inp-word" style={{ fontSize: "14px", flex: 1 }}>
              {word}
            </div>
            <div
              className="remove-icon"
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => handleRemoveWord(word)}
            >
              <CloseIcon style={{ fontSize: "17px" }} />
            </div>
          </Stack>
        ))}
      </Stack>

      <div onClick={handleSubmit}>
        <CustomButton title={"დასრულება"} />
      </div>
    </Stack>
  );
};
