// pages/api/hello-supa.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // connect to your Supabase project using the secret server key
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // try to read 1 row from the "guides" table
  const { data, error } = await supabase
    .from('guides')
    .select('id, title, slug')
    .limit(1)

  if (error) {
    // if something goes wrong, show the error
    return res.status(500).json({ ok: false, error: error.message })
  }

  // success! show the sample data (might be empty [])
  return res.json({ ok: true, sample: data })
}
