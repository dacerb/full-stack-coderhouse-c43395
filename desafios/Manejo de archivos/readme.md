# full-stack-coderhouse-c43395


### Desafio
> Salida de la ejecucion

```
para su ejecucion: full-stack-coderhouse-c43395\desafios\Manejo de archivos> node.exe .\index.js

```

https://docs.google.com/presentation/d/12z-6IXrjYqD8H_amXZEjBzVt1ryr4GLvkcTUjh6gYEU/edit#slide=id.g1267f357822_0_208

https://docs.google.com/presentation/d/12z-6IXrjYqD8H_amXZEjBzVt1ryr4GLvkcTUjh6gYEU/edit#slide=id.g1267f357822_0_220



```


PS D:\CURSOS\full-stack-coderhouse-c43395\desafios\Manejo de archivos> node.exe .\index.js
listo todos los productos actuales
[]

```

```
agrego 4 productos y listo todos los productos 
listo todos los productos una vez agregados
[
  {
    id: 1,
    title: 'producto 1',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 15,
    price: 100
  },
  {
    id: 2,
    title: 'producto 2',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
    price: 200
  },
  {
    id: 3,
    title: 'producto 3',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 35,
    price: 300
  },
  {
    id: 4,
    title: 'producto 4',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 45,
    price: 400
  }
]

```

```

busco producto por el id 2
[
  {
    id: 2,
    title: 'producto 2',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
    price: 200
  }
]

```

```
Elimino el producto con id 1
Actualizo producto con id 3
Muestro el ultimo estado de productos
[
  {
    id: 1,
    title: 'producto 1',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 15,
    price: 100
  },
  {
    id: 2,
    title: 'producto 2',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
    price: 200
  },
  {
    id: 3,
    title: 'alto update perri',
    description: '12321',
    thumbnail: 'Sin imagen',
    code: '12321',
    stock: 25,
    price: 200000000
  },
  {
    id: 4,
    title: 'producto 4',
    description: 'detalle de producto',
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 45,
    price: 400
  }
]
```

--- 

## ARCHIVO 
> full-stack-coderhouse-c43395\desafios\Manejo de archivos\files\products.json
```
[
    {
        "id": 1,
        "title": "producto 1",
        "description": "detalle de producto",
        "thumbnail": "Sin imagen",
        "code": "abc123",
        "stock": 15,
        "price": 100
    },
    {
        "id": 2,
        "title": "producto 2",
        "description": "detalle de producto",
        "thumbnail": "Sin imagen",
        "code": "abc123",
        "stock": 25,
        "price": 200
    },
    {
        "id": 3,
        "title": "alto update perri",
        "description": "12321",
        "thumbnail": "Sin imagen",
        "code": "12321",
        "stock": 25,
        "price": 200000000
    },
    {
        "id": 4,
        "title": "producto 4",
        "description": "detalle de producto",
        "thumbnail": "Sin imagen",
        "code": "abc123",
        "stock": 45,
        "price": 400
    }
]
```