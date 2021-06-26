import { ReactNode } from 'react';
import '../styles/question.scss';
import cx from 'classnames';
 


type QuestionProps = {
    content:string;
    author:{
        name:string;
        avatar:string;
    }
    children?:ReactNode;
    isAnswered?:boolean;
    isHighlighted?:boolean
}

export function Question({content,author,children,isAnswered=false,isHighlighted=false}:QuestionProps){
    return(
        <div className={cx(
            'question',
            {answered:isAnswered},
            {highlighted:isHighlighted && !isAnswered}
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt="avatar"  />
                <span>{author.name}</span>
                </div>
                <div className="buttons">{children}</div>
            </footer>
        </div>
    )
}