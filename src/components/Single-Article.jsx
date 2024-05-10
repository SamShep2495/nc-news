import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, getCommentsForArticle, getUsers, fixDate } from "../../api.get"
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
    const [error, setError] = useState(null);

    const { article_id } = useParams()

    useEffect (() => {
        getSingleArticle(article_id)
        .then((body) => {
            setArticle(body[0])
        })
        .catch((error) => {
            console.error("Error fetching article:", error)
            setError({error});
        })
    }, [article_id])

    useEffect (() => {
        getCommentsForArticle(article_id)
        .then((body) => {
            setComments(body.comments)
        })
        .catch((error) => {
            console.error("Error fetching comments:", error)
            setError({error});
        })
    }, [article_id])

    useEffect(() => {
        getUsers()
        .then((body) => {
            setUsers(body.users)
        })
        .catch((error) => {
            console.error("Error fetching user:", error)
            setError({error});
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
                setError({error});
            });
    };

    const handleDelete = (comment_id) => {
        deleteComment(comment_id)
            .then((res) => {
                setComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
            })
            .catch((err) => {
                console.error("Error deleting comment", err)
                setError({error});
            })
    }

    if (error) {
        return (
            <div className='spacing'>
                <p>Error</p>
            </div>
        )
    } else {

    

        return (
            <>
              <div className='spacing'></div>
          
              <div>
                {article && (
                  <div key={article.article_id} className="single-card">
                    <img src={article.article_img_url} alt="" />  
                    <div className="single-card-content">
                      <p>Title: {article.title}</p>
                      <p>Topic: {article.topic}</p>
                      <p>Body: {article.body}</p>
                      <p>Comments: {article.comment_count}</p>
                      <p>Date Posted: {fixDate(article.created_at)}</p>
                      <button disabled={voteChanges[article_id] === 1} onClick={() => handleVote(article_id, 1)}>+</button>
                      <p>Votes: {article.votes + voteChanges[article_id] || 0}</p>
                      <button disabled={voteChanges[article_id] === -1} onClick={() => handleVote(article_id, -1)}>-</button>
                    </div>
                  </div>
                )}
          
                <div className="comment-card">
                  <div className="comment-card_content">
                    <form onSubmit={handleComment}>
                      <label htmlFor="comment">Leave a Comment</label>
                      <br />
                      <input 
                        id="comment"
                        name="text"
                        className='input'
                        placeholder="Comment"
                        type="text"
                        onChange={handleBody}
                        value={comment.body}
                      />
                      <br />
                      <div className="sort-dropdown">
                        <select value={comment.username} onChange={handleUsername}>
                          <option>Pick a Username</option>
                          <option disabled>-----------------------</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                          ))}
                        </select>
                      </div>
                      
                      <button className="learn-more" type="submit">
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">{submitting ? "Submitting..." : "Submit"}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
          
              <div >
                {comments.map((comment) => {
                  return (
                    <div className ="comment" key={comment.comment_id}>
                      <p>Author: {comment.author}</p>
                      <p>Comment: {comment.body}</p>
                      <p>Votes: {comment.votes}</p>
                      <p>Date: {fixDate(comment.created_at)}</p>
                      <button className="learn-more" type="delete" onClick={() => handleDelete(comment.comment_id)}>
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Delete</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </>
          )
          
}
}

export default SingleArticle


                    