# PruebaTecnica

### Base de datos:

se uso mysql para la base de datos porque de 4 tablas exsitenes todas tienen relaciones entre ellas. Una transaccion depende de 2 cuentas, 1 cuenta es de un tipo de currency y pertence a un usuario. Por ende para trabajar con este tipo de relaciones se prefiere una bbdd relacional.

### Logging

se uso un logger que loggea informacion en la consola y tambien las guarda en las files de logs. El info, error y warrning aparecen siempre en consola, pero el debug solo en el ambiente de development.

### Set up

Para el setup se requier tener docker, node js, sql workbench para poder ver la bbdd.

1. Dentro de la carpeta App.
   `npm i `
2. Levantar el componente de docker, tener en cuenta que si la contraseña del root user es distinto a 'password', se tiene que cambiar en el docker-compose. Para levantar el componente:
   `docker-compose up pruebadb`
   (Antes de correrlo el docker pruebadb debe de estar corriendo.)

3. Correr la applicacion:
   `npm start`

#### Consideraciones:

Para evitar que el cron de fixer.io se utilize una variable en el env.json llamada development que si se cambia a false, trae los rates y los actualiza sino corre el metodo pero no lo trae. Otras funcionalidades tambien estan atadas a esta.

En el env.json tambien se encuentra las variables de jwtKey, para el token y middelware de el user, tambien se encuntran la fixerkey que es el valor de la key de la api de fixer.

### Cron de fixer

Fixer es actualizado cada minuto por ende se trae 1 vez por minuto.

### Postman collection

Primero se debe hacer login, y luego en la carpeta transactions en la seccion de Authorization poner el token del login. luego utilizar las consultas.
