import { Link } from "react-router-dom"
 
const Header = () => {
    return (
        <header id="header">
            <h1 className='title'>Soul Log</h1>
            <div className="dropdown">
                <Link to="/articles" className='link1'>Articles</Link>
                <div className="dropdown-content">
                    <Link to="/category1">Category 1</Link>
                    <Link to="/category2">Category 2</Link>
                    <Link to="/category3">Category 3</Link>
                </div>
            </div>
            <div className="dropdown">
                <Link to="/articles/users" className='link2'>Authors</Link>
                <div className="dropdown-content">
                    <Link to="/author1">Author 1</Link>
                    <Link to="/author2">Author 2</Link>
                    <Link to="/author3">Author 3</Link>
                </div>
            </div>
        </header>
    )
}

export default Header