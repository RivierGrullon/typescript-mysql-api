import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from "../interfaces/Post";

export async function getPosts(req: Request, res: Response):Promise<Response> {
    const conn = await connect();
    const post = await conn.query("SELECT * FROM posts");
    return res.json(post[0]);
}



export async function createPost(req: Request, res: Response ) {
    const newPost: Post = req.body;
    const conn = await connect();
    await conn.query("INSERT INTO posts SET ?", [newPost]);
    return res.json({
        message: "POST created"
    })
}

export async function getPost(req: Request, res: Response): Promise<Response>{

    const ID = req.params.postId;
    const conn = await connect();
    const posts = await conn.query("SELECT * FROM posts WHERE id = ?", [ID]);
    return res.json(posts[0]);

}

export async function deletePost(req: Request, res: Response) {
    try{

        const ID = req.params.postId;
        const conn = await connect();
        await conn.query("DELETE FROM posts WHERE id = ?", [ID]);
        return res.json({
            message: "delete complete"
        });
    }catch(err){
        console.log(err)
    }

}

export async function updatePost(req: Request, res: Response) {
    const ID = req.params.postId;
    const conn = await connect();
    await conn.query(`UPDATE posts set ? WHERE id = ?`, [req.body, ID]);
    return res.json({
        message: "Post Update"
    })
}