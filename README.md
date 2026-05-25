# DevCard

Search any GitHub username and get a clean profile card with their stats — repos, followers, following, and join year — pulled straight from the GitHub API.

Built as a practice project to get comfortable with React hooks, custom hooks, and Tailwind CSS.

---

## What it does

- Search any GitHub username and see their profile card
- Shows avatar, name, handle, bio, and stats
- Recent searches strip with avatars
- Error state when the username doesn't exist
- Smooth enter/exit animations on the card and error message

---

## Tech

- React (Vite)
- Tailwind CSS
- Framer Motion
- GitHub REST API

---

## Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/Yuvraj06Jain/DevCard.git
cd devcard
npm install
```

Then run it:

```bash
npm run dev
```

---

## What I learned building this

Ran into a lot of the classic React beginner traps — calling hooks inside event handlers, stale state reads right after `setState`, objects not triggering `useEffect` because the reference didn't change. Figuring out why the same username searched twice in a row wouldn't refetch was probably the most interesting bug.
