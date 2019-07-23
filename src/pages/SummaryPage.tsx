import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import './SummaryPage.scss';

interface IProps {
    onStartAgain: () => void;
    ms: string;
    imgSrc: string;
}

const SummaryPage: React.FC<IProps> = ({onStartAgain, ms, imgSrc}) => {
    return (
        <div>

        <div>
            <h2>Are you a family oriented person?</h2>
            {
               <h1 className={"ms"}>{ms}</h1>

            }
            <img
                className={"photo"}
                src={imgSrc}
                alt=""
            />
        </div>
            <Link to="/">
                <Button variant="contained" color="primary" onClick={onStartAgain}>
                    Try again
                </Button>
            </Link>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    ms: state.scores.ms,
    imgSrc: state.scores.imgSrc
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStartAgain: () => {
         dispatch({type:'RESET_VIEW'});
        dispatch({type:'RESET_SCORE'});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
