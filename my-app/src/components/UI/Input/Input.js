import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputCLasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputCLasses.push('Invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
            className={inputCLasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
            className={inputCLasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
            <select 
                className={inputCLasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            
            </select>);
            break;
        default:
            inputElement = <input 
            className={'InputElement'} 
            {...props.elementConfig} 
            value={props.value} 
                onChange={props.changed}
            />;
        
    }

    return (
        <div className={'Input'}>
            <label className={'Label'}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;