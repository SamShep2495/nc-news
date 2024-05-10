import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import {ArticleList} from './components/Articles'
import Header from './components/Header'
import { SingleArticle } from './components/Single-Article'
import Topic from './components/Topics'
import Author from './components/Authors'
import { ErrorPage } from './components/ErrorPage'


function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={ <ArticleList />}/>
        <Route path={`/articles/:article_id`} element={ <SingleArticle />}/>
        <Route path="/topics/:topic" element={ <Topic/>}/>
        <Route path="/users/:author" element={ <Author/>}/>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App
