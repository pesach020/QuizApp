import React from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import family from '../img/family.jpg'


const StartPage: React.FC = () => {
    const imgSrc = family;
    return (
        <div>
            <h1>Are you a family person?</h1>
            <img
                className={"photo"}
                src={imgSrc}
                alt="family"
            />
            <p>Click to start the quiz</p>
            <Link to="/question">
                <Button variant="contained" color="primary">
                    Start
                </Button>
            </Link>
        </div>
    );
};

export default StartPage;
