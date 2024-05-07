import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleArticle, getArticles } from "../../api.get"

export const SingleArticle = () => {

    const [article, setArticle] = useState(null)

    const { article_id } = useParams()

    useEffect (() => {
        getSingleArticle(article_id)
        .then((body) => {
            console.log('5.', body);
            setArticle(body)
        })
    }, [article_id])

     console.log(("1.", article_id));
     console.log('2.', article);
    

    return (
        <>
        <div className='spacing'></div>

        <div>
            {article && (
                <div key={article[0].article_id} className="article-card">
                <img className src={article[0].article_img_url} alt="" />  
                <p>Title: {article[0].title}</p>
                <p>Topic: {article[0].topic}</p>
                <p>Comments: {article[0].comment_count}</p>
                <p>Date Posted: {article[0].created_at}</p>
                </div> 

            )}
        </div>
        </>
    )

}