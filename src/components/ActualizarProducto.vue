<template>
    <div class="actualizarProducto">
        <div class="imagen5">
              <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/2596_mochila-kankuama-g.png" ><p>Mochila - Artesanos indígenas Kankuamo Sierra Nevada de Santa Marta</p>
        </div> 
        <div class="containerActualizarProducto">
            <form v-on:submit.prevent="updateProducto" >
                 <select v-model="producto.cuenta">
                    <option disabled selected>Seleccione una cuenta de origen...</option>
                    <option v-for="cuenta in misCuentas " :key="cuenta.id" :value="cuenta.id"> Cuenta {{ cuenta.id }}</option>
                </select>
                <input type="text" placeholder="nombre producto" v-model="producto.nombreProducto">
                <input type="textarea" placeholder="caracteristicas" v-model="producto.caracteristicas">
                <!--<input type="date" placeholder="fecha" v-model="producto.producto_data.fecha_registro">-->
                <input type="number" placeholder="cantidad" v-model="producto.cantidad">
                <input type="text" placeholder="tipo de producto" v-model="producto.tipo_producto">
                <button type="submit">Actualiza tu producto!</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios      from 'axios';
    import jwt_decode from 'jwt-decode';

    export default{
        name: "actualizarProducto",

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

                producto : [],
                cuentas : [],
                misCuentas : []
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

           updateProducto: async function (){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                this.producto.user_id = parseInt(userId);
                console.log("usuario: " + userId)
                let productoId = localStorage.getItem("productoId");
                console.log("el id es: " + productoId);
                
                axios.put(

                    `http://localhost:8000/producto/update/${userId}/${productoId}/`,
                     this.producto,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                     console.log("LLEGO AQUI"+result.data);
                     this.producto = result.data;
                     alert("producto actualizado")
                     this.$router.push({name: "listaProductos"});
                     //this.getproducto();
                })
                .catch((error) => {
                    console.log("error");
                    alert("no se pudo actualizar el producto")
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
            },

            getListaCuentas: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                axios.get(
                    `http://localhost:8000/cuenta/cuentaComunidades/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.cuentas = result.data;
                })
                .catch((error) => {
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                    }
                })
            },


            getMisCuentas: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();

                axios.get(
                   `http://localhost:8000/cuenta/list/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                    .then((result) =>{
                        this.misCuentas = result.data;
                    })
                    .catch((error)=>{
                         if(error.response.status == "401") {
                         alert("Usted no está autorizado para realizar este registro.");
                        }
                       else if(error.response.status == "500"){
                         alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                       }
                    })
            }
        },

        created: async function(){
            this.getProducto();
            this.getListaCuentas();
            this.getMisCuentas();
        }

}

</script>

<style>

 .actualizarProducto{
        margin  : 100px 120px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
     .containerActualizarProducto{
        border: 3px solid #0F362D;
        border-radius: 10px;
        width: 60%;
        height: 63%;
        padding: 5%;
        margin: 100px;
        position: relative;
        top:-10% ;
        left: -10%;
    }

     .actualizarProducto .imagen5 img{
       width: 50%;
       display: grid;
       position: absolute;
       top:210px;
       left: 120px;
}
.actualizarProducto .imagen5 p{
    position: absolute;
       top:102%;
       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
       left: 400px;
       font-size: 10px;
}
    .actualizarProducto input{
        height: 40px;
        width: 95%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 10px;
        border: 1px solid #0F362D;
        align-items: center;
        justify-content: center;
        top: 70px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .actualizarProducto select{
       height: 40px;
        width: 95%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 10px;
        border: 1px solid #0F362D;
        align-items: center;
        justify-content: center;
        top: 70px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .actualizarProducto button{
        width: 95%;
        height: 40px;
        color: #E5E7E9;
        background: #4FB0C6;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 30px 0px 20px 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 17px;
        top: 50px;
    }
    .actualizarProducto button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>