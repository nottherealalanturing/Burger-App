import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom';


const NavigationItem = (props) => (
    <li className='NavigationItem'>
    <NavLink 
    to={props.link}
    exact={props.exact}
    activeClassName={'active'}>
    {props.children}
    </NavLink></li>
);

export default NavigationItem;  