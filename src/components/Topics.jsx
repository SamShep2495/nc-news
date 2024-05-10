import { useEffect, useState } from "react";
import { getArticles, getArticlesSorted, fixDate} from "../../api.get";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"

export const Topic = () => {
    const [articles, setArticles] = useState([]);
    const { topic } = useParams();
    const [sortBy, setSortBy] = useState({sort: '', order: ''})
    
    const handleSortBy = (event) => {
        const option = event.target.value;
        let newSortBy = {sort: '', order: ''}
        let sortedArticles = [...articles];
        if (option === "A-Z") {
            newSortBy = {sort: 'title', order: 'ASC'}
        } else if (option === "Z-A") {
            newSortBy = {sort: 'title', order: 'DESC'}
        } else if (option === "Most Comments") {
            sortedArticles.sort((a, b) => b.comment_count - a.comment_count)
        } else if (option === "Fewest Comments") {
            sortedArticles.sort((a, b) => a.comment_count - b.comment_count)
        } else if (option === "Most Recent") {
            newSortBy = {sort: 'created_at', order: 'DESC'}
        } 
        setArticles(sortedArticles);
        setSortBy(newSortBy)
    }

    
        useEffect(() => {
            getArticlesSorted(sortBy.sort, sortBy.order)
                .then((body) => {
                    setArticles(body.articles);
                })
                .catch((error) => {
                    console.error("Error fetching sorted articles:", error)
                })
        }, [sortBy]);


    useEffect(() => {
        getArticles()
            .then((body) => {
                setArticles(body.articles);
            })
            .catch((error) => {
                console.error("Error fetching article:", error)
            })
    }, []);

    return (
        <> 
        <div className='spacing'></div>

        <div className="sort-dropdown">
                    <select onChange={handleSortBy}>
                        <option value="">Sort By</option>
                        <option disabled > ----------------------- </option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Most Comments">Most Comments</option>
                        <option value="Fewest Comments">Fewest Comments</option>
                        <option value="Most Recent">Most Recent</option>
                    </select>
        </div>
        
        <div className="card-container">
            {articles.map((article) => {
            if (article.topic === topic) {
            return (
                <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                <div key={article.article_id} className="card">
                <img className src={article.article_img_url} alt="" />
                <div className="card__content">  
                <p className="card__title">Title: {article.title}</p>
                <p className="card__description">Topic: {article.topic}</p>
                <p className="card__description">Comments: {article.comment_count}</p>
                <p className="card__description">Date Posted: {fixDate(article.created_at)}</p>
                </div>
                </div> 
                </Link>
        )
        }
        })}</div>
        </>
    )
}

export default Topic;
