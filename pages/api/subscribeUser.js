import { Client } from "pg"
import axios from "axios"

export default async function(req, res) {
    const {email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let users = axios.get(process.env.NEXT_PUBLIC_URL + '/api/getAllUsers')
        console.log(users)
        const duration = Date.now() + 30*86400000
        await client.query('UPDATE users SET subscription=$1 WHERE email=$2',[duration, email])
    } catch (error) {
        return res.json({message: error.message})
    }
}