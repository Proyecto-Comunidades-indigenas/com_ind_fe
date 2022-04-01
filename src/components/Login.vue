<template>
    <div class="loginUser">
         <div class="containerLoginUser">
            <div class="imagen7">
             <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/2731_canasto_balafi_moriche_g.png" ><p>Cestería en técnica de rollo - Artesanos indígenas de la etnia Sikuani, Bajo Orinoco</p>
         </div>
         <div class="formulario">
            <h2>Iniciar sesion</h2>
            <form v-on:submit.prevent ="processLoginUser">
                <input type="text" placeholder= "Correo Electronico" v-model="user.email">
                <br />
                <input type="password" placeholder= "Contraseña" v-model="user.password"> 
                <br />
                <button type="submit">Iniciar sesión</button>
            </form>
         </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        name: "logIn",

        data:function(){
            return{
                user: {
                    email:"",
                    password:""
                }
            }
        },
        methods:{
            processLoginUser: function(){
                axios.post(
                    'http://localhost:8000/login/',
                    this.user,
                    {headers:{}}
                )
                //aqui almaceno el resultado del endpoint al solicitar los datos del backend
                .then((result) => {
                    let dataLogIn ={
                        email        : this.user.email,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    //emit es la la forma en la que voy a enviar informacion a la capa padre
                    this.$emit('completedLogIn', dataLogIn)
                    //alert("usuario logueado")
                })
                .catch((error) => {
                    if (error.response.status == "401")
                        alert("ERROR 401: Credenciales Incorrectas.");
                });
            }
        }
    }


</script>

<style >
*{
  margin:0;
  padding: 0;
}
.loginUser{
        margin  : 90px 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
   
    }
.containerLoginUser .formulario {
        border: 3px solid #0F362D;
        border-radius: 10px;
        width: 30%;
        height: 42%;
        padding: 5%;
        margin: 100px;
        position: absolute;
        top:25%;
        left: 45%;
}

    .containerLoginUser .imagen7{
       display: grid;
       position: absolute;
       top:120px;
       left: 30px;
    }

    .imagen7 p{
        font-size: 10px;
        text-align: center;
        padding-inline-end: 70px;
        display: grid;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        position: relative;
        top:-600%;
        right: 4%;
    }

    .loginUser h2{
        color: #0F362D;
        align-items: center;
        padding: 0px 60px;
        margin: 0px auto;
        position: absolute;
        top: 40px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .loginUser form{
        width: 105%;
    }
    .loginUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0px;
        border: 1px solid #0F362D;
        align-items: center;
        position: relative;
        top: 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .loginUser button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #0F362D;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
        align-items: center;
        position: relative;
        top: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 15px;
    }
    .loginUser button:hover{
        color: #E5E7E9;
        background: #EF5B5B;
        border: 1px solid #EF5B5B;
    }

</style>