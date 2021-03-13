import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import 'capacitor-plugin-file-downloader';
import { Downloader } from '@ionic-native/downloader';
import '../styles/Busqueda.css';
const { Filesystem , FileDownloader} = Plugins;




const baseUrl = 'https://swing-mobile-backend.herokuapp.com'; 
const Busqueda = () => {
    const[query, setQuery] = useState('');
    const[resultado, setResultado] = useState([]);
    const [feedBack, setFeedback] = useState(''); 
    const [respuesta, setRespuesta] = useState(''); 
    
    const search = async () => {
        //const data = { title: query };
        if(query!=''){
        setFeedback(' Buscando..');
        const response = await fetch(`${baseUrl}/search_song`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title:query.replace(/\s/g, "+")}),
        }).then(res=> res.json())
        .then(data => data);
        
        console.log(typeof response); 
        setResultado(response);
        setFeedback('');
        }
    }

        
    const download = async (watch, title) => {
        setFeedback(' Descargando..');
        const response = await fetch(`${baseUrl}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url:watch}),
        }).then(res=> res.json())
        .then(data => ultima(data.downloadUrl, title));
        setFeedback(' Descarga finalizada!');    
    }

    
    const ultima = (fileUrl, title) => {
        setFeedback(' Descargando....')
        //const fileUrl = "https://storage.googleapis.com/swing-9d5d6.appspot.com/C%3A%5CUsers%5CTemporal%5CDesktop%5Cswing-back%5CHasta%20Que%20Me%20Olvides.mp4";
        const request = {
            uri: fileUrl,
            title: title,
            description: '',
            mimeType: '',
            visibleInDownloadsUi: true,
            //notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
            destinationInExternalFilesDir: {
                dirType: 'Downloads',
                subPath: title + '.mp4'
            }
        };
  
    Downloader.download(request)
                .then((location) => alert('Canción descargada correctamente'))
                .catch((error) => alert('error', error));
    }
    

    return(
        <>
        <IonHeader id="header">
            <h3>Swing</h3>
        </IonHeader>
        <div className="main-container">
            
            <div className="search-box">
            <IonInput onIonChange={e => setQuery(e.target.value)}  placeholder="Buscar canción"/>
            <IonButton onClick={search}>Buscar</IonButton>
            <IonLabel>{feedBack}</IonLabel>
            </div>
            <div className="results-box">
                {Object.keys(resultado).map(key =>(  
                <h5 onClick={() => download(resultado[key]['watch'], resultado[key]['title'])} key={key} value={key}>{resultado[key]['title']}</h5>
                ))}   
            </div>
        </div>
        </>
    )

}

export default Busqueda; 