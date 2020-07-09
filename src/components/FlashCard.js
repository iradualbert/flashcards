import React, { useState } from 'react'

export default function FlashCard({ question }) {
    const [showAnswer, setShowAnswer] = useState(false)

    function handleClick() {
        setShowAnswer(!showAnswer);
    }

    return (
        <div className={`card ${showAnswer ? "flip" : ""}`}
            onClick={() => handleClick()
            }>
            <div className="front" >
                <p>{question.question}</p>
                <div className="card-options">
                    {question.options.map((option, id)=> <li key={id} className="card-option">{option}</li>)}
                </div>
            </div>
            <div className="back">
                {question.answer}
            </div>
        </div >
    )
}

