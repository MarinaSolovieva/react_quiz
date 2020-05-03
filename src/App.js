import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./Containers/Quiz/Quiz";


const App = (props) => {
    return (
        <Layout>
              <Quiz/>
        </Layout>
    );
};

export default App;
