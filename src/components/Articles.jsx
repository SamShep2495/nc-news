import { useEffect } from "react"
import { useState } from "react"
import { getArticles } from "../../api.get"



export const ArticleList = () => {

    const [articles, setArticles] = useState([])


    useEffect (() => {
        getArticles()
        .then((body) => {
            setArticles(body.articles)
        })
    }, [])

    return (
        <> 
        <div className='spacing'></div>
        

        <label></label>
        
        <div >{articles.map((article) => {
            return (
                
                <div key={article.article_id} className="article-card">
                <img className src={article.article_img_url} alt="" />  
                <p>Title: {article.title}</p>
                <p>Topic: {article.topic}</p>
                <p>Comments: {article.comment_count}</p>
                <p>{article.created_at}</p>
                </div> 
        )
        })}</div>
        </>
    )

}