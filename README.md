## Instalación con Docker(recomendado)

Instalar Docker

  Mac  
    https://docs.docker.com/docker-for-mac/install/  
  Windows  
    https://docs.docker.com/docker-for-windows/install/  
  Ubuntu  
    https://docs.docker.com/install/linux/docker-ce/ubuntu/  

Clonar repositorios

```bash
git clone https://github.com/Enovum/hrm.git web && git clone https://github.com/Enovum/api.git
```

## Crear docker-compose.yml
El archivo debe crearse en la raiz donde quedaron los 3 repositorios y se veria algo asi  
-api    
-web
-docker-compose.yml  
```yml
version: "3"

services:
  db:
    image: mysql:5.7.24
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    ports:
     - "33066:3306"
    environment:
      MYSQL_ROOT_PASSWORD: Qwerty123
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
  api:
    build: ./api
    ports:
     - "3334:3334"
    volumes:
     - ./api:/app
    command: bash -c "npm install && adonis serve --dev"
    depends_on:
     - db
  web:
    build: ./web
    ports:
      - "3335:3335"
    volumes:
     - ./web:/app
    depends_on:
     - db
    command: bash -c "npm install && adonis serve --dev"
    
```
## Env

   Tanto para "api" como para "assets" crear el archivo .env en base al codigo existente en .env.example  
   
## Ejecutar docker compose

```bash
docker-compose build && docker-compose up
```
Esto se va a tomar un poco de tiempo por qué tiene que crear y descargar imagenes. Luego solo tenemos que ejecutar docker-compose up para que corra el proyecto.


##BD 
Para cargar bd entrar en localhost:8080 por el browser y se conectan a la bd que corresponda para restaurar las bd que necesiten trabajar
Si necesitan conectarse con workbench o algo por el estilo:
host: locathost:33306 
user: root 
password: Qwerty123

### Instalacion Sin Docker
 
## Aplicacion Web
La aplicación web se ejecuta en http://localhost:3000 y los assets en http://localhost:3335

## Documentación
Para generar la documentación ejecuta lo siguiente y ir al index.html de la carpeta documentation
```bash
grunt jsdoc
```

  - [Instalar NVM](#instalar-nvm) 
    - [NVM Linux/MAC](#en-linuxmac)
    - [NVM Windows](#en-windows)
  - [Instalar NodeJS v8.9.1](#instalar-nodejs-891) 
  - [Instalar git](#instalar-git)
  - [Clonar repositorio](#clonar-repositorio)  
  - [Configuraciones adicionales](#configuraciones-adicionales)

## Instalar NVM

### En linux/mac 
Instalar [NVM](https://github.com/creationix/nvm) con cUrl o Wget

Usando cURL:
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```
Usando Wget:
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

### En windows 
Instalar [NVM For Windows](https://github.com/coreybutler/nvm-windows) descargando el [ultimo release](https://github.com/coreybutler/nvm/releases)


## Instalar NodeJS 8.9.1
Desde la consola ejecutar el siguiente comando para instalar [nodejs](https://nodejs.org)
```bash
nvm install v8.9.1
```
Verificar version de node con `node -v`  
Verificar que npm este al menos en la version v5.5.1 con `npm -v`

## Instalar Git

Desde linux ejecutar `apt-get install git`  
Desde windows descargar el instalador de [git](https://git-scm.com/download/win)

## Clonar repositorio
Crear carpeta git para almacenar el proyecto abrir consola, posicionarse en la carpeta git y ejecutar el siguiente comando

```bash
git clone https://github.com/Enovum/hrm.git
```

## Configuraciones adicionales

### Archivo .env
Hacer una copia del archivo .env.example y guardarlo como .env con el siguiente contenido:

```bash
HOSTALIAS=localhost
HOST=127.0.0.1
PORT=3335
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=n96M1TPG821EdN4mMIjnGKxGytx9W2UJ
DB_CONNECTION=mysql
DB_HOST=192.168.3.18
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Qwerty123
DB_DATABASE=hrmapp
API_SERVER=http://localhost:3334
STYLE=horizontal
SESSION_DRIVER=redis
REDIS_CONNECTION=local
```

### Dependencias
Entrar en la carpeta del proyecto (git/hrm) y ejecutar los siguientes comandos

```bash
npm install --save-dev webpack
npm install -g @adonisjs/cli
npm install gulp-cli -g
npm install gulp -D
npm install
```

Para iniciar el proyecto ejecutar 
```bash
gulp
```


