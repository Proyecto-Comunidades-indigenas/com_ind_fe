<template>
  <div id = "app" class ="app">
    <div class = "header">
      <h1>Productos <br> comunidades indigenas</h1>
        <nav>
          <button v-if="!is_auth" v-on:click ="loadInicio"> Inicio </button>
          <button v-if="!is_auth" v-on:click ="loadLogIn"> Ingresa </button>
          <button v-if="!is_auth" v-on:click ="loadRegistrate"> Registrate </button>

          <button v-if="is_auth"> Inicio </button>
          <button v-if="is_auth"> Cuenta </button>
          <button v-if="is_auth"> Crea tus productos </button>
          <button v-if="is_auth"> Cerrar sesión </button>
        </nav>
      </div>
     <div class="main-component">
       <router-view
        v-on:completedInicio="completedInicio"
        v-on:completedLogIn="completedLogIn"
        v-on:completedRegistrate="completedRegistrate"
        >
       </router-view>
     </div>

     <div class="footer">
      <h2>comunidades indigenas - Lina Cardozo</h2>
     </div>
   </div>
</template>

<script>
  export default{
    name:'App',

    data: function(){
      return{
        is_auth : false
      }
    },

    components:{

    },

    methods:{
      verifyAuth: function(){
        if(this.is_auth == false){
          this.$router.push({name: "inicio"})
        }
      },

      loadInicio: function(){
        this.$router.push({name: "inicio"})
      },

      loadLogIn: function(){
        this.$router.push({name: "logIn"})
      },

      loadRegistrate: function(){
        this.$router.push({name: "registrate"})
      },

      completedInicio: function(data){},

      completedLogIn: function(data){},

      completedRegistrate: function(data){},
      
    },

    created: function(){
      this.verifyAuth()
    }
  }

</script>


<style>

  body {
    max-width: 0 0 0 0;
  }

  .header{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #283747 ;
    color:#E5E7E9 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
    font-size: 20px;
    
  }

   .header nav {
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }

  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background: #FDFEFE ;
    align-content: center;
  }

  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #283747;
    color: #E5E7E9;
  }

   .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
