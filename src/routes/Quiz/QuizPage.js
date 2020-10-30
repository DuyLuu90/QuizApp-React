import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './QuizPage.css'
import Question from '../../component/question/question'
import {quizBank} from '../../assets/QuizBank'
import helpers from '../../services/helpers'

export default class QuizPage extends Component {
    static defaultProps = {

    }
    state={
        displayInstruction: true,
        displayFinal: false,
        quizBank:[],
        currentQuestion:0,
        score:0
    }
    componentDidMount(){
        helpers.shuffleArray(quizBank)
        const array= quizBank.slice(0,10)
        this.setState({quizBank: array})
    }
    updateQuestion=()=>{
        const {currentQuestion,quizBank}= this.state
        console.log(quizBank.length)
        if (currentQuestion+1 === quizBank.length){
            this.setState({displayFinal: true})
        }
        else {
            this.setState({currentQuestion: currentQuestion+1})
        } 
    
    }
    updateScore=()=>{
        this.setState({score: this.state.score+1})
    }
    playNow=()=>{
        this.setState({displayInstruction: false})
    }
    renderInstructions(){
        return(
            <div className='js-quiz'>
                <h1>INSTRUCTIONS</h1>
                <ul>
                    <li>A round of trivia contains 10 multiple-choice questions</li>
                    <li>After you submit your answer for a question,the correct answer will be revealed, and your score will be updated</li>
                    <li>You have to submit the answer in order to move to the next question. </li>
                    <li>At the end of the round, you will see your final score. That's very simple. Hope you'll have some fun and good luck! </li>
                </ul>
                <button type='button' onClick={this.playNow}>PLAY NOW</button>
            </div>
        )
    }
    /*
    renderQuestions(){
        const questions= this.state.quizBank.map((question,i)=>
            <Question key={i}item={question} 
                updateQuestion={this.updateQuestion}
                updateScore={this.updateScore}
            />)
        return questions;
    }*/
    renderQuestion(){
        const {currentQuestion,score,quizBank}= this.state
        const question= quizBank[currentQuestion]
        console.log(question)
        return (
            <div>
                <div className='control' id='quiz-info'> 
                    <div>
                        Question: {currentQuestion+1}/10
                    </div>
                    <div>
                        Score: {score}/10
                    </div>
                </div>
                <Question item={question} 
                updateQuestion={this.updateQuestion}
                updateScore={this.updateScore}/>
            </div>
        )
    }
    renderFinalScreen(){
        const {score}= this.state
        return(
            <div className='js-quiz'>
                <div>
                    <h1>THANK YOU</h1>
                    <p> You have completed your quiz. Your score is <strong>{score}/10</strong>. What would you like to do next? </p>
                </div>
                <div className='control' id='quiz-final'>
                    <Link to='/' aria-label='home-page'>EXIT</Link>
                    <Link to='/quiz' aria-label='quiz-page' onClick={()=>window.location.reload(false)}>RETAKE</Link>
                </div>
            </div>
        )
    }

    render(){
        const {displayInstruction,displayFinal}= this.state
        const instruction= this.renderInstructions()
        const questions= this.renderQuestion() 
        const final= this.renderFinalScreen()
        /*
        const html= (displayInstruction)? instruction
                    : (displayFinal)? final
                    : questions*/
        return(
            <div>
                {displayInstruction && instruction}
                {!displayFinal && !displayInstruction && questions}
                {displayFinal && final}
            </div> 
        )
    }
}