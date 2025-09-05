export default async function handler(req, res) {
  return res.json({ 
    ok: true, 
    message: "API endpoint is working!",
    timestamp: new Date().toISOString()
  })
}
