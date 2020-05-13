import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionsTypes";
import * as axios from "axios";

export function createQuizQuestion(item) {
return{
    type: CREATE_QUIZ_QUESTION,
    item
}
}

export function resetQuizCreation() {
return {
    type: RESET_QUIZ_CREATION
}
}

export function finishCreateQuiz() {
    return async ( dispatch, getState )=> {
        await  axios.post("https://react-quiz-5afa9.firebaseio.com/quizez.json", getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}