import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZEZ_ERROR,
    FETCH_QUIZEZ_START,
    FETCH_QUIZEZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    RETRY_QUIZ
} from "../actions/actionsTypes";

const initialState = {
    quizez: [],
    isLoading: false,
    error: null,
    results: {},  // { [id]: "success" "error" }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: "success" "error" }
    quiz: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZEZ_START:
            return{
                ...state,
                isLoading: true
            }
        case FETCH_QUIZEZ_SUCCESS:
            return{
                ...state,
                isLoading: false,
                quizez: action.quizez

            }
        case  FETCH_QUIZEZ_ERROR:
            return{
                ...state,
                isLoading: false,
                error: action.error
            }
        case   FETCH_QUIZ_SUCCESS:
            return{
                ...state,
                isLoading: false,
                quiz: action.quiz
            }
        case   QUIZ_SET_STATE:
            return{
                ...state,
                results: action.results,
                answerState: action. answerState
            }
        case   FINISH_QUIZ:
            return{
                ...state,
                isFinished: true
            }
        case   QUIZ_NEXT_QUESTION:
            return{
                ...state,
                activeQuestion: action.number,
                answerState: null
            }
        case   RETRY_QUIZ:
            return{
                ...state,
                activeQuestion: 0,
                answerState: null,
                results: {},  // { [id]: "success" "error" }
                isFinished: false

            }
        default:
            return state
    }
}
