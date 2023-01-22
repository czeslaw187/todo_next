import { Client } from "pg";

export default async function changeActivation(req, res) {
    const {todo_id, isactive} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        await client.query('UPDATE todos SET isactive=$1 WHERE todo_id=$2',[!isactive, todo_id])
        res.json({message: 'ok'})
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}