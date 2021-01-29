import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Login from '../components/Login';
import firebase from 'firebase';
import Chat from '../components/Chat';

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
            !autenticado?
            (
            <Login setEmail={setEmail} setPassword={setPassword} login={login}/>
            ):
            (
            <Chat logout= {logout} autenticado={autenticado} />
            )
        }
        </IonContent>
    </IonPage>
    )
}
export default MainLayout; 