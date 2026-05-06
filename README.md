# when are we hanging out ☕

A café-themed hangout scheduling app — because "we should hang out sometime" needed to become a real system.

Friends visit the site, fill out an "order slip" with their name, preferred date, what they want to do, and how to reach them. Submissions go straight to a Supabase database so I can actually follow through.

🔗 **Live site:** [when-are-we-hanging-out.vercel.app](https://when-are-we-hanging-out.vercel.app)

---

## How it works

1. Landing page styled like a café menu — tap anywhere to place your order
2. Fill out an order slip: your name, preferred date, activity type (Lunch, Café, Walk, Shopping, Gossip…), details, and contact info
3. Submit → get a random order number for confirmation
4. The request is saved to Supabase so I can follow up and actually make plans

---

## Tech Stack

- **React 19** + **TypeScript** — frontend
- **Vite** — build tool
- **Supabase** — backend database for storing hangout requests
- **EmailJS** — email notifications on submission
- **Vercel** — hosting

---

## Run locally

```bash
git clone https://github.com/bruhitsyandrea/when-are-we-hanging-out.git
cd when-are-we-hanging-out
npm install
```

Create a `.env` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Then:

```bash
npm run dev
```

---

*Built because a group chat isn't a calendar.*
