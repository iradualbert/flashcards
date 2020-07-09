import React, { useState, useEffect } from 'react';
import './App.css';
import FlashCard from './components/FlashCard'

const categoryUrl = "https://opentdb.com/api_category.php"
const mainUrl = "https://opentdb.com/api.php";

function decodeString(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}
function App() {

  const [flashCards, setFlashCards] = useState([])
  const [categories, setCagetories] = useState([])

  useEffect(() => {

    fetch(`${mainUrl}?amount=10`)
      .then(res => res.json())
      .then(({ results }) => {
        const resultList = results.map((question, index) => {
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(question.question),
            answer: decodeString(question.correct_answer),
            options: [question.correct_answer, ...question.incorrect_answers.map(answer => decodeString(answer))].sort(() => Math.random() - .5)
          }
        });
        setFlashCards(resultList)
      })
    fetch(categoryUrl)
      .then(res => res.json())
      .then((data) => {
        setCagetories(data.trivia_categories)
      })
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = document.getElementById("form")
    fetch(`${mainUrl}?` + new URLSearchParams({
      amount: form.amount.value,
      category: form.category.value,
      difficulty: form.difficulty.value,
      type: form.type.value
    }))
    .then( resp => resp.json())
      .then(({ results }) => {
        const resultList = results.map((question, index) => {
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(question.question),
            answer: decodeString(question.correct_answer),
            options: [question.correct_answer, ...question.incorrect_answers.map(answer => decodeString(answer))].sort(() => Math.random() - .5)
          }
        });
        setFlashCards(resultList)
      })
  }

  const flashCardsList = flashCards.length ? flashCards.map((question) =>
    <FlashCard key={question.id} question={question}
    />) : "Loading......."

  return (
    <div className="container">
      <div className="header">
        <form className="form" id="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Number of Questions</label>
            <input type="number" defaultValue={10} name="amount"></input>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select defaultValue="Choose Category" name="category">
              <option value="">Choose Category</option>
              {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select name="difficulty">
              <option value="">Choose Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="type">
              <option value="">Choose Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Generate</button>
          </div>

        </form>
      </div>
      <div className="card-grid">{flashCardsList}</div>
      
    </div>
  );
}

export default App;
