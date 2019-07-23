import {combineReducers, createStore} from 'redux'
import {ActiveViewEmum} from '../models/ActiveView';
import {IQuestion} from '../models/IQuestion';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpeg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';
import img7 from '../img/img7.png';
import img8 from '../img/img8.jpg';

const questions: Array<IQuestion> = [
    {
        id: 'q1',
        text: 'Do you like children? ',
        options: ['Yes- they are so cute ', 'No they\'re horrible', 'They can be annoying '],
        imgSrc: img4
    },
    {
        id: 'q2',
        text: 'If you had children would you feed them or yourself first?',
        options: ['Mostly me ', 'Them ', 'Share it out but give them more '],
        imgSrc: img5
    },
    {
        id: 'q3',
        text: 'What would you do if you saw a child being hit?',
        options: ['Go over to them ', 'Hit the adult ','Laugh and stare'],
        imgSrc: img6
    },
    {
        id: 'q4',
        text: 'What would you do if you saw a woman being hit ?',
        options: ['Hit the person', 'Go over and stop it ','Ring the police'],
        imgSrc: img7
    },
    {
        id: 'q5',
        text: 'Now like before but this time it\'s your friend?',
        options: ['Attack the attacker ','Laugh', 'Shout for help'],
        imgSrc: img8
    }
];

interface Action {
    type: string;
    payload: any;
}

const questionsReducer = (state = questions, action: Action) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return [...action.payload];

        default:
            return state;
    }
};

const scoresInitState = {
    ms: '',
    imgSrc: ''
};

const scoresReducer = (state = scoresInitState, action: Action) => {
    switch (action.type) {
    case 'ADVANCE_MS_ONE':
            return {
                ...state,
                ms: state.ms = 'You are amazing and perfect a family person',
                imgSrc: img1
            };
        case 'ADVANCE_MS_TWO':
            return {
                ...state,
                ms: state.ms = 'You\'re not a family person',
                imgSrc: img2
            };
        case 'ADVANCE_MS_THREE':
            return {
                ...state,
                ms: state.ms = 'You\'re in the middle, like most of the people',
                imgSrc: img3
            };

        case 'RESET_SCORE':
            return {...scoresInitState};

        default:
            return state;
    }
};

const pageViewState = {
    activeView: ActiveViewEmum.start,
    activeQuestion: 0,
};

const pageViewReducer = (state = pageViewState, action: Action) => {
    switch (action.type) {
        case 'ADVANCE_QUESTION':
            return {
                ...state,
                activeQuestion: state.activeQuestion + 1
            };

        case 'CHANGE_VIEW':
            return {
                activeView: action.payload,
                activeQuestion: 0
            };

        case 'RESET_VIEW':
            return {...pageViewState};


        default:
            return state;
    }
};

export default function configureStore() {
    // combine all reducers to create  root reducer
    const rootReducer = combineReducers({
        questions: questionsReducer,
        scores: scoresReducer,
        pageView: pageViewReducer
    });

    return createStore(rootReducer);
}
