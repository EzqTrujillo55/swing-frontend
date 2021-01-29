# Examen Tópicos Especiales

1. Este proyecto está desarrollado con Ionic + React.
2. Básicamente consiste en 4 componentes principales: App, MainLayout, Login, Chat

# App
- Aquí se determinan las rutas de nuestra aplicaición, en este caso existen 2, MainLayout y Chat
- Tamnién se especifica e inicializan los servicios de firebase. 

# MainLayout
- En este componente se arma el esqueleto visual y se establecen las principales funciones y variables de estado para autenticaicón
- Dentro de este mimsmo componente se hace un renderizado condicional en base a una variable de estado autenticado
- Si dicha variable tiene contenido diferente de false, se renderiza el componente de Chat, si es false se renderiza Login 


# Login
- Este es el componente que se renderiza sino hay un usuario autenticado
- Dentro del mismo se renderiza el formulario y se invocan a los principales métodos de autenticaicón, que son proporcionados por MainLayout via props
- Estos métodos son: setEmail, setPassword u login 

# Chat
- En este componente se renderiza la pantalla de chat, este componente también recibe un méotod logout a través de su componente padre MainLayout 
- Contiene su propia función y variables de estado que son: mensajes (carga los mensajes de BD) , texto(variable de estado del input de mensaje), enviarMensaje(función que envia el mensaje haciendo uso del texto y el usuarioAutenticado, el usuarioAutenticado se lo obtiene via props por el componente MainLayout) 
