<template>
    <div class="eliminarProductos">
        <div class="containerEliminarProductos">
            <div class="col">
                <h3>Estas seguro que deseas eliminar este elemento?</h3>
                <p>Nombre Producto: <span>{{ producto.nombreProducto }}</span></p>
                <p>caracteristicas: <span>{{ producto.caracteristicas }}</span></p>
                <p>cantidad: <span>{{ producto.cantidad }}</span></p>
                <p>Tipo Producto: <span>{{ producto.tipo_producto }}</span></p>
                <button v-on:click="deleteProducto" type="submit">Eliminar</button>
            </div>
        </div>
        <div class="imagen6">
              <img src="https://artesaniasdecolombia.com.co/Documentos/Contenido/13994_indigenas-guayaberos-cesteria-guaviare-g.jpg" >
        </div>
    </div>
</template>

<script>
    import axios      from 'axios';
    import jwt_decode from 'jwt-decode';

    export default{
        name: "eliminarProducto",

        data: function(){
            return {
                producto : {
                    user_id : 0,
                    producto_data: {
                          id: 0,
                          cuenta  : 0,
                          nombreProducto : "", 
                          caracteristicas: "",
                          fecha_registro : (new Date()).toJSON().toString(), 
                          cantidad       : 0,
                          tipo_producto  : ""
                     }
                },

                producto : []
            }
        },

        methods: {
             getProducto: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                let productoId = localStorage.getItem("productoId");
                console.log("este es: " + productoId);

                axios.get(

                   `http://localhost:8000/producto/${userId}/${productoId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                    .then((result) =>{
                        console.log(result.data);
                        //localStorage.setItem("productoId", this.producto.id)
                        this.producto = result.data;
                       
                    })
                    .catch((error)=>{
                        this.$emit("loadListaproducto");
                    })
            },

           deleteProducto: async function (){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                let productoId = localStorage.getItem("productoId");
                console.log("se borro: " + productoId);
                
                axios.delete(

                    `http://localhost:8000/producto/delete/${userId}/${productoId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                     console.log(result.data);
                     this.producto = result.data;
                     alert("producto borrado")
                     this.$router.push({name: "listaProductos"});
                     //this.getproducto();
                })
                .catch((error) => {
                    console.log("error");
                    alert("no se pudo borrar el producto")
                })
            },


           verifyToken: async function(){
               return axios.post(
                   'http://localhost:8000/refresh/',
                   {refresh:localStorage.getItem("tokenRefresh")},
                   {headers:{}}
               )
               .then((result) => {
                        localStorage.setItem("tokenAccess", result.data.access);
                    })
                .catch((error) => {
                    this.$emit("cerrarSesion");
                })
            }
        },

        created: async function(){
            this.getProducto();
        }

}

</script>

<style>

 .eliminarProductos{
        margin:0px;
        padding: 10%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 40px;
        position: absolute;
        top:-5px;
    }
    .eliminarProductos h3{
        font-size: 30px;
        color: #0F362D;
        justify-content: center;
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .eliminarProductos p{
        font-size: 22px;
        color: #0F362D;
        justify-content: center;
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .eliminarProductos span{
        color: crimson;
        font-weight: bold;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .eliminarProductos button{
        width: 20%;
        height: 40px;
        color: #fff;
        background: #EF233C;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 17px;
        position: relative;
        top:15px;
    }

    .eliminarProductos button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

    .imagen6 img{
     width: 30%;
     display: grid;
     position: absolute;
     top:56.8%;
     left: 10%;
    }
</style>