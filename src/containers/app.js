import React, {Component} from 'react';
import './app.scss';
import { getQuestion } from './../api'; 
import {Question, MyAnswer, CompAnswer, Button, Result} from 'Components';
import Aux from './../utils/aux_util';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        value: 0,
        query: '',
        answer: ''
      },
      userAnswer: '',
      isModalOn: false,
      isCorrect: 'Correct',
      dataLoaded: false
    }
  }

  handleKeyUp = (e) => {
    this.setState(prevState => ({
      ...prevState,
      userAnswer: e
    }))
  }

  compareAnswers = () => {
    if(!this.state.userAnswer) return;

    let stateCopy = Object.assign({}, this.state);

    stateCopy.question.answer === stateCopy.userAnswer ? stateCopy.isCorrect = 'Correct' : stateCopy.isCorrect = 'Wrong';
    stateCopy.isModalOn = true;

    this.setState({
      ...stateCopy
    })
  }

  newQuestion = () => {
    let that = this;
    getQuestion().then(function (response) {
      that.setState(prevState => ({
        question : {
          value: response.value,
          query: response.question,
          answer: response.answer
        },
        dataLoaded: true,
        isModalOn: false
      }))
    })
  }

  componentDidMount() {
    this.newQuestion();
  }

  render() {
    return this.state.dataLoaded && (
      <Aux>
        <div className="top">
          <Question query={this.state.question.query} value={this.state.question.value} />
          <MyAnswer onKeyUp={this.handleKeyUp} />
          <Button onClick={this.compareAnswers}>
            Submit
          </Button>
        </div>
        {this.state.isModalOn && 
          <div className="bottom">
            <Result result={this.state.isCorrect} />
            <CompAnswer compAnswer={this.state.question.answer}/>
            <Button onClick={this.newQuestion}>
              Next
            </Button>
          </div>
        }
      </Aux>
    )
  }
}
