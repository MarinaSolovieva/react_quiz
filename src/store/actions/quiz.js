import instance from "../../Api/Api"
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZEZ_ERROR,
    FETCH_QUIZEZ_START,
    FETCH_QUIZEZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    RETRY_QUIZ
} from "./actionsTypes";

export function fetchQuizez() {
    return async dispatch => {
        dispatch(fetchQuizezStart());
        try {
            const response = await instance.get('quizez.json');
            const quizez = [];
            Object.keys(response.data).forEach((key, index) => {
                quizez.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            });

            dispatch(fetchQuizezSuccess(quizez))
        } catch (error) {
            dispatch(fetchQuizezError(error))
        }
    }
}


export function fetchQuizezStart() {
    return {
        type: FETCH_QUIZEZ_START
    }
}

export function fetchQuizezSuccess(quizez) {
    return {
        type: FETCH_QUIZEZ_SUCCESS,
        quizez
    }
}

export function fetchQuizezError(error) {
    return {
        type: FETCH_QUIZEZ_ERROR,
        error: error
    }
}

export function fetchQuizById(quizId) {
    console.log(quizId)
    return async dispatch => {
        dispatch(fetchQuizezStart())
        try {
            const response = await instance.get(`quizez/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizezError(error))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }

}

export function quizSetState(results, answerState) {
    return {
        type: QUIZ_SET_STATE,
        results, answerState
    }
}

export function finishQuiz() {
return {
    type: FINISH_QUIZ
}
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}



export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

        const state = getState().quiz;
        const results = state.results;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === "success") {
                return
            }
        }
        if (state.quiz[state.activeQuestion].rightAnswerId === answerId) {
            if (!results[state.quiz[state.activeQuestion].id]) {
                results[state.quiz[state.activeQuestion].id] = "success"
            }

            dispatch(quizSetState(results,{[answerId]: "success"}))

            let timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())

                } else {
                    dispatch (quizNextQuestion(state.activeQuestion +1))
                }

                window.clearTimeout(timeout)
            }, 1000);

        } else {
            results[state.quiz[state.activeQuestion].id] = "error"
            dispatch(quizSetState(results,{[answerId]: "error"}))

        }
    }
}

export function retryQuiz() {
return {
    type: RETRY_QUIZ
}
}


function isQuizFinished (state) {
    return state.activeQuestion + 1 === state.quiz.length
};


