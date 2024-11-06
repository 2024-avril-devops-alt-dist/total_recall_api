# Total Recall Api

## Development

### Setup

```bash
cp env.example .env

pnpm docker:up
pnpm install
```

### Seed

```bash

```

### Links

- Swagger: http://localhost:9000/docs

### Tests

TODO:

---

## Deployment

TODO:

---

## Good to know

### After pulling

- if `package.json` changes:

```bash
pnpm install
```

- if `schema.prisma` changes:

```bash
pnpm migrate:deploy
pnpm prisma:generate
# restart server if you encounter erros
```
