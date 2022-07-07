import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { addQuestions, UPDATE_SCORE } from '../redux/actions';
import { getQuestions } from '../services/GetApi';
import '../css/Game.css';

/* Feito através da indicação do colega Jessy Damasseno no slack */
function decodeEntity(inputStr) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
}

class Game extends React.Component {
  state = {
    countdown: 35,
    novoArray1: [],
    correctAnswer: '',
    index: 0,
    isAnswered: '',
    isDisable: false,
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await getQuestions(token).then((resp) => {
      const { dispatch, history } = this.props;
      dispatch(addQuestions(resp));
      console.log(resp);
      if (resp.response_code !== 0) {
        localStorage.removeItem('token');
        history.push('/');
      }
    });

    this.shuffleAnswers();
  /*   const number = 1000;
    const timeOut = setTimeout(() => {
      this.setState((prev) => ({
        countdown: prev.countdown - 1,
      }));
    }, number);
    return timeOut; */
  }

  componentDidUpdate() {
    this.countdown();
  }

  shuffleAnswers = () => {
    const { questionResults } = this.props;
    //  questionResults.map((objeto) => this.setState({ correct: objeto.correct_answer}));
    const novoArray = questionResults.map((object) => ({
      category: object.category,
      question: object.question,
      answers: [object.correct_answer, ...object.incorrect_answers],
    }));

    this.setState({
      novoArray1: [...novoArray],
      correctAnswer: novoArray.map((answer) => answer.answers[0]),
    });
    return novoArray;
  }

  handleClickNext = () => {
    const num = 4;
    this.setState((previous) => {
      if (previous.index === num) {
        this.setState({ index: 0 });
      } else {
        this.setState({ index: previous.index + 1 });
      }
    });
  }

  handleClickAnswer = ({ target }) => {
    console.log(target);
    this.setState({ isAnswered: true });
    const buttons = document.querySelectorAll('.button-answers');
    console.log(buttons);
    buttons.forEach((button) => {
      if (button.id === 'incorrect') {
        button.style = 'border: 3px solid red';
      } else {
        button.style = 'border: 3px solid rgb(6, 240, 15)';
      }
    });
<<<<<<< HEAD
    this.scoreUpdate();
=======
    console.log(novoArray1[index].difficulty);
    console.log(target.id);
    // if (novoArray1[0])
    if (target.id === 'correct') {
      if (novoArray1[index].difficulty === 'hard') {
        const score = dez + (countdown * tres);
        dispatch(addScore(score));
        dispatch(addAssertations());
      } else if (novoArray1[index].difficulty === 'medium') {
        const score = dez + (countdown * 2);
        dispatch(addScore(score));
        dispatch(addAssertations());
      } else {
        const score = dez + (countdown);
        dispatch(addScore(score));
        dispatch(addAssertations());
      }
    }
>>>>>>> 075dd1c49eaf255140fa2cbe7d24172cf9260381
  }

  scoreUpdate = ({ target: { textContent } }) => {
    const { novoArray1, correctAnswer, countdown } = this.state;
    const { dispatch } = this.props;
    const multiplier = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (textContent === novoArray1[correctAnswer].correct_answer) {
      dispatch(UPDATE_SCORE(
        +'10' + (countdown * multiplier[novoArray1[correctAnswer].difficulty]),
      ));
    }
    this.handleClickAnswer();
  }

  countdown() {
    const { countdown } = this.state;
    const number = 1000;
    const timeOut = setTimeout(() => {
      if (countdown === 0) {
        this.setState({ isDisable: true, countdown: 0 });
      } else {
        this.setState((prev) => ({
          isDisable: false,
          countdown: prev.countdown - 1,
        }));
      }
    }, number);
    return timeOut;
  }

  render() {
    const { novoArray1, correctAnswer, index, isAnswered, isDisable } = this.state;
    const cardQuestion = novoArray1.map((question) => (
      <div key={ question.category } className="container">
        <div className="container-top">
          <div className="category-container">
            <p className="label-category">Categoria: </p>
            <p
              key={ question.category }
              className="category"
              data-testid="question-category"
            >
              {question.category}
            </p>
          </div>
          <div className="container-text">
            <p
              key={ question.question }
              data-testid="question-text"
            >
              {decodeEntity(question.question)}
            </p>
          </div>
          <div className="category-container countdown">
            <p className="contdown-text">{countdown}</p>
          </div>

        </div>
        <div
          data-testid="answer-options"
          className="questions-container"
        >
<<<<<<< HEAD
          Pergunta:
          {question.question}
        </p>
        <div data-testid="answer-options">
=======
>>>>>>> 075dd1c49eaf255140fa2cbe7d24172cf9260381
          {question.answers.map((answer, i) => (
            (correctAnswer.includes(answer))
              ? (
                <button
                  type="button"
                  key={ i + 1 }
                  id="correct"
                  className="button-answers"
                  data-testid="correct-answer"
                  onClick={ this.handleClickAnswer }
                  disabled={ isDisable }
                >
                  {decodeEntity(answer)}
                </button>
              )
              : (
                <button
                  type="button"
                  key={ i + 1 }
                  id="incorrect"
                  className="button-answers"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.handleClickAnswer }
                  disabled={ isDisable }
                >
                  {decodeEntity(answer)}
                </button>
              )
              //  Pesquisa: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
          ))/* .sort(() => [Math.random() - '0.5']) */}
        </div>
      </div>
    ));

    return (
      <div>
        <Header />
        {cardQuestion[index]}
        {(isAnswered)
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleClickNext }
                className="button-next"
              >
                Next
              </button>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionResults: state.questionsReducer.questions.results,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Game);
