import './App.css'
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Homepage from './Homepage';
import Article from './Article';
import CreateArticle from './CreateArticle';
import ArticleUpdate from './ArticleUpdate';

export default function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="*" element={<Homepage />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/CreateArticle" element={<CreateArticle />} />
          <Route path="/ArticleUpdate/:id" element={<ArticleUpdate
          />} />
        </Routes>
      </div>

    </>
  )
}


