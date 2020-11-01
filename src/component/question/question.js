import React, {Component} from 'react'
import './question.css'
import helpers from '../../services/helpers'

export default class Question extends Component {
    static defaultProps={
        item:{
            question:'',
            incorrect:[],
            correct:''
        },
        updateScore: ()=>{},
        updateQuestion: ()=>{},
    }
    state={
        answer: '',
        options:[],
        displayAlert: false,
        alert: {
            message:'',
            color: ''
        }
    }
    shuffleOptions=()=>{
        const {incorrect,correct}= this.props.item
        const array= incorrect.slice()
        array.push(correct)
        helpers.shuffleArray(array)
        this.setState({options: array})
    }
    componentDidMount(){
        this.shuffleOptions()
    }
    componentDidUpdate(prevProps){
        if(this.props.item !== prevProps.item) {
            this.shuffleOptions()
        }
    }
    onChange= e=>{
        this.setState({answer: e.target.value})
    }
    handleQuestionSubmit= e=>{
        e.preventDefault()
        const {answer}= this.state
        const {correct}= this.props.item
        const alert= !answer ? {
            message: 'Please choose an option',
            color: 'yellow'
        }: (answer===correct)? {
            message: 'Your answer is correct',
            color: 'green'
        }: {
            message: `Sorry, the correct answer is "${correct}"`,
            color: 'red'
        }
        this.setState({
            alert: alert,
            displayAlert: true
        })
    }
    reset=()=>this.setState({
        answer:'',
        displayAlert:false
    })
    onOkClick= e=>{
        const {color}= this.state.alert
        const {updateQuestion,updateScore}= this.props
        this.setState({answer:''})
        if (color==='green'){
            updateScore();
            updateQuestion();
            this.reset()
        }
        else if (color==='red'){
            updateQuestion();
            this.reset()
        }
        else {
            this.reset()
        }
        
    }
    renderOptions(){
        const options= this.state.options.map((item,i)=>
            <div className='option' key={i}>
                <input type='radio' name='option' id={i} value={item} onChange={this.onChange} />
                <label htmlFor={i}>{item}</label>
            </div>)
        return options
    }
    renderQuestion(){
        const options=this.renderOptions()
        const {question}= this.props.item
        return(
            <form className='js-question' onSubmit={this.handleQuestionSubmit}>
                <h1>{question}</h1>
                <div className='options'>
                    {options}
                </div>
                <button type='submit'> SUBMIT </button>
            </form>
        )
    }
    renderAlert(){
        const {message,color}= this.state.alert
        return(
            <div className='js-alert'>
                <div className='alertMessage'>
                    <span className={color}>{message}</span>
                </div>
                <input type='button' value='OK' onClick={this.onOkClick}/>
            </div>
        )
    }
    render(){
        const html= (this.state.displayAlert)? this.renderAlert(): this.renderQuestion()
        return html
    }
}