import React from "react";
import { BrowserRouter, Route, NavLink, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import App from "./App";
import axios from "axios";
import Article from "./Article";
import { useParams } from "react-router-dom";


export default function ArticleUpdate({ article }) {
    // console.log(article)
    const { id } = useParams();

    const [articleUpdate, setArticleUpdate] = useState({
        title: "",
        article_text: ""
    })

    useEffect(() => {
        const obj = {
            title: article?.title ?? "",
            article_text: article?.article_text ?? ""
        }
        console.log(obj)
        setArticleUpdate(obj)
    }, [article])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticleUpdate({
            ...articleUpdate,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const articleData = {
            title: articleUpdate.title,
            article_text: articleUpdate.article_text
        }
        setArticleUpdate({
            title: articleUpdate.title,
            article_text: articleUpdate.article_text,
        })
        // console.log(articleUpdate.title)
        axios.put(`http://localhost:3100/routers/article/${id}`, articleData).then((response) => {
            //pass the updated object
        //   setArticleUpdate(
        //     {title: articleUpdate.title,
        //     article_text: articleUpdate.article_text}
        //   )
            console.log(response.status, response.data)
        })
    }

    return (
        <>
            <div>
                <h1 className="page-title">Update Article</h1>
                <form className="article-form-container" onSubmit={handleSubmit}>
                    <div id="label-input-container">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={articleUpdate.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div id="label-input-container">
                        <label>Article Text:</label>
                        <textarea id="article-input"
                            type="text"
                            name="article_text"
                            onChange={handleChange}
                            defaultValue={articleUpdate.article_text}
                        />
                    </div>
                    <div id="update-button-container">
                        <button className="article-buttons" type="submit">Update Article</button>
                    </div>
                </form>
            </div>
        </>
    )
}