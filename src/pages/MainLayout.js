import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Login from '../components/Login';
import firebase from 'firebase';
import Chat from '../components/Chat';
import Busqueda from './Busqueda';

const MainLayout = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [autenticado, setAutenticado] = useState(false); 
    

    
    
    const login = async () => {
        console.log(`realizando login con ${email} , ${password}`)
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email,password); 
            console.log(response); 
            setAutenticado(response);
            localStorage.setItem('usuarioAutenticado', autenticado);
        } catch (error) {
            console.log(error)
            return false;         
        }
        
    }

    const logout = () => {
        setAutenticado(false); 
        localStorage.setItem('usuarioAutenticado', autenticado); 
    }

    return(
        <IonPage>
      <IonContent fullscreen>
        
        {
            autenticado?
            (
            <Login setEmail={setEmail} setPassword={setPassword} login={login}/>
            ):
            (
            <Busqueda/>
            )
        }
        </IonContent>
    </IonPage>
    )
}
export default MainLayout; 