import './App.css'
import {Routes, Route} from "react-router-dom"
import {ArticleList} from './components/Articles'
import Header from './components/Header'


function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={ <Header />} />
        <Route path="/articles" element={ <ArticleList />}/>
      </Routes>
    </>
  )
}

export default App
