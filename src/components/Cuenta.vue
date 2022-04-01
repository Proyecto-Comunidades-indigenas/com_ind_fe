<template>
    <div v-if="loaded" class="informacion">
        <div>
            <div class="imagen2">
             <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/36293_06-02-026-a-(2).jpg" ><p>Contenedor tallado cedro</p>
         </div>
        </div>
            <h1>Bienvenida comunidad!!<span><br/>{{ nombreComunidad }}</span></h1>
             <h2>Oficio:  <span>{{ oficio }}</span></h2>
             <h2>Región:  <span>{{ region }}</span></h2>
             <h2>Email:  <span>{{ email }}</span></h2>
             <h2>Cantidad Productos: <span>{{ cantidadProductos }}</span></h2>
    </div>
</template>

<script>
    import axios      from 'axios';
    import jwt_decode from 'jwt-decode';

    export default{
        name: "cuenta",

        data: function(){
            return {
                loaded           : false,
                nombreComunidad  : "",
                oficio           : "",
                region           : "",
                email            : "",
                cantidadProductos: 0
            }
        },

        methods: {
             getData: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("cerrarSesion");
                    return;
                }
                await this.verifyToken();
                let token  = localStorage.getItem("tokenAccess");
                let userId = jwt_decode(token).user_id.toString();

                axios.get(
                    `http://localhost:8000/user/${userId}/`,
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    this.loaded            = true;
                    this.nombreComunidad   = result.data.nombreComunidad;
                    this.oficio            = result.data.oficio;
                    this.region            = result.data.region;
                    this.email             = result.data.email;
                    this.cantidadProductos = result.data.cuenta.cantidadProductos;
                })
                .catch((error) => {
                    this.$emit("cerrarSesion");
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
            this.getData();
        }

}

</script>

<style>

 .informacion{
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 55px;
        
    }
    .informacion .imagen2 img{
       width: 35%;
       display: flex;
       position: absolute;
       top:20%;
       left: 70px;
    }

    .informacion .imagen2 p{
       position: absolute;
       top:80%;
       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
       left: 240px;
       font-size: 10px;
    }

    .informacion h1{
        font-size: 40px;
        color: #0F362D;
        justify-content: center;
        align-items: center;
        position: absolute;
        top:23%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        
    }
    .informacion h2{
        font-size: 20px;
        color: #0F362D;
        justify-content: center;
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        
    }
    .informacion span{
        color: crimson;
        font-weight: bold;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

</style>