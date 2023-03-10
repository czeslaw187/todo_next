import { Client } from "pg"
import axios from "axios"

export default async function(req, res) {
    const {name, email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    const duration = Date.now() + 30*86400000
    await client.connect()
    try {
        await client.query('UPDATE users SET subscription=$1 WHERE email=$2 AND name=$3',[duration, email, name])
        res.json({message: 'ok'})
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}