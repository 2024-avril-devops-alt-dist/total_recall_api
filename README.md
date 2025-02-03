# Total Recall Api

## Development

## Prerequisites

- Node.js 18.x
- PNPM installed globally (`npm install -g pnpm`)
- Docker and docker-compose (if using the Docker setup)
- A MongoDB Atlas account (or access to a MongoDB instance)

### Links

- locale app: http://localhost:3000
- Swagger: http://localhost:3000/docs

### Setup

1. Clone the repository:

```bash
git clone https://github.com/2024-avril-devops-alt-dist/total_recall_api.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables in `.env`:

```bash
NODE_ENV=development
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/total_recall_db?retryWrites=true&w=majority"
```

4. Generate the Prisma client:

```bash
pnpm prisma:generate
```

---

## After pulling

### Seed

- Seed mock data and admin account:

```bash
pnpm seed:data
```

### Running the Application

- Development mode:

- use docker

```bash
sudo pnpm docker:up
```

OR

```bash
pnpm dev
```

### Tests

- Run tests:

```bash
pnpm test
```

## Good to know

- if `schema.prisma` changes:

```bash
pnpm prisma:generate
```

- Docker in the app :

to run docker:

```bash
pnpm docker:up
```

to end docker:

```bash
pnpm docker:down
```

#### WARNINGS THESE will remove everything

to prune unused Docker objects:

```bash
docker system prune -a --volumes
```

to remove everything:

```bash
docker system prune -a -f
```

## Deployment

TODO:

---
