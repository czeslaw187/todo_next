import { Client } from "pg";

export default async function deleteTodo(req, res) {
    const {id} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        await client.query('DELETE FROM todos WHERE todo_id=$1',[id])
        res.json({message: 'ok'})
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}