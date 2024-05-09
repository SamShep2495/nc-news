import { useEffect, useState } from "react";
import { getArticles } from "../../api.get";
import { useParams } from "react-router-dom";

export const Author = () => {
    const [articles, setArticles] = useState([]);
    const { author } = useParams();

    useEffect(() => {
        getArticles()
            .then((body) => {
                setArticles(body.articles);
            })
            .catch((error) => {
                console.error("Error fetching article:", error)
            })
    }, []);


    console.log('2.', articles);
    console.log('4.', author);

    return (
        <> 
        <div className='spacing'></div>
        
        <div>{articles.map((article) => {
            if (article.author === author) 
            return (
                
                <div key={article.article_id} className="article-card">
                <img className src={article.article_img_url} alt="" />  
                <p>Title: {article.title}</p>
                <p>Topic: {article.topic}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Author: {article.author}</p>
                <p>Date Posted: {article.created_at}</p>
                </div> 
        )
        })}</div>
        </>
    )
}

export default Author;