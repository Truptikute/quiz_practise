import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../data';

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);


    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];

    const checkAns = (elem, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                elem.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                elem.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const handleNext = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            if (index < data.length - 1) {
                const nextIndex = index + 1;
                setIndex(nextIndex);
                setQuestion(data[nextIndex]);
                setLock(false);
                option_array.forEach(option => {
                    option.current.classList.remove("wrong");
                    option.current.classList.remove("correct");
                });
            }
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? <></> : <>
                <h2>{index + 1}. {question.question}</h2>
                <ul>
                    <li ref={option1} onClick={(elem) => checkAns(elem, 1)}>{question.option1}</li>
                    <li ref={option2} onClick={(elem) => checkAns(elem, 2)}>{question.option2}</li>
                    <li ref={option3} onClick={(elem) => checkAns(elem, 3)}>{question.option3}</li>
                    <li ref={option4} onClick={(elem) => checkAns(elem, 4)}>{question.option4}</li>
                </ul>
                <button onClick={handleNext} disabled={!lock}>Next</button>
                <div className='index'>{index + 1} of {data.length} questions</div>
            </>}
            {result ? <>
                <h2>You Scored {score} out of {data.length}</h2>
                <button onClick={reset}>Reset</button>
            </> : <></>}
        </div >
    )
}
