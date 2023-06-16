import React, {useEffect, useState} from "react";

const Dictionary = () => {

// set the variables
const [word, setWord] = useState("");
const [phonetic, setPhonetic] = useState("");
const [meanings, setMeanings] = useState("");
const [speechType, setSpeechType] =useState("");


const getMeaningOfWordsApi = () => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
            
        }
        // read the response as json.
       return response.json();
    })
    .then(responseAsJson => {
        console.log(responseAsJson);
        //Checking inside the API
        console.log("Phonetics", responseAsJson[0].phonetic);
        setPhonetic(responseAsJson[0].phonetic);

        console.log("Type of speech", responseAsJson[0].meanings[1].partOfSpeech);
        setSpeechType("Type of speech", responseAsJson[0].meanings[1].partOfSpeech);

        console.log("Meanings", responseAsJson[0].meanings[0].definitions[0].definition);
        setMeanings(responseAsJson[0].meanings[0].definitions[0].definition);
        
        if(phonetic === undefined || phonetic===""){
            alert("the phonetic for this word was not retrived");
        }

        if(meanings === undefined || meanings===""){
            alert("the meanings for this word was not retrived");
        }

        if(speechType === undefined || speechType===""){
            alert("the speechType for this word was not retrived");
        }
    })

    .catch(error => {
        console.log("There is an error somewhere!...:\n", error);
    })
}

    return (
        <div className="container">
            <input 
                defaultValue={word} 
                onChange={(e)=> setWord(e.target.value)}
                placeholder="Choose a word!..."
            />
            <h2>{word}</h2>
            <div>
                <div className="howToSay">Phonetics:{phonetic}</div>
                <div className="whereFrom">Meanings:{meanings}</div>
                <div className="typeOfSpeech">Type:{speechType}</div>
            
            </div>
            <div>
                <button className="wordsData" type="submit" onClick={()=>{
                    if(word===" "){
                        alert("Please insert a word!...")
                    } else 
                    getMeaningOfWordsApi();
                }}>Get from dictionary
                </button>
            </div>
        </div>
    );
}

export default Dictionary;