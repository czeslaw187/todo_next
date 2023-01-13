import { Client } from "pg";

export default async function createStructuredSelector(req, res) {
    const {name, email} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        await client.query('INSERT INTO users (name, email, subscription) VALUES ($1, $2, 0)')
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}