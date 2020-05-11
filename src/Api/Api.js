import * as axios from "axios";

// export default axios.create ({
//     baseURL: 'https://react-quiz-5afa9.firebaseio.com/'
// })

const instance = axios.create({
    baseURL: 'https://react-quiz-5afa9.firebaseio.com/'
})

export default instance;
