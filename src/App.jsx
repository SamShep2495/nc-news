import './App.css'
import {Routes, Route} from "react-router-dom"
import {ArticleList} from './components/Articles'
import Header from './components/Header'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={ <ArticleList />}/>
      </Routes>
    </>
  )
}

export default App
