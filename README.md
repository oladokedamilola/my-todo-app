# 📝 Todo App - A Full Stack Learning Project

A complete todo application I built to learn React, Next.js, TypeScript, and REST APIs. Features include create, read, update, delete, and filtering todos.

## 🚀 Live Demo

[View the live app](https://your-vercel-url.vercel.app)

## ✨ Features I Built

- Add new todos
- Mark todos as complete/incomplete
- Edit todos (double-click to edit, Enter to save)
- Delete todos you don't need anymore
- Filter todos by: All, Active, Completed
- Shows remaining tasks count
- Keyboard shortcuts: Enter to add, Escape to cancel edit
- Dark theme UI

## 🛠️ What I Used

| Technology | What I learned |
|------------|----------------|
| Next.js 15 | App Router, pages, and routing |
| TypeScript | Type safety and better error catching |
| Tailwind CSS | Styling without writing CSS files |
| JSON Server | Creating a mock backend in minutes |
| React Hooks | useState, useEffect, async/await |
| REST APIs | GET, POST, PATCH, DELETE requests |
| Git & GitHub | Version control and code hosting |
| Vercel | Deploying a Next.js app for free |

## 🔧 How to Run Locally

1. **Install dependencies**
```bash
npm install
```

2. **Install JSON Server**
```bash
npm install -D json-server@0.17.4
```

3. **Create a database file** (`db.json` in the root folder)
```json
{
  "todos": [
    {
      "id": 1,
      "text": "Learn React",
      "completed": false
    }
  ]
}
```

4. **Start JSON Server** (Terminal 1)
```bash
npx json-server db.json --port 8000
```

5. **Start the app** (Terminal 2)
```bash
npm run dev
```

6. **Open** `http://localhost:3000`

## 📂 How I Organized the Code

```
todo-app/
├── app/
│   ├── page.tsx          # Main page (renders TodoApp)
│   └── layout.tsx        # App wrapper
├── components/
│   └── TodoApp.tsx       # All todo logic and UI
├── lib/
│   └── api.ts           # API calls (fetch functions)
├── db.json              # Mock database (JSON Server)
```

## 🧠 What I Learned

### React Concepts
- **useState** - Managing data that changes (todos list, input value, filter)
- **useEffect** - Running code when component loads (fetching todos from API)
- **Props** - Passing data between components
- **Conditional rendering** - Showing different UI based on state (loading, editing, filtering)

### TypeScript
- Defining types for data (Todo type with id, text, completed)
- Using unions (`'all' | 'active' | 'completed'`)
- Function return types (`Promise<Todo[]>`)

### REST API
- GET - Fetch all todos from the server
- POST - Add a new todo (server creates the ID)
- PATCH - Update existing todo (text or completed status)
- DELETE - Remove a todo from the database

### Why Both State and API?
- **React State** = What user sees (fast, temporary)
- **Database** = What is saved (slow, permanent)
- **Update BOTH** = Complete app!

### Tailwind CSS Classes I Used Most
- `flex`, `flex-1`, `gap-2`, `justify-between`, `items-center` - Layout
- `bg-gray-800`, `text-white`, `text-gray-400` - Colors
- `p-4`, `px-4`, `py-2`, `mx-auto`, `mt-16` - Spacing
- `rounded-lg`, `border` - Borders
- `hover:bg-blue-700`, `transition-colors` - Interactions

## 🚢 Deployment

I deployed this app to **Vercel**:
1. Pushed code to GitHub
2. Imported repository to Vercel
3. Vercel auto-deploys on every push

**Note:** The live version uses localStorage instead of JSON Server (since JSON Server only runs locally)

## 📝 What I'd Add Next

- User authentication (login/register)
- Due dates for todos
- Search functionality

---

**Built as part of my frontend development learning journey** 🚀
```

---