# full-stack-coderhouse-c43395
---

[PPT-CODER](https://docs.google.com/presentation/d/1lPyu9eNZQiuy3DFJdNjbs9F99bSCqCkpDvXv4VYSC4o/edit#slide=id.g155b29de502_0_0)

---

## configuracion del proyecto
1. hay que estar en path raiz de la carpeta full-stack-coderhouse-c43395/ 
2. realizamos la instalacion de la dependencias
```
npm i
```
3. para la ejecucion se utiliza nodemon [nodemon.io](https://nodemon.io/)
```
full-stack-coderhouse-c43395> npm run app                       

> e_comerce_backend@1.0.0 app
> nodemon src/app.js

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/app.js`
server run on port: 8080
 ```

4. accedemos a la api [localhost](http://localhost:8080/)

![Alt text](<collection_postman/Captura de pantalla 2023-07-20 235707.png>)



## IMPORTANTE:
> Dentro de la esturctura del proyecto esta collection_postman para realziar el importo de los metodos ya armados.

### EL PROYECTO CORRE EN LA RAIZ  `FULL-STACK-CODERHOUSE-C43395/`
```
X:\FULL-STACK-CODERHOUSE-C43395
├───after
│   └───estructura_app
│       └───src
│           ├───controllers
│           ├───models
│           ├───routers
│           └───services
├───clase_profesor
│   └───43395-programacion-backend-main
│       
├───collection_postman
├───complementarios
│   └───Primera práctica integradora
│       └───src
│           ├───dao
│           │   └───dbManagers
│           ├───files
│           ├───routes
│           ├───services
│           │   ├───db
│           │   │   └───models
│           │   └───filesystem
│           │       └───models
│           └───views
│               └───layouts
├───desafios
│   ├───Clases ECMAScript y ECMAScript avanzado
│   ├───Manejo de archivos
│   │   └───files
│   ├───Motores de plantilla y socket
│   │   └───src
│   │       ├───db
│   │       ├───helpers
│   │       ├───public
│   │       │   ├───css
│   │       │   ├───image
│   │       │   ├───js
│   │       │   └───thumbnails
│   │       ├───routes
│   │       └───views
│   │           └───layouts
│   └───Servidor con Express
│       ├───files
│       └───src
│           └───views
├───ejemplos_pruebas
│   ├───clase
│   │   └───server
│   │       └───src
│   └───clase14
│       └───src
│           ├───models
│           └───routers
└───src
    ├───common
    │   └───utils
    ├───controllers
    ├───dao
    ├───public
    │   ├───css
    │   ├───image
    │   ├───js
    │   └───thumbnails
    ├───routes
    ├───services
    │   ├───filesystem
    │   │   ├───db
    │   │   └───models
    │   └───mongo
    │       └───models
    └───views
        └───layouts


```