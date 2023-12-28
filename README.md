# full-stack-coderhouse-c43395
---

[PPT-CODER](https://docs.google.com/presentation/d/1lPyu9eNZQiuy3DFJdNjbs9F99bSCqCkpDvXv4VYSC4o/edit#slide=id.g155b29de502_0_0)

---

## configuracion del proyecto
1. hay que estar en path raiz de la carpeta ``full-stack-coderhouse-c43395/desafios/Mocking_y_manejo_de_errores/`` 
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
4. configurar archivo ``\full-stack-coderhouse-c43395\desafios\Mocking_y_manejo_de_errores\src\config\.env.development`` con los siguiente valores o bien es posible adaptar segun el entorno
````angular2html
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
````
5. el proyecto utiliza mongo como fuente de datos debe haber disponible algun servicio
6. accedemos a la api [localhost](http://localhost:8080/)


![Captura de pantalla 2023-07-20 235707.png](..%2F..%2Fcollection_postman%2FCaptura%20de%20pantalla%202023-07-20%20235707.png)


## IMPORTANTE:
> Dentro de la esturctura del proyecto esta collection_postman para realziar el importo de los metodos ya armados.

### EL PROYECTO CORRE EN LA RAIZ  `/full-stack-coderhouse-c43395/desafios/Mocking_y_manejo_de_errores`
```
/full-stack-coderhouse-c43395/desafios/Mocking_y_manejo_de_errores
└───src
    ├───common
    │   └───utils
    ├───config
    │   └───services
    ├───controllers
    ├───public
    │   ├───css
    │   ├───js
    │   └───thumbnails
    │       └───PRODUCTOS
    ├───routes
    │   └───utils
    ├───services
    │   ├───dao
    │   │   ├───filesystem
    │   │   │   ├───db
    │   │   │   └───models
    │   │   └───mongo
    │   │       ├───managers
    │   │       └───models
    │   ├───dto
    │   ├───errors
    │   │   ├───messages
    │   │   └───middlewares
    │   └───mocking
    └───views
        └───layouts
```


## TESTING:
> para poder hacer los test debemos ejecutar el supertest dentro del modulo de test, hay que tener en cuenta que la app debe estar funcioando.

```
 npx mocha .\test\supertest.test.js
```

![prueba_testing.png](collection_postman%2Fcapturas%2Fprueba_testing.png)

Producto dado de alta y luego eliminado

![captura_alta_producto.png](collection_postman%2Fcapturas%2Fcaptura_alta_producto.png)
