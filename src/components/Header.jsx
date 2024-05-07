import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { getTopics, getUsers, getArticles } from "../../api.get"


 
const Header = () => {

    const [users, setUsers] = useState([])
    const [topics, setTopics] = useState([])
    const [articles, setArticles] = useState([])

        useEffect(() => {
            getUsers()
            .then((body) => {
                setUsers(body.users)
        })
        }, [])

        useEffect(() => {
            getTopics()
            .then((body) => {
                setTopics(body.topics)
            })
        }, [])

        useEffect (() => {
            getArticles()
            .then((body) => {
                setArticles(body.articles)
            })
        }, [])


    return (
        <header id="header">

            <h1 className='title'>Soul Log</h1>

            <div className="dropdown">
                <Link to="/articles" className='link'>Home</Link>
            </div>    
            
            <div className="dropdown">
                <Link to="/topics" className='link'>Topics</Link>
                <div className="dropdown-content">
                    {topics.map((topic) => {
                        return (
                            <Link to="/topic">{topic.slug}</Link>
                        )
                    })}
                </div>
            </div>

            <div className="dropdown">
                <Link to="/users" className='link'>Authors</Link>
                <div className="dropdown-content">
                {users.map((user) => {
                        return (
                            <Link to="/:username">{user.name}</Link>
                        )
                    })}    
                </div>
            </div>

            <div className="dropdown">
                <Link to="/articles" className='link'>Articles</Link>
                <div className="dropdown-content">
                    {articles.map((article) => {
                        return (
                            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                        )
                    })}
                </div>
            </div>

        </header>
    )
}

export default Header