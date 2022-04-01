<template>
    <div class="productoCreado">
        <div class="containerCreacionProducto">
            <h2>Crea tu producto</h2>
            <form v-on:submit.prevent="processProducto" >
                <select v-model="producto.producto_data.cuenta">
                    <option disabled selected>Seleccione una cuenta de origen...</option>
                    <option v-for="cuenta in misCuentas " :key="cuenta.id" :value="cuenta.id">{{cuenta.user.nombreComunidad}}- Cuenta {{ cuenta.id }}</option>
                </select>
                <input type="text" placeholder="nombre producto" v-model="producto.producto_data.nombreProducto">
                <input type="textarea" placeholder="caracteristicas" v-model="producto.producto_data.caracteristicas">
                <!--<input type="date" placeholder="fecha" v-model="producto.producto_data.fecha_registro">-->
                <input type="number" placeholder="cantidad" v-model="producto.producto_data.cantidad">
                <input type="text" placeholder="tipo de producto" v-model="producto.producto_data.tipo_producto">
                <button type="submit">Registra tu producto!</button>
            </form>
        </div>
        <div class="imagen3">
              <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/2733_tinajo-moriche-g.png" ><p>Tinajo Moriche - Artesanos indígenas de la etnia Sikuani, Bajo Orinoco</p>
        </div> 
    </div>
</template>

<script>
    import axios      from 'axios';
    import jwt_decode from 'jwt-decode';

    export default{
        name: "CreacionProducto",

        data: function(){
            return {
                producto : {
                    user_id : 0,
                    producto_data: {
                          cuenta  : 0,
                          nombreProducto : "", 
                          caracteristicas: "",
                          fecha_registro : (new Date()).toJSON().toString(), 
                          cantidad       : 0,
                          tipo_producto  : ""
                     }
                },

                cuentas : [],
                misCuentas : []

            }
        },

        methods:{
             processProducto: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();
                /*el userId se convierte en entero porque el tipo de dato que viene de backend es int */
                this.producto.user_id = parseInt(userId);
                console.log(this.producto)
                console.log(token);
                
                axios.post(
                    'http://localhost:8000/producto/create/',
                    this.producto,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.$emit("completedCreacionProducto");
                })
                .catch((error) => {
                    console.log("Error");
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "400"){
                        alert("La transacción no se pudo procesar correctamente.\nRevise todos los datos e intente de nuevo.");
                    }
                })
            },
            verifyToken: async function(){
                return axios.post(
                        'http://localhost:8000/refresh/',
                        {refresh: localStorage.getItem("tokenRefresh")},
                        {headers:{}}
                    )
                    .then((result) => {
                        console.log("New access token");
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
                

            },

            
        },

        created: async function(){
            this.getListaCuentas();
            this.getMisCuentas();
        }
    }

</script>

<style>
 .productoCreado{
        margin  : 100px 120px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .containerCreacionProducto{
        border: 3px solid #0F362D;
        border-radius: 10px;
        width: 60%;
        height: 70%;
        padding: 5%;
        margin: 100px;
        position: relative;
        top:-20%;
        right: 5%;
    }
    .containerCreacionProducto h2{
        font-size: 25px;
        align-items: center;
        justify-content: center;
        text-align: center;
        left: 1px;
    }

    .productoCreado .imagen3 img{
       width: 700px;
       display: grid;
       position: absolute;
       top:170px;
       right: 80px;
}
    .productoCreado .imagen3 p{
       position: absolute;
       top:100%;
       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
       right: 240px;
       font-size: 10px;
}
    .productoCreado h2{
        color: #0F362D;
        align-items: center;
        padding: 10px 85px ;
        margin: 0px auto;
        position: absolute;
        top: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;;
    }
    .productoCreado form{
        width: 70%;
    }
    .productoCreado input{
        height: 40px;
        width: 134%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 10px;
        border: 1px solid #0F362D;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 70px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .productoCreado select{
       height: 40px;
        width: 134%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 10px;
        border: 1px solid #0F362D;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 70px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .productoCreado button{
        width: 134%;
        height: 40px;
        color: #E5E7E9;
        background: #0F362D;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 30px 0px 20px 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 17px;
        position: relative;
        top: 50px;
    }
    .productoCreado button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>