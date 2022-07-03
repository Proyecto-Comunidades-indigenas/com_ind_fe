# Proyecto de Ciclo III: Inventario productos comunidades indigenas - arquitectura monolítica
Este proyecto está enfocado en la creación de una aplicación web que permita de forma sistemática el almacenamiento y gestion de inventarios de productos elaborados por las comunidades indigenas del pais y en una versión siguiente de manera adicional se planea mejorar el frontend con imagenes referentes a cada producto ingresado.

### Frontend: autenticación y cuenta de usuarios
para la realización de la parte grafica de este proyecto se utilizó el framework vue, con el lenguaje de programacion javaScript, las pruebas correspondientes se realizaron en postman y desde el componente grafico.

### Contenido de Este repositorio: 

 1. Se tiene una carpeta llamada src donde se almacena el código fuente de la aplicación web. Este contiene a su vez varias carpetas para organizar el código, esta carpeta contiene las carpetas: assets y components, asi como los archivos App.vue, main.js y router.js 

 2. Se tiene una carpeta llamada public la cual vue, crea por defecto, esta carpeta contiene archivos como: favicon.ico e index.html

 3. se creo un archivo de configuración llamado package.json, donde se instalaron las dependencias y la versión de la aplicación

 4. se tienen dos archivos creados por el framework: package-lock.json y babel.config.js

 ### Requerimientos 
```
 node==14.18.1
 npm==6.14.15
 vue==@vue/cli 4.5.14
```

### Ejecución del proyecto

para ejecutar el proyecto en local:

1. Se descarga el proyecto comprimido o se clona de GitHub
   ```
    git clone https://github.com/Proyecto-Comunidades-indigenas/com_ind_fe.git
   ```
2. Al tener el proyecto en el ordenador, por la consola de comandos de ingresa al proyecto utilizando el comando cd:
   ```
    cd com_ind_fe-main
   ```
3. se debe ingresar el siguiente comando para ejecutar el proyecto en local(computador personal o servidor):
   ```
    npm run serve
   ```
 4. Es posible comprobar su funcionamiento ingresando a la url asignada http://localhost:8080.
 
### Diagrama de despliegue 

la parte sombreada hace referencia al despliegue de componentes de la parte frontend del proyecto

![image](https://user-images.githubusercontent.com/84297258/176060247-d3b9ce49-85be-4814-8e97-4520a3c6ac01.png)

### Ejecución proyecto

El proyecto se encuentra desplegado en la plataforma heroku:

https://com-ind-frontend.herokuapp.com/#/user/inicio
