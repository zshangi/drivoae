
export default async function handler(req, res) {
  const payload = req.body;
  // Process the payload from Tamara here
  console.log('Received webhook:', payload);
  res.status(200).end();
}