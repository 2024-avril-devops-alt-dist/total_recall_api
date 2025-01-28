# Utilisez une image Node.js comme base
FROM node:18.20-alpine

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et pnpm-lock.yaml pour installer les dépendances
COPY package.json pnpm-lock.yaml ./

# Installez pnpm (si nécessaire)
RUN npm install -g pnpm

# Installez les dépendances
RUN pnpm install

# Copiez tout le reste du projet dans l'image Docker
COPY . .

# prisma generate
RUN pnpm prisma:generate

# Construisez l'application Next.js
RUN pnpm build

# Exposez le port 3000
EXPOSE 3000

# Démarrez l'application en mode production
CMD ["pnpm", "start"]
