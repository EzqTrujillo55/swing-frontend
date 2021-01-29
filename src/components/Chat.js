import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import firebase from 'firebase';

const Chat = (props) => {
  const [mensajes, setMensajes] = useState([]); 
  const [texto, setTexto] = useState([]); 
  useEffect(()=> {
    const mensajesRef = firebase.database().ref('mensajes');
    mensajesRef.on('value', (snapshot) => {
    const mensajesResponse = snapshot.val();
    const listaMensajes = [];
    for (let id in mensajesResponse) {
        listaMensajes.push({ id, ...mensajesResponse[id] });
    }
    setMensajes(listaMensajes);
    console.log(listaMensajes);
    });
  }, [])

  const enviar = () => { 
    console.log('enviando mensaje');
    const chatRef = firebase.database().ref('mensajes');
    const mensaje = {
      usuario: props.autenticado.user.email,
      mensaje: btoa(texto)
    };
    chatRef.push(mensaje);
    setTexto('');
};

  

  return (
    <div class="container">
		<div class="chat">
			<div class="chat-header">
				<div class="profile">
					<div class="left">
						<h2>Tópicos Especiales</h2>
					</div>
          <div class="right">
						<IonButton onClick={()=> props.logout()} color="danger">Salir</IonButton>
					</div>
				</div>
			</div>
			<div class="chat-box">
        
        {mensajes.map((mensaje, i)=> (
          <div class="chat-r">		
					<div class="mess mess-r">
						<p>{atob(mensaje.mensaje)}</p>
            <sub>{mensaje.usuario}</sub>
					</div>
			    </div>
          
        ))}
				
				
			</div>

			<div class="chat-footer">
				<textarea value={texto} onChange={(e)=> setTexto(e.target.value)} placeholder="Escribe tu mensaje"></textarea>
        <button className="btnEnviar" onClick={enviar}>{">"}</button>
			</div>
		</div>
	</div>
  );
};

export default Chat;
