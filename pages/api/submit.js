export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, company, icp, website } = req.body;
  console.log('Lead submitted:', { name, email, company, icp, website });
  return res.status(200).json({ success: true });
}
