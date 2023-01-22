import { Client } from "pg";

export default async function fetchSubs(req, res) {
    const {name, email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let resp = await client.query('SELECT subscription FROM users WHERE name=$1 AND email=$2',[name, email])
        const duration = resp.rows[0].subscription
        res.json({message: 'ok', duration: duration, email: email})
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}