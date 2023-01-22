import { Client } from "pg";

export default async function getAllUsers(req, res) {
    const {name, email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    let response = {user:{}, todo:{}}
    try {
        response.user = await client.query('SELECT * FROM users WHERE name=$1 AND email=$2',[name, email])
        response.todo = await client.query('SELECT todo_id, email, content, isactive FROM todos WHERE email=$1',[email])
        if (response.user.rows.length <= 0) {
            await client.query('INSERT INTO users (name, email) VALUES ($1, $2)',[name, email])
            response.user = await client.query('SELECT * FROM users WHERE name=$1 AND email=$2',[name, email])
            response.todo = await client.query('SELECT * FROM todos WHERE email=$1',[email])
        }
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}