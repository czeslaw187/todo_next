import { Client } from "pg";

export default async function getAllUsers(req, res) {
    const {email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        const response = await client.query('SELECT * FROM users WHERE email=$1',[email])
        if (response.rows.length > 0) {
            res.json(response.rows)
        } else {
            res.json({message: 'no records'})
        }
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}