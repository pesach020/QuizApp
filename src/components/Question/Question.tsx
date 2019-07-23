import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {IQuestion} from '../../models/IQuestion';
import {Dispatch} from 'redux';
import {List, ListItem, ListItemText} from '@material-ui/core';
import './Question.scss'
import {Redirect, RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';

interface IProps {
    text: string;
    options: Array<string>;
    onNext: Function;
    isLast: boolean;
    imgSrc?: string;
}

let nonFamilyPerson = 0;
let familyPerson = 0;
let middlePerson = 0;


const Question: React.FC<IProps & RouteComponentProps> = ({text, options, onNext, isLast, match, imgSrc}) => {

    let questionIndex = 0;

    if (match && match.params) {
        // @ts-ignore
        questionIndex = parseInt(match.params['index']);
    }

    const [finished, setFinished] = useState(false);

    useEffect(() => {
        nonFamilyPerson = 0;
        familyPerson = 0;
        middlePerson =0;
    }, []);

    function onClick(answerIndex: number) {
        // question 1
        if (questionIndex === 1 && answerIndex === 0) {
            familyPerson++;
        } else if (questionIndex === 1 && answerIndex === 1) {
            nonFamilyPerson++;
        } else if (questionIndex === 1 && answerIndex === 2) {
            middlePerson++;
        }
        // question 2
        if (questionIndex === 2 && answerIndex === 0) {
            nonFamilyPerson++;
        } else if (questionIndex === 2 && answerIndex === 1) {
            familyPerson++;
        } else if (questionIndex === 2 && answerIndex === 2) {
            middlePerson++;
        }
        // question 3
        if (questionIndex === 3 && answerIndex === 0) {
            familyPerson++;
        } else if (questionIndex === 3 && answerIndex === 1) {
            nonFamilyPerson++;
        } else if (questionIndex === 2 && answerIndex === 2) {
            middlePerson++;
        }// question 4
        if (questionIndex === 4 && answerIndex === 0) {
            nonFamilyPerson++;
        } else if (questionIndex === 4 && answerIndex === 1) {
            familyPerson++;
        } else if (questionIndex === 2 && answerIndex === 2) {
            middlePerson++;
        }// question 5
        if (questionIndex === 5 && answerIndex === 0) {
            familyPerson++;
        } else if (questionIndex === 5 && answerIndex === 1) {
            nonFamilyPerson++;
        } else if (questionIndex === 2 && answerIndex === 2) {
            middlePerson++;
        }


        onNext(answerIndex, isLast);
        if (isLast) {
            setFinished(true);
        }
    }

    const optionalAnswers = options.map((q: string, i: number) => (
        <Link key={i} to={`/question/${questionIndex + 1}`}>
            <ListItem button onClick={onClick.bind(null, i)}>
                <ListItemText>{q}</ListItemText>
            </ListItem>
        </Link>
    ));


    if (finished) {
        return <Redirect to="/summary"/>;
    }

    return (
        <div className="Question">
            <h1>{text}</h1>
            <img
                className={"photo"}
                src={imgSrc}
                alt=""
            />
            <List className="Question-options">
                {optionalAnswers}
            </List>
        </div>
    );
};


const mapStateToProps = (state: any) => {
    const question: IQuestion = state.questions[state.pageView.activeQuestion];
    return {
        text: question.text,
        options: question.options,
        imgSrc: question.imgSrc,
        isLast: state.pageView.activeQuestion === state.questions.length - 1,
        ms: state.scores.ms,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onNext: (answerIndex: number, isLast: boolean) => {
        if (familyPerson > nonFamilyPerson) {
            dispatch({type: 'ADVANCE_MS_ONE'});
        } else if (nonFamilyPerson > familyPerson) {
            dispatch({type: 'ADVANCE_MS_TWO'});
        } else if(middlePerson > nonFamilyPerson || middlePerson > familyPerson) {
            dispatch({type: 'ADVANCE_MS_THREE'})
        }


        if (!isLast) {
            dispatch({type: 'ADVANCE_QUESTION'});
        }
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));
