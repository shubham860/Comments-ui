import React, {useState, useContext } from "react";
import { commentsStore } from "../commentsStore";
import CommentInput from "./commentInput";
import Avatar from '../images/avatar.png';
import Like from '../images/like.png';
import Edit from '../images/edit.png';
import Delete from '../images/delete.png';
import CommentIcon from '../images/comment.png';

const Comment = ({comment, deleteComment, id, setComments, editComment}) => {
    const comments = useContext(commentsStore);
    const [editId, setEditId] = useState(null);
    const [replyId, setReplyId] = useState(null);
    const [toggleAllComment, setToggleComment] = useState(true);

    const handleUpvote = (type, _id) => {
        const _comments = [...comments];
        if(type !== 'replyUpVote'){
            _comments[id].upvote += 1;
        }else{
            _comments[id].replies && (_comments[id].replies[_id].upvote += 1);
        }
        setComments(_comments);
    }

    const removeReplies = (_id) => {    
        const _comments = [...comments];
        _comments[id].replies = _comments[id].replies.filter((_,idx) => idx !== _id);
        setComments(_comments);
    }
    
    const renderReplies = (replies) => {
        const repliesLength = toggleAllComment ? 1 : replies.length;
        return replies.map((reply, index) => {
            if(index < repliesLength){
                return <div className='reply-section' key={index}>
                                <div className='description'><img src={Avatar} alt='avatar' height='20' width='20' className='user-image' />{reply.description}</div>
                                <div className='action-bar'>
                                    <div className='upvote' onClick={() => handleUpvote('replyUpVote', index)}><span className='upvote-title'>{reply.upvote > 0 ? reply.upvote : ''}</span><img src={Like} alt='avatar' height='14' width='14' className='user-image' /></div>
                                    <div className='reply' onClick={() => removeReplies(index)}><img src={Delete} alt='avatar' height='14' width='14' className='user-image' /></div>
                                </div>
                        </div>
            }
        })
    }
    const { replies, upvote, description } = comment;
    return <div className='comment'>
                {( editId || editId === 0) ? <CommentInput type='reply' place='write something...' action={'edit'} setComments={setComments} value={comment.description} editId={editId} setEditId={setEditId}/> : 
                        <div>
                            <div className='description'><img src={Avatar} alt='avatar' height='20' width='20' className='user-image' />{description}</div>
                            <div className='action-bar'>
                                <div className='upvote' onClick={() => handleUpvote('comment')}><span className='upvote-title'>{upvote > 0 ? upvote : ''}</span><img src={Like} alt='avatar' height='14' width='14' className='user-image' /></div>
                                <div className='reply' onClick={() => setReplyId(id)}> <img src={CommentIcon} alt='avatar' height='14' width='14' className='user-image' /></div>
                                <div className='reply' onClick={() => {setEditId(id)}}> <img src={Edit} alt='avatar' height='14' width='14' className='user-image' /></div>
                                <div className='reply' onClick={() => deleteComment(id)}> <img src={Delete} alt='avatar' height='14' width='14' className='user-image' /></div>
                            </div>
                            {replies && 
                                <div className='replies'>
                                    {renderReplies(replies) }
                                    {replies.length > 1 && <div className='show-replies' onClick={() => setToggleComment(!toggleAllComment)}>{toggleAllComment ? 'show' : 'hide'} {toggleAllComment ? `${replies.length - 1} more` : ''} {replies.length - 1 > 1 ? 'replies' : 'reply'}</div>}
                                </div>
                            } 
                            <div className='reply-input'>
                                { (replyId || replyId === 0) && <CommentInput type='reply' place='write something...' action={'reply'} setComments={setComments} placeholder={'reply...'} replyId={replyId} setReplyId={setReplyId}/>}
                            </div>
                
                        </div>
                }
        </div>
}

export default Comment;