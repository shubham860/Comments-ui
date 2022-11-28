import React, { useContext, useState } from "react";
import { commentsStore } from "../commentsStore";
import Avatar from '../images/avatar.png'
import Cancel from '../images/cancel.png';
import '../app.scss';

const CommentInput = ({setComments, type, placeholder, action, editId, setEditId, replyId, setReplyId}) => {
    const comments = useContext(commentsStore);
    const [comment, setComment] = useState(comments[editId] && comments[editId].description || '');
    const [error, setError] = useState(false);

    const commentInputHandler = (event) => {
        error ? setError(false): '';
        setComment(event.target.value);
    }
    
    const commentHandler = (definedAction='') => {
        if(definedAction !== 'cancel' && comment !== ''){
            switch(action){
                case 'edit': comments[editId].description = comment;
                            setComments(comments);
                            setEditId('');
                            break;
                case 'reply': if(comments[replyId].replies){
                                comments[replyId].replies.push({description: comment, upvote: 0});
                            }else{
                                comments[replyId].replies = [{description: comment, upvote: 0}];
                            }
                            setComments(comments);
                            setReplyId('');
                            break;
                default:    setComments([...comments, { description: comment, upvote: 0}]);
                            setComment('');
                            break;
            }
        }else{
            setError(!error)
            action !== 'reply' ? setEditId('') : setReplyId('');
            setComment('');
        }
    }
    const inputFiledStyle = type !== 'main' ? 'reply-input' : 'main-input';
    return  <div className={inputFiledStyle}>
                    <img src={Avatar} alt='avatar' height='30' width='30' className='user-image' />
                    <div className='input-wrapper'>
                        <input type='text' value={comment} onChange={commentInputHandler} className='comment-input' placeholder={placeholder}/>
                        {error ? <div className='error-text'>please enter comment</div> : ''}            
                    </div>
                    <button onClick={commentHandler} className='comment-button'>{action!=='edit' ? 'post' : 'done'}</button>
                    {action==='edit' || action==='reply' ?  <button onClick={() => commentHandler('cancel')} className='comment-button-cancel'><img src={Cancel} alt='avatar' height='14' width='14' className='user-image' /></button> : ''}
            </div> 
}

export default CommentInput;