<template>
  <div id = "app" class ="app">
    <div class = "header">
      <img src="./assets/Logo6.png" alt="">
      <h1>Inventarios Productos <br> comunidades indigenas</h1>
        <nav>
          <button v-if="!isAuth" v-on:click ="loadInicio"> Inicio </button>
          <button v-if="!isAuth" v-on:click ="loadLogIn"> Ingresa </button>
          <button v-if="!isAuth" v-on:click ="loadRegistrate"> Registrate </button>

          <button v-if="isAuth" v-on:click="loadCuenta"> Cuenta </button>
          <button v-if="isAuth" v-on:click="loadCreacionProducto"> Crea tus productos </button>
          <button v-if="isAuth" v-on:click="loadListaProductos">Productos creados</button> 
          <button v-if="isAuth" v-on:click="cerrarSesion"> Cerrar sesión </button>
        </nav>
      </div>
     <div class="main-component">
       <router-view
        v-on:completedInicio="completedInicio"
        v-on:completedLogIn="completedLogIn"
        v-on:completedRegistrate="completedRegistrate"
        v-on:cerrarSesion="cerrarSesion"
        v-on:completedCreacionProducto="completedCreacionProducto"
        v-on:completedListaProductos="completedListaProductos"
        >
       </router-view>
     </div>

     <div class="footer">
       <!--<img class= "imagen-footer" src="./assets/Logo6.png" alt="">-->
       <div class="footer-contactanos">
          <h3>Contactanos</h3>
          <span><font-awesome-icon icon="location-dot" class="mr-2"/> 123 Av. Americas</span><br>
          <span><font-awesome-icon icon="phone" class="mr-2"/> (+57) 12 345678</span><br>
          <span><font-awesome-icon icon="envelope" class="mr-2"/> info@fique.com</span>  
        </div>
        <img class= "imagen-footer" src="./assets/Logo6.png" alt="">
             <div class="redes">
                <div class="footer-redes" id="navbar">
                  <ul class="navbar-nav ml-auto">
                 <a href="https://www.github.com/" target="_blank">
                   <font-awesome-icon :icon="['fab', 'github']" /> Github
                 </a>
                 <a href="https://www.youtube.com/" target="_blank">
                   <font-awesome-icon :icon="['fab', 'youtube']" /> Youtube
                 </a>
                 <a href="https://www.linkedin.com/" target="_blank">
                   <font-awesome-icon :icon="['fab', 'linkedin']"/> Linkedin
                 </a>
                 <a href="https://www.twitter.com/" target="_blank">
                   <font-awesome-icon :icon="['fab', 'twitter']" /> Twitter
                 </a>
                </ul> 
              </div>
             </div>
        </div>
         <div class="footer-copy">
            &copy; Lina Cardozo - Todos los derechos reservados
          </div>
      </div>
</template>

<script>

  export default{
    name:'App',

    data: function(){
      return{
        isAuth: false
      }
    },

    components:{

    },

    methods:{
      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        if(this.isAuth == false){
          this.$router.push({name: "inicio"});
        }
        else{
          this.$router.push({name:"cuenta"});
        }
      },

      loadInicio: function(){
        this.$router.push({name: "inicio"})
      },

      loadLogIn: function(){
        this.$router.push({name: "logIn"})
      },

      loadCuenta: function(){
        this.$router.push({name: "cuenta"})
      },

      loadCreacionProducto: function(){
        this.$router.push({name: "creacionProducto"})
      },

      loadRegistrate: function(){
        this.$router.push({name: "registrate"})
      },

      loadListaProductos: function(){
        this.$router.push({name: "listaProductos"})
      },

      cerrarSesion: function(){
        localStorage.clear();
        alert("sesión terminada, gracias por visitarnos!!")
        //this.isAuth =  false;
        this.verifyAuth();
      },

      completedInicio: function(data){},

      completedLogIn: function(data){
        localStorage.setItem('email', data.email);
        localStorage.setItem('tokenRefresh', data.tokenRefresh);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        localStorage.setItem('isAuth', true);
        alert("Autenticación exitosa");
       // this.isAuth =  true;
        this.verifyAuth();
      },

      completedRegistrate: function(data){
        alert("Registro exitoso");
        this.completedLogIn(data);
       },

       completedCreacionProducto: function(data){
         alert("Producto creado")
         this.$router.push({name: "cuenta"})
       },

       completedListaProductos: function(data){
         this.$router.push({name: "listaProductos"})
       },

    },

    created: function(){
      this.verifyAuth()
    }
  }

