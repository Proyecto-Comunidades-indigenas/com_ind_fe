<template>
    <div class="obtenerTablaComProd">      
        <table class="ListaTabla header_fijo" id="Topicos_Datatable">
            <tbody>
                <tr class="cabecera">
                    <th>Producto</th>
                    <th>Caracteristicas</th>
                    <th>Cantidad</th>
                    <th>Tipo<br>Producto</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
                <tr v-for="producto in productos" v-bind:key="producto" class="tabla">
                    <td >{{producto.nombreProducto}}</td>
                    <td >{{producto.caracteristicas}}</td>
                    <td >{{producto.cantidad}}</td>
                    <td >{{producto.tipo_producto}}</td>
                    <td><button v-on:click="loadActualizarProducto(producto)" class="botonActualizar">Editar</button></td>
                    <td><button v-on:click="loadEliminarProducto(producto)" class="botonBorrar">Eliminar</button></td>
                </tr>
            </tbody>
        </table>
        <div class="imagen4">
              <img src="https://artesaniasdecolombia.com.co/Documentos/Contenido/20478_chiqui-chiqui-g-2.jpg" ><p>canastos de Marama - grupos indígenas de la región (Curripaco, Cubeo y Puinave)</p>
        </div> 
    </div>    
</template>

<script>
    import axios from 'axios';
    import jwt_decode from 'jwt-decode';

    export default{
        name: 'listaProductos',
        
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
                productos : []
            }
                
        },

        methods: {

             loadEliminarProducto: function(producto){
              console.log("PRODUCTO: "  + producto.id)
             localStorage.setItem("productoId", producto.id)
             this.$router.push({name: "eliminarProducto"})
             
            },

            loadActualizarProducto: function(producto){
              console.log("PRODUCTO: "  + producto.id)
             localStorage.setItem("productoId", producto.id)
             this.$router.push({name: "actualizarProducto"})
             
            },
             getProductos: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();

                axios.get(

                   `http://localhost:8000/producto/productoLista/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                    .then((result) =>{
                        console.log(result.data);
                        this.productos = result.data;
                    })
                    .catch((error)=>{
                        this.$emit("loadCreacionProducto");
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
            this.getProductos();
        }
}
</script>

<style >

.obtenerTablaComProd{
    margin:90px 180px;
    width: 600px;
}

.header_fijo {
  width: 200%;
  table-layout: fixed;
  border-collapse: collapse;
}

/*.header_fijo thead {
  background-color: #333;
  color: #FDFDFD;
}*/

.header_fijo .tabla tr{
  display: block;
  position: relative;
}

.header_fijo tbody {
  display: block;
  overflow: auto;
  width: 57%;
  height: 400px;
}
tbody::-webkit-scrollbar {
    width: 5px;
    position: absolute;
}

tbody::-webkit-scrollbar-track {
  background: #b1cdc7;
  border-radius: 50px
}

tbody::-webkit-scrollbar-thumb {
  background: #0F362D;
  border-radius: 50px;
}
tbody::-webkit-scrollbar-thumb:hover {
  background: #246355;
}

table{
    background-color: white;
    text-align: center;
    border-collapse: collapse;
    width: 80%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

th, td{
    padding: 10px;
}

tbody .cabecera{
    background-color: #246355;
    border-bottom: solid 5px #0F362D;
    color: white;
}

.botonActualizar{
    background: #4FB0C6;
    border-radius: 10px;
    border: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    width: 45px;
    height: 25px;
    font-size: 10px;
}

.botonBorrar{
    background: #EF233C;
    border-radius: 10px;
    border: none;
    color: white;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 47px;
    height: 25px;
    font-size: 10px;
}

.tabla:nth-child(even){
   background-color: #ddd;
}

.tabla:hover{
    background-color: #369681;
    color: white;
}

.imagen4 img{
    width: 500px;
    display: flex;
    position: absolute;
    top:48%;
    left: 62.5%;
}
.imagen4 p{
    position: absolute;
    top:97%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    right: 100px;
    font-size: 10px;
}

</style>