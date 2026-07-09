# RetailOS Static Prototype

This is a static clickable prototype for the retail management system.

Run locally:

```powershell
npm start
```

Open:

```txt
http://localhost:4173
```

Static deploy:

- Upload `index.html`, `styles.css`, `app.js`, and `_redirects` to a static host.
- Netlify can use `_redirects` so direct routes like `/products/everyday-tote-bag` and `/admin/orders` load correctly.
- GitHub Pages can host the prototype from the repository root. Include `404.html` so direct routes like `/pos` and `/admin/inventory` fall back into the app.

GitHub Pages:

1. Create a new GitHub repository.
2. Push this folder to the repository.
3. In GitHub, open Settings -> Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Choose the `main` branch and `/root`, then save.
6. Open the Pages URL after GitHub finishes deploying.

The prototype uses browser local storage for demo state. It has no real database, auth, or payment integration.