</script>


<style>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
  .header{
    margin: 10 auto; 
    overflow: hidden;
    padding: 20px;
    width: 100%;
    height: 20vh;
    min-height: 100px;
    background-color: #FFBC42;
    color:#E5E7E9 ;
    display: flex;
    align-items: center;
    
  }

  .header h1{
    /*width: 20%;*/
    text-align: center;
    font-size: 20px;
    position: absolute;
    padding: 10%;
    float: left;
    color: #36393B;
  }

  .header img{
    width: 68px;
    height: 100px;
    margin-left: 50px;
    /*padding: 150px;*/
    /*justify-content: flex-start;*/
    align-items: left;
  }

   .header nav {
    height: 100%;
    width: 35%;
    display: flex;
    float: right;
    line-height: 200px;
    padding: 70%;
    justify-content: space-around;
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .header nav button{
    color: #000;
    background: #FFBC42;
    display: inline-block;
    border: none;
    border-radius: 5px;
    padding: 10px 45px;
    font-size: 15px;
    line-height: normal;
    -webkit-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    border-radius: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .header nav button:hover{
    color: #E5E7E9;
    text-decoration: #0F362D;
    /*background: #0F362D;*/
  }
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background: #FDFEFE ;
    align-content: center;
  }

  .footer{
   /* margin: 0;
    padding: 0;*/
    margin:0 auto;
    overflow: hidden;
    padding: 10px 0px;
    width: 100%;
    height: 20vh;
    min-height: 100px;
    background-color: #FFBC42;
    display: flex;
    justify-content: space-between;
    
 }

 .footer h2{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
 }

.footer .footer-redes{
  width: 98%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}


.footer .footer-redes a {
  outline: none;
  text-decoration: none;
  display: inline-block;
  /*flex-wrap: wrap;*/
  /*width: 20%;*/
  width: calc(100% / 2);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 15px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 45px;
  margin-left: 15px;
  line-height: 20px;
  justify-content: space-between;
  align-items: center;
  position: inherit;
  /*padding:10px 40px ;*/
  /*height: auto;*/
  color: #000;
}

  div.footer-contactanos{
    color: #000;
    text-decoration: none;
    /*width: 50%;*/
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 15px;
    padding-top: 10px;
    /*padding-left: 30%;
    padding-right: 5px;*/
    margin-left: 30%;
    line-height: 27px;
    justify-content: center;
    position: inherit;
    /*float: center;*/
    /*height: auto;/*/
    justify-content: space-between;
    width: calc(100% / 4);
    text-align: left;
  }

  div .footer-copy{
    color: #000;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: #FFBC42;
    /*margin: .5em .5em .5m 1em;*/
    text-align: center;
    text-decoration: overline;
    width: 100%;
    font-size: 14px;
    margin: 0px auto;
    padding: 20px 10px;
  }

.footer img{
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    width: 63px;
    height: 110px;
    position: relative;
    right: 100px;
    top: 5px;
}

  @media screen and (max-width: 950px) {
    header,
    header .h1,
    header nav button,
    header img{
      width:100%;
      text-align:center;
      line-height:100px;
    }
  }

  /*div.footer-copy{
    justify-content: center;
    align-items: center;
    padding: 150px 500px ;
    color: #000;
  }*/

</style>
