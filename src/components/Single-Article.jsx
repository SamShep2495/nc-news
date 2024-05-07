import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, getCommentsForArticle } from "../../api.get"
import { patchVotes } from "../../api.patch"

export const SingleArticle = () => {

    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [voteChanges, setVoteChanges] = useState({});

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
    
    const handleVote = (article_id, vote) => {
            patchVotes(article_id, vote);
            setVoteChanges(prev => ({...prev, [article_id]: vote}));
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
                </div> 
            )}
        </div>

        <div className ="comment">
            {comments.map((comment) => {
            return (
            <div>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Date: {comment.created_at}</p>
            </div>
            )
        })}
        </div>
        </>
    )
}