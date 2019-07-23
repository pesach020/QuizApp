import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import logo from '../assets/quiz.png';


const Header: React.FC = () => {
    return (
        <div>
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <NavLink exact to="/" className="nav-link" activeClassName="nav-link-active">
                            <Typography variant="h6" className="mx-3 cursor-pointer">
                                Home
                            </Typography>
                        </NavLink>
                    </Toolbar>
                </AppBar>
            </header>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
});

export default connect(mapStateToProps)(Header);
