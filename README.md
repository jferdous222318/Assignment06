 **Repository:** https://github.com/jferdous222318/Assignment06.git

#  FitLog — Workout Library

A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and watch the week's work add up.


##  Key Features

1. **Workout Library** — 12 lifts in a responsive 3×4 grid with images, muscle-group tags, equipment, duration, calories and rating.
2. **Sort Dropdown** — re-sort the library by Duration, Calories or Rating.
3. **Workout Details Page** — two-column layout with key specs, step-by-step instructions and quick actions.
4. **Today's Plan & Saved** — add lifts to today's plan (capped at five) or save them for later, with live navbar badge counters and toast notifications.
5. **My Plan Dashboard** — live Exercises / Minutes / Calories metrics, Today's Plan and Saved tabs, Mark as Done and Remove actions, and a friendly empty state.
6. **Persistent Data** — plan and saved lists survive page reloads through localStorage.
7. **Fully Responsive** — works on mobile, tablet and desktop.
8. **Loading, Error & 404 States** — spinner while fetching, retry on failure, and a custom 404 page.

---

##  Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework and routing |
| React 19 + React Compiler | UI |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling and responsiveness |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |
| Vercel | Deployment |

---

##  Getting Started

```bash
git clone https://github.com/jferdous222318/Assignment06.git
cd your-repo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/            # Routes: /, /workout/[id], /my-plan, 404
├── Components/     # Navbar, Footer, Hero, Library, cards, tabs...
├── context/        # PlanContext (plan + saved state, localStorage)
├── lib/            # API helpers with fallback endpoint
└── types/          # TypeScript types
```

## 🌐 API

Workout data comes from the FitLog API, with an automatic fallback to the alternative endpoint if the first one fails. https://api.abcz.workers.dev/api/fitlog

---