export default function handler(req, res) {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";

  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");

  if (!url || !key) {
    return res.status(503).json({
      error: "Supabase belum dikonfigurasi pada hosting."
    });
  }

  return res.status(200).json({ url, key });
}
