import './App.css'
import {Routes, Route} from "react-router-dom"
import {ArticleList} from './components/Articles'
import Header from './components/Header'
import { SingleArticle } from './components/Single-Article'


function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={ <Header />} />
        <Route path="/articles" element={ <ArticleList />}/>
        <Route path={`/articles/:article_id`} element={ <SingleArticle />}/>
      </Routes>
    </>
  )
}

export default App
