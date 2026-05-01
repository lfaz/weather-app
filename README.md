## 🐳 Docker Setup

From the project root (where Dockerfile is located), run:

```bash
docker build -t weather-app .
docker run -p 3000:80 weather-app
```

Open browser with url: http://localhost:3000

## Scripts

```bash
npm run dev       # start the Vite dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build
```

## Notes

For a larger production application, I could use React Query for data fetching and caching, and Redux Toolkit for broader state management. For the simplicity and scope of this assignment, I chose a smaller custom hook approach to keep the implementation clear and avoid overcomplicating the app.
