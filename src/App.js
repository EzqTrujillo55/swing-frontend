import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Chat from './components/Chat';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MainLayout from './pages/MainLayout';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtZHer3WXh9KlUJCIU5ZQEx7AT743yo34",
    authDomain: "examen-trujillo-pablo.firebaseapp.com",
    databaseURL: "https://examen-trujillo-pablo-default-rtdb.firebaseio.com",
    projectId: "examen-trujillo-pablo",
    storageBucket: "examen-trujillo-pablo.appspot.com",
    messagingSenderId: "116463053017",
    appId: "1:116463053017:web:9ab37544775c7242b836c8",
    measurementId: "G-276CCPFNF6"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const App = () => {
  
  
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/chat" component={Chat} exact={true} />
        <Route exact path="/" 
        /*render={() => <Redirect to="/home" />}*/
        component = {MainLayout} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
