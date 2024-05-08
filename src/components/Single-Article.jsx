import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, getCommentsForArticle, getUsers } from "../../api.get"
import { patchVotes } from "../../api.patch"
import { postComment } from "../../api.post"
import { deleteComment } from "../../api.delete"

export const SingleArticle = () => {

    const [article, setArticle] = useState(null);
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([]);
    const [voteChanges, setVoteChanges] = useState({});
    const [comment, setComment] = useState({ username:'', body:' '})
    const [submitting, setSubmitting] = useState(false)

    const { article_id } = useParams()

    useEffect (() => {
        getSingleArticle(article_id)
        .then((body) => {
            setArticle(body[0])
        })
    }, [article_id])

    useEffect (() => {
        getCommentsForArticle(article_id)
        .then((body) => {
            setComments(body.comments)
        })
    }, [article_id])

    useEffect(() => {
        getUsers()
        .then((body) => {
            setUsers(body.users)
    })
    }, [])
    
    const handleVote = (article_id, vote) => {
            patchVotes(article_id, vote);
            setVoteChanges(prev => ({...prev, [article_id]: vote}));
            }

    const handleUsername = (event) => {
        setComment({ ...comment, username: event.target.value})
    }

    const handleBody = (event) => {
        setComment({ ...comment, body: event.target.value})
    }

    const handleComment = (event) => {
        event.preventDefault();
        setSubmitting(true);
        const newComment = {
            username: comment.username,
            body: comment.body
        };
        postComment(article_id, newComment)
            .then((newComment) => {
                setComments((prevComments) => [newComment, ...prevComments]);
                setSubmitting(false);
                setComment({ username: '', body: '' }); 
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
                setSubmitting(false);
            });
    };

    const handleDelete = (comment_id) => {
        deleteComment(comment_id)
            .then((res) => {
                setComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
            })
            .catch((err) => {
                console.error("Error deleting comment", err)
            })
    }

    return (
        <>
        <div className='spacing'></div>

        <div>
            {article && (
                <div key={article.article_id} className="article-card">
                <img className src={article.article_img_url} alt="" />  
                <p>Title: {article.title}</p>
                <p>Topic: {article.topic}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Date Posted: {article.created_at}</p>
                <button disabled={voteChanges[article_id] === 1} onClick={() => handleVote(article_id, 1)}>+</button>
                <p>Votes: {article.votes + voteChanges[article_id] || 0}</p>
                <button disabled={voteChanges[article_id] === -1} onClick={() => handleVote(article_id, -1)}>-</button>
                <br></br><br></br>
                <form onSubmit={handleComment}>
                    <label htmlFor="comment">Leave a Comment</label>
                    <br />
                    <input 
                        id="comment"
                        placeholder="Comment"
                        type="text"
                        onChange={handleBody}
                        value={comment.body}
                    />
                    <br />
                    <br />
                    <div className="username-dropdown">
                    <select value={comment.username} onChange={handleUsername}>
                        <option>Pick a Username</option>
                        <option disabled > ----------------------- </option>
                        {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    </div>
                    <br />

                    <button className="comment-submit" type="submit">
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
                
                
                </div>
                 
            )}
        </div>

        <div className ="comment">
            {comments.map((comment) => {
            return (
            <div key={comment.comment_id}>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Date: {comment.created_at}</p>
            <button className="comment-delete" type="delete" onClick={() => handleDelete(comment.comment_id)}>
                Delete this Comment
            </button>
            </div>
            )
        })}
        </div>
        </>
    )
}

export default SingleArticle