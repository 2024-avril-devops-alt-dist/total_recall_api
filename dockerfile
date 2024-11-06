# Utiliser l'image officielle Node.js 18
FROM node:18.20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer les ports 3000 et 9000
EXPOSE 3000 9000

# Démarrer l'application
CMD ["npm", "start"]
