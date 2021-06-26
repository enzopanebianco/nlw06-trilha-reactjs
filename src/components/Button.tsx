import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?:boolean;
};

export function Button({isOutlined=false,...rest}:Props){
    return(
        <button className={
            `button ${isOutlined?'outlined':''}` 
        }

        {...rest}/>
    )
}