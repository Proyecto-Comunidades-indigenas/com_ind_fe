<template>
    <div class="home">
        
         <div class="contenido">
         <h1>Bienvenidas comunidades!! </h1>
         <p>Fique es una plataforma que le permitirá registrar los diferentes productos de su comunidad, así como llevar un inventario organizado 
          de los mismos esto nos ayudara a crear una base datos a nivel nacional con todos los productos elaborados por comunidades indígenas, adicional 
          a esto su registro le permitirá conocer las noticias del sector, participar de eventos y actividades con las que cada comunidad puede dar a conocer 
          no solo las costumbres de los pueblos sino los productos autóctonos de cada región.</p> 
         </div> 
          <div>
             <div class="imagen1">
             <img src="https://artesaniasdecolombia.com.co/Documentos/Catalogo/3708_werregue-mediano-g.png" ><p>Canasto de Werregue - pueblo indígena Wounaan</p>
          </div>
         </div> 
         
    </div>
</template>

<script>

</script>

<style>
 .home {
        padding        : 2%;
        height         : 20px;
        width          : 100%;
        justify-content: space-between;
        align-items    : center;
        display: grid;
        grid-template-columns: 1fr 1fr;
        /*espaciado*/
        gap:48px;
        margin:auto;
        position: relative;
        top:0%;
        left: 1%;
      
    }
    .home .contenido {
        /*margin : 50px;
        height : 30%;
        color    : #283747; */
        border: 3px solid #0F362D;
        border-radius: 10px;
        width: 90%;
        height: 90%;
        margin: 15px;
        background-color:#0F362D;
        position: relative;
        top:1%;
        left: 15%;
    }

    .home .contenido h1{
        margin : 40px;
        font-size: 30px;
        color    : #fff; 
        display: flex;
        align-items    : center;
        justify-content: center;
        line-height: 1;
        font-family: sans-serif;
    }
    .home .contenido p{
        margin : 50px;
        font-size: 17px;
        color    : #fff; 
        display: flex;
        align-items    : center;
        justify-content: center;
        line-height: 1.5;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    
    .imagen1 img{
        height: 110%;
        width:90%;
        display: flex;
        position: relative;
        top: -50%; 
        left: 5%;

    }
    .imagen1 p{
        font-size: 10px;
        text-align: center;
        padding-inline-end: 10px;
        display: grid;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

</style>
