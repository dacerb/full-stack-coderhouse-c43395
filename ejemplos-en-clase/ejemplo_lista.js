
function mostrar_list(array){

    if(array.length === 0){
        console.log("lista vacia")
        return 
    }

    for(const element of array){
        console.log(element)
    }

    console.log(`Tamaño de la lista es: ${array.length}`)

}



mostrar_list([1,2,3,45])