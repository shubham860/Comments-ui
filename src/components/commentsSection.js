import React, {useContext} from "react";
import { commentsStore } from '../commentsStore';
import CommentInput from "./commentInput";
import Comment from "./comment";

const CommentsSection = ({setComments, type}) => {
    const comments = useContext(commentsStore);
    
    const deleteComment = (index) => {
        setComments(comments.filter((_,idx) => idx !== index ));
    };

    return <div className='comment-section-container'>
                <CommentInput setComments={setComments} type='main' placeholder='Add your comment'/>
                <div className='comment-wrapper'>
                    {
                       comments.length ? comments.map((comment, index) => <Comment comment={comment} deleteComment={deleteComment} setComments={setComments} key={index} id={index} />) : 
                                  <div className='no-comments'>No Comments</div>
                    }
                </div>
            </div>
};

export default CommentsSection;