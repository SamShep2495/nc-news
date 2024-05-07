import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { getTopics, getUsers } from "../../api.get"


 
const Header = () => {

    const [users, setUsers] = useState([])
    const [topics, setTopics] = useState([])

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


    return (
        <header id="header">
            <h1 className='title'>Soul Log</h1>
            <div className="dropdown">
                <Link to="/articles" className='link1'>Articles</Link>
                <div className="dropdown-content">
                    {topics.map((topic) => {
                        return (
                            <Link to="/slug">{topic.slug}</Link>
                        )
                    })}
                </div>
            </div>
            <div className="dropdown">
                <Link to="/users" className='link2'>Authors</Link>
                <div className="dropdown-content">
                {users.map((user) => {
                        return (
                            <Link to="/:username">{user.name}</Link>
                        )
                    })}


                    
                </div>
            </div>
        </header>
    )
}

export default Header