import { Client } from "pg";

export default async function addTodo(req, res) {
    const {email, content, isactive} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let todoid = await client.query('INSERT INTO todos (todo_id, email, content, isactive) VALUES (DEFAULT, $1, $2, $3) RETURNING todo_id',[email, content, isactive])
        res.json({message: 'ok', todo_id:todoid})
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}