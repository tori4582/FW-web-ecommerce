import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css"
import Article from "./index.js";
import Comment from "../Facebook/Comment/index.js"

function ArticleDetail() {
    const mabaiviet = useParams().mabaiviet;
    console.log(mabaiviet);
    const [posts, setPosts] = useState([]);
    let url = "https://localhost:5001/baiviet/" + mabaiviet.toString();
    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="article-detail px-10 pt-7 bg-white text-black  article-detail ">
                    {
                        posts.map(post => (
                            <div>
                            <div dangerouslySetInnerHTML={{ __html: post.noidung }} />
                            {/* <Comment link={window.location.href}></Comment> */}
                            <div class="fb-comments" data-href={window.location.href} data-width="100%" data-numposts="5"></div> 
                            </div>
                        ))
                    }
                </div>
                <Article></Article>
            </div>
        </div>
    );
}

export default ArticleDetail;
