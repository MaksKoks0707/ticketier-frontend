
Simple Next.js frontend for the Ticketier API.

Install:

```bash
npm install
```

Run (development):

```bash
npm run dev
```

Build & start (production):

```bash
npm run build
npm start
```

Optional (Docker):

```bash
docker build -t ticketmaster-front .
docker run --rm -p 3001:3001 ticketmaster-front
```

Open http://localhost:3001


## Docker

Build the image:

```bash
docker build -t ticketmaster-front .
```

Run the container (production):

```bash
docker run -p 3001:3001 --env-file .env.example ticketmaster-front
```

Use Docker Compose for development with live reload:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Use Docker Compose for production:

```bash
docker compose up --build
```
