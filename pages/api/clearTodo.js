import { Client } from "pg";

export default async function clearAll(req, res) {
    const {email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        await client.query('DELETE FROM todos WHERE email=$1',[email])
        res.json({message: 'ok'})
    } catch (error) {
        return res.json({message: error.message})
    } finally {}
}