import React, {Component} from 'react'
import {Prompt} from 'react-router-dom'
import './QuizPage.css'
import Question from '../../component/question/question'
import {quizBank} from '../../assets/QuizBank'
import helpers from '../../services/helpers'

export default class QuizPage extends Component {
    static defaultProps = {
        history: {}
    }
    state={
        displayInstruction: true,
        displayFinal: false,
        quizBank:[],
        currentQuestion:0,
        score:0,
        playNow: false,
        time:0,
    }
    componentDidMount(){
        helpers.shuffleArray(quizBank)
        const array= quizBank.slice(0,10)
        this.setState({quizBank: array})
    }

    startClock=()=>{
        this.myInterval= setInterval(()=>{
            this.setState({time: this.state.time+1})
        },1000)
    }
    stopClock=()=>{
        clearInterval(this.myInterval)
    }
    updateQuestion=()=>{
        const {currentQuestion,quizBank}= this.state
        if (currentQuestion+1 === quizBank.length){
            this.stopClock()
            this.setState({
                playNow: false,
                displayFinal: true})
        }
        else {
            this.setState({currentQuestion: currentQuestion+1})
        } 
    }
    updateScore=()=>this.setState({score: this.state.score+1})
    
    playNow=()=>{
        this.setState({
            playNow: true,
            displayInstruction: false})
        this.startClock()
    }

    renderInstructions(){
        return(
            <div className='js-quiz'>
                <h1>INSTRUCTIONS</h1>
                <ul>
                    <li>A round of trivia contains 10 multiple-choice questions</li>
                    <li>After submitting your answer,the correct answer will be revealed, and your score will be updated</li>
                    <li>Submit the answer in order to move to the next question. </li>
                    <li>At the end of the round, you will see your final score. That's very simple. Have fun and good luck! </li>
                </ul>
                <button type='button' onClick={this.playNow}>PLAY NOW</button>
            </div>
        )
    }
    renderQuestion(){
        const {currentQuestion,score,quizBank,time}= this.state
        const question= quizBank[currentQuestion]
        const clock= new Date(time*1000).toISOString().substr(11,8)
        return (
            <div>
                <div className='timer'>
                    {clock}
                </div>
                <div className='control' id='quiz-info'> 
                    <div>
                        Question: {currentQuestion+1}/10
                    </div>
                    <div>
                        Score: {score}/10
                    </div>
                </div>
                <Question 
                    item={question} 
                    updateQuestion={this.updateQuestion}
                    updateScore={this.updateScore}
                />
            </div>
        )
    }
    renderFinalScreen(){
        const {score, time}= this.state
        const {history}= this.props
        const clock= new Date(time*1000).toISOString().substr(11,8).split(':')
        const hours= Number(clock[0])
        const mins= Number(clock[1])
        const secs = Number(clock[2])
        return(
            <div className='js-quiz' id='final'>
                <div>
                    <h1>THANK YOU</h1>
                    <p> You completed your quiz in 
                        {hours>0 && <strong> {hours} hours </strong>}
                        {mins>0 && <strong className='red'> {mins} minutes</strong>}
                        {secs>0 && <strong className='green'> {secs} seconds</strong>}
                        . Your score is <strong>{score}/10</strong>. What would you like to do next? </p>
                </div>
                <div className='control' id='quiz-final'>    
                    <button type='button' onClick={()=>history.push('/')}>EXIT</button>
                    <button type='button' onClick={()=>window.location.reload()}>RETAKE</button> 
                </div>
            </div>
        )
    }
    
    render(){
        const {displayInstruction,displayFinal}= this.state
        const instruction= this.renderInstructions()
        const questions= this.renderQuestion() 
        const final= this.renderFinalScreen()
        const html=   displayInstruction  ? instruction
                    : displayFinal        ? final
                    : questions
        
        return (
            <div>
                <Prompt 
                    when={this.state.playNow}
                    message={JSON.stringify({
                        content:'You have not finished your quiz. Are you sure you want to leave?'
                    })}/>
                {html}
            </div>
        )
    }
}
