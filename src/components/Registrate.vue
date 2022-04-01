<template>
    <div class="registrate">
        <div class="containerRegistrate">
            <div class="formulario">
                <h2>Registrate</h2>
               <form v-on:submit.prevent="processRegistrate" >
                 <input type="email" v-model="user.email" placeholder="Correo electronico">
                 <br>
                 <input type="password" v-model="user.password" placeholder="Password">
                 <br>
                 <input type="text" v-model="user.nombreComunidad" placeholder="Nombre Comunidad">
                 <br>
                 <input type="text" v-model="user.oficio" placeholder="Oficio">
                 <br>
                 <input type="text" v-model="user.region" placeholder="Región">
                 <br>
                 <input type="number" v-model="user.cuenta.cantidadProductos" placeholder="Cantidad de productos">
                 <br>
                 <button type="submit">Registrate!!</button>
               </form>
            </div>
            <div class="imagen8">
              <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/305_mochila-arhuaca-g.png" ><p>Mochila - pueblo indígena Arhuaco</p>
            </div>    
         </div>
        </div>
</template>

<script>
  import axios from 'axios';

  export default {
      name : "registrate",

      data:function(){
          return{
              user:{
                  email: "",
                  password: "",
                  nombreComunidad:"",
                  oficio: "",
                  region: "",
                  cuenta:{
                      cantidadProductos: 0,
                      fecha            : (new Date()).toJSON().toString(),
                      condicion        :true
                  }
              }
          }
      },
      methods:{
          processRegistrate: function(){
              axios.post(
                  'http://localhost:8000/user/',
                  this.user,
                  {headers:{}}
              )
              .then((result) =>{
                  let dataRegistrate ={
                        email        : this.user.email,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
              }

              this.$emit('completedRegistrate', dataRegistrate)
              //alert("usuario registrado")
              })
               .catch((error) => {
                    console.log(error)
                    alert("Fallo el Registro");
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
.registrate{
        margin  : 100px 120px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
.containerRegistrate .formulario {
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

.containerRegistrate .imagen8 img{
       width: 700px;
       display: grid;
       position: absolute;
       top:160px;
       right: 130px;
}

.containerRegistrate .imagen8 p{
       display: grid;
       position: absolute;
       font-size: 10px;
       top:660px;
       right: 440px;
       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .registrate h2{
        color: #0F362D;
        align-items: center;
        padding: 10px 85px ;
        margin: 0px auto;
        position: absolute;
        top: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .registrate form{
        width: 95%;
        
    }
    .registrate input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 10px;
        border: 1px solid #0F362D;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 40px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .registrate button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #0F362D;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 26px;
        margin: 30px 0px 20px 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 17px;
        position: relative;
        top: 18px;
    }
    .registrate button:hover{
        color: #E5E7E9;
        background: #EF5B5B;
        border: 1px solid #EF5B5B;
    }

</style>
