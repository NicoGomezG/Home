// Vercel serverless function.
// Scrapes GitHub's own contribution-calendar HTML fragment (the same markup
// that powers the graph on a user's profile page, including private
// contributions if the user has that enabled) and returns clean JSON.
// Fetching happens server-side, so there's no browser CORS restriction.

const USERNAME_RE = /^[a-zA-Z0-9-]{1,39}$/;

module.exports = async (req, res) => {
  const username = req.query.username;

  if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
    res.status(400).json({ error: 'Invalid username' });
    return;
  }

  const githubRes = await fetch(`https://github.com/users/${username}/contributions`);

  if (!githubRes.ok) {
    res.status(502).json({ error: 'Failed to fetch GitHub contributions' });
    return;
  }

  const html = await githubRes.text();

  const cellRe = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*>/g;
  const days = [];
  let match;
  while ((match = cellRe.exec(html)) !== null) {
    days.push({ date: match[1], level: Number(match[2]) });
  }

  const countRe = /(No contributions|\d+ contributions?) on [^.<]*\./g;
  const counts = [];
  while ((match = countRe.exec(html)) !== null) {
    counts.push(match[1] === 'No contributions' ? 0 : parseInt(match[1], 10));
  }

  const merged = days.map((day, i) => ({ ...day, count: counts[i] ?? 0 }));
  const total = merged.reduce((sum, day) => sum + day.count, 0);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ total, days: merged });
};
