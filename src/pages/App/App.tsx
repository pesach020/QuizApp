import React from 'react';
import './App.scss';
import StartPage from '../../pages/StartPage';
import SummaryPage from '../../pages/SummaryPage';
import QuizPage from '../../pages/QuizPage';
import Header from '../../components/Header'
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';



const App: React.FC = () => {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/start" component={StartPage}/>
                <Route path="/question/:index" component={QuizPage}/>
                <Route path="/summary" component={SummaryPage}/>

                {/* Redirects */}
                <Redirect exact from="/" to="/start"/>
                <Redirect exact from="/question" to="/question/1"/>

                {/* Fallback */}
                <Route path="/" render={() => <div>Page not found</div>}/>
            </Switch>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
});

export default connect(mapStateToProps)(App);
