# Total Recall Api

## Development

## Prerequisites

- Node.js 18.x
- PNPM installed globally (`npm install -g pnpm`)
- Docker and docker-compose (if using the Docker setup)
- A MongoDB Atlas account (or access to a MongoDB instance)

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

### Seed

- Seed mock data

```bash
mongosh "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/total_recall_db?retryWrites=true&w=majority" <  src/db/seedMockData.js
```

### Running the Application

- Development mode:

```bash
pnpm dev
```

### Links

- locale app: http://localhost:3000
- Swagger: http://localhost:3000/docs

### Tests

- Run tests:

```bash
pnpm test
```

## Deployment

TODO:

---
