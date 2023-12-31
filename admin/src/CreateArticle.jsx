import React from "react";
import { BrowserRouter, Route, NavLink, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import App from "./App";
import axios from "axios";


export default function CreateArticle() {

    const initialValues = {
        title: "",
        article_text: "",
    };

    const [article, setArticle] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticle({
            ...article,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const articleData = {
            title: article.title,
            article_text: article.article_text
        }
        setArticle(initialValues)

        axios.post("http://localhost:3100/routers/article", articleData).then((response) => {
            console.log(response.status, response.data)
        })
    }

    return (
        <>
            <div>
                <h1 className="page-title">Create New Article</h1>
                <div id="flex-form-container">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div id="label-input-container">
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div id="label-input-container">
                            <label>Article Text:</label>
                            <textarea id="article-input"
                                type="text"
                                name="article_text"
                                value={article.article_text}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Create Article</button>
                        <NavLink id="homepage-button-container" className="link" to="/Homepage">
                            <button id="homepage-button">
                                Return Home
                            </button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}