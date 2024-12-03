# Utiliser l'image officielle Node.js 18
FROM node:18.20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3000 9000

# Démarrer l'application
CMD ["npm", "run", "start"]
