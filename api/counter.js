export default async function handler(req, res) {
  // Set CORS headers just in case
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { increment } = req.query;
    const project = "ravi-kumar-tenali-portfolio";
    const counter = "visits";

    let url = `https://api.counterapi.dev/v1/${project}/${counter}`;
    if (increment === "true") {
      url += "/up";
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CounterAPI returned status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ count: data.count });
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    return res.status(500).json({ error: error.message, count: 1 });
  }
}
