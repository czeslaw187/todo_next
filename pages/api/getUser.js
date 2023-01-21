import { Client } from "pg";

export default async function getAllUsers(req, res) {
    const {name, email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let response = await client.query('SELECT * FROM users WHERE name=$1 AND email=$2',[name, email])
        if (response.rows.length <= 0) {
            await client.query('INSERT INTO users (name, email) VALUES ($1, $2)',[name, email])
            response = await client.query('SELECT * FROM users WHERE name=$1 AND email=$2',[name, email])
        }
        console.log(response.rows)
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}