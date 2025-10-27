const express = require('express');
const cors = require('cors');


const app = express();
const port =3000


app.use(cors())
app.use(express.json())

const posts = [
    {id:1, title:"First Post", content:"This is the content of the first post."},
    {id:2, title:"Second Post", content:"This is the content of the second post."}
]

app.get('/',(req,res)=>{
    res.json(posts)
})


app.get('/posts/:id',(req,res)=>{
    const {id} = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({error: "Post not found"});
    }
    res.json(post);
})
app.post('/posts',(req,res)=>{
    const {title, content} = req.body;
    const newPost = {id:posts.length + 1, title, content};
    posts.push(newPost);
    res.status(201).json(newPost);
})

app.put('/posts/:id',(req,res)=>{
    const {id} = req.params;
    const {title, content} = req.body;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({error: "Post not found"});
    }
    post.title = title;
    post.content = content;
    res.json(post);
})

app.delete('/posts/:id',(req,res)=>{
    const {id} = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
        return res.status(404).json({error: "Post not found"});
    }
    posts.splice(postIndex, 1);
    res.status(204).send();
})

app.patch('/posts/:id',(req,res)=>{
    const {id} = req.params;
    const {title, content} = req.body;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return res.status(404).json({error: "Post not found"});
    }
    post.title = title !== undefined ? title : post.title;
    post.content = content !== undefined ? content : post.content;
    res.json(post);
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})