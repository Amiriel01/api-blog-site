import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import moment from "moment"
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios'
import CreateComment from "./CreateComment";

export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const { pathname } = useLocation();

    async function getArticle() {
        await axios.get(`http://localhost:3100/routers/article/${id}`).then((response) => {
            console.log(response)
            setArticle(response.data);
        });
    }

    //use this for non-async
    async function handleDelete() {
        try {
            const response = await axios.delete(`http://localhost:3100/routers/article/${id}`)
            //put routing to homepage here
        } catch { }
    }

    useEffect(() => {
        getArticle()
    }, []);

    const commentComponent = article.comments?.map((comment) => {
        if (comment.published === true) {
            return <div id="ind-comment-card" key={comment._id}>
                <div id="comment-flex-container">
                    <p id="comment-name">{comment.name}</p>
                    <p id="comment-timestamp">{moment(comment.timestamp).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
                <div id="comment-text-container">
                    <p id="comment_text">{comment.comment_text}</p>
                </div>
            </div>
        } else {
            return "";
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return (
        <>
            <div className="article-container">
                <p className="article-title">{article.title}</p>
                <p className="article-info">{article.article_text}</p>
                <div className="article-buttons">
                    <div id="comment-button">
                        <CreateComment />
                    </div>
                </div>
                <div id="comment-card">
                    <h4 id="reader-comments">Reader Comments</h4>
                        <ul>{commentComponent}</ul>
                </div>
            </div>
        </>
    )
}