import React , { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList'

const PostList = ()=>{

    const [posts,setPosts] = useState({}); // we have used object for posts 
    // define a function to retrieve the posts from service 

    const fetchPosts = async ()=>{

        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);


    };
    // use effects to run this component just once 
    useEffect(()=>{
        fetchPosts();

    },[]); 

    // generating list of all the post title 
    const renderedPosts = Object.values(posts).map(post =>{

        return (
            <div className="card"
                style ={{width:'30%', marginBottom:'20px'}}
                key   ={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments = {post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>
                

            </div>

        );


    });
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
};

export default PostList;