FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production

# Copiar todo el código fuente
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]