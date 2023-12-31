# full-stack-coderhouse-c43395
---

### API railway.app en [full-stack-coderhouse-c43395](https://full-stack-coderhouse-c43395-production.up.railway.app/)

---

# configuracion del proyecto

### INSTALACION DEPENDENCIAS
1. hay que estar en path raiz de la carpeta ``full-stack-coderhouse-c43395/`` 
2. realizamos la instalacion de la dependencias
```
npm i
```
---
3. para la ejecucion se utiliza nodemon [nodemon.io](https://nodemon.io/)


### CONFIGURACION ENTORNO
4. configurar archivo `/src/config/.env.development` con los siguiente valores
> cada scope cuenta con su propio archivo de configuración
> * production 
> * development 
> * qa


````
PORT = {{PORT}}
MONGO_URL = {{MONGO_URL}}
ADMIN_NAME = {{AdminName}}
ADMIN_PASSWORD = {{AdminPassword}}


MONGO_URL={{MONGO_URL}}
PORT={{PORT}}
SECRET_PHRASE={{PASSWORD_PHRASE}}

GH_APP_ID=xx
GH_CLIENT_ID={{ID_GH}}
GH_CLIENT_SECRET={{SECRET_GH}}
GH_CALLBACK_UL={{URL_CALLBACK_GH}}

DOMAIN_URL={{DOMAIN_URL}}

GMAIL_ACCOUNT={{GMAIL_ACCOUNT}}
GMAIL_APP_PASSWD={{GMAIL_APP_PASSWD}}
GMAIL_SERVICE={{gmail}}
````
---

### BASE DE DATOS
5. el proyecto utiliza mongo como fuente de datos debe haber disponible algun servicio
> Podemos utilziar mongo atlas https://www.mongodb.com/ servicio cloud de mongo o bien realizar una instalacion y configuracion local

---

### INICIAR APP DEVELOPMENT
> estando en el root del proyecto debemos ejecutar el siguiente comando `npm run dev`

```
    full-stack-coderhouse-c43395/package.json
    
    
    "scripts": {
    "test": "npx mocha ./test/supertest.test.js",
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
    },
```
---
### ACCESO APP LOCAL
6. accedemos a la api [localhost](http://localhost:8080/)

![Captura de pantalla 2023-07-20 235707.png](collection_postman%2FCaptura%20de%20pantalla%202023-07-20%20235707.png)

---

## IMPORTANTE:
> Dentro de la esturctura del proyecto esta collection_postman path: `full-stack-coderhouse-c43395/collection_postman/e-comerce-coder.postman_collection.json`
---

### ESTRUCTURA DEL PROYECTO
```
/full-stack-coderhouse-c43395/
├───collection_postman
│   └───capturas
├───src
│   ├───common
│   │   └───utils
│   ├───config
│   │   └───services
│   ├───controllers
│   ├───docs
│   │   ├───carts
│   │   └───products
│   ├───event_logs
│   ├───public
│   │   ├───css
│   │   ├───js
│   │   └───thumbnails
│   │       └───PRODUCTOS
│   ├───routes
│   │   └───utils
│   ├───services
│   │   ├───dao
│   │   │   ├───filesystem
│   │   │   │   ├───db
│   │   │   │   └───models
│   │   │   └───mongo
│   │   │       ├───managers
│   │   │       └───models
│   │   ├───dto
│   │   ├───email
│   │   ├───errors
│   │   │   ├───messages
│   │   │   └───middlewares
│   │   └───mocking
│   └───views
│       └───layouts
└───test
    └───images

```
---
## TESTING:
> para poder hacer los test debemos ejecutar el supertest dentro del modulo de test, hay que tener en cuenta que la app debe estar funcioando.

```
 npx mocha .\test\supertest.test.js
```

![prueba_testing.png](collection_postman%2Fcapturas%2Fprueba_testing.png)

Producto dado de alta y luego eliminado

![captura_alta_producto.png](collection_postman%2Fcapturas%2Fcaptura_alta_producto.png)
