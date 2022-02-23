<template>
    <div class="registrate">
        <div class="containerRegistrate">
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
              alert("usuario registrado")
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

.registrate{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerRegistrate {
        border: 3px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .registrate h2{
        color: #283747;
    }
    .registrate form{
        width: 70%;
    }
    .registrate input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .registrate button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }
    .registrate button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>
