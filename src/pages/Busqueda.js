import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import 'capacitor-plugin-file-downloader';
import { Downloader } from '@ionic-native/downloader';

const { Filesystem , FileDownloader} = Plugins;





const baseUrl = 'https://swing-mobile-backend.herokuapp.com'; 
const Busqueda = () => {
    const[query, setQuery] = useState('futari');
    const[resultado, setResultado] = useState([]);
    const [feedBack, setFeedback] = useState(''); 
    const [respuesta, setRespuesta] = useState(''); 
    const search = async () => {
        //const data = { title: query };
        setRespuesta('Cargando..');
        const response = await fetch(`${baseUrl}/search_song`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title:query}),
        }).then(res=> res.json())
        .then(data => data);
        
        console.log(typeof response); 
        setResultado(response);
        setRespuesta('');
         
    }

    
 
    
    const download = async () => {
        setFeedback('');
        const url = 'https://storage.googleapis.com/swing-9d5d6.appspot.com/C%3A%5CUsers%5CTemporal%5CDesktop%5Cswing-back%5CHasta%20Que%20Me%20Olvides.mp4';
        const response = await fetch(url).then(res => res.blob()).then(data => fileWrite(data));
    }

    


    const fileWrite = async (file) => {
        setFeedback('Downloading...');
        try {
          const result = await Filesystem.writeFile({
            path: 'cancion.mp4',
            data: file,
            directory: FilesystemDirectory.Documents
            //encoding: FilesystemEncoding.UTF8
          })
          console.log('Wrote file', file);
          setFeedback(`Wrote file ${result}`)
        } catch(e) {
          console.error('Unable to write file', e);
          setFeedback(`Unable to write file ${e}`)
        }
      }

    
    const bajar = () => 
    {
        setFeedback('DESCARGANDO!!!..');
        const url_old = 'https://storage.googleapis.com/swing-9d5d6.appspot.com/C%3A%5CUsers%5CTemporal%5CDesktop%5Cswing-back%5CHasta%20Que%20Me%20Olvides.mp4';
        const url = "http://www.africau.edu/images/default/sample.pdf";
        let fileTransfer = FileTransfer.create();
        fileTransfer.download(url, File.dataDirectory + 'documento.pdf').then((entry) => {
            console.log('download complete: ' + entry.toURL());
            // MAKE TOAST SAYING "LATEST VERSION GRABBED"
        }, (error) => {
            // handle error
            alert(JSON.stringify(error));
        });
    }
    
    
    
    
    const last = async() => {
        const fileUrl = "http://www.africau.edu/images/default/sample.pdf";
        const path = File.dataDirectory + '/documento.pdf';     
        let fileTransfer = FileTransfer.create(); 
        await fileTransfer.download(fileUrl, path)
        console.log('Download complete')
        alert('completed');
    }

    const ultima = () => {
        const fileUrl = "https://storage.googleapis.com/swing-9d5d6.appspot.com/C%3A%5CUsers%5CTemporal%5CDesktop%5Cswing-back%5CHasta%20Que%20Me%20Olvides.mp4";
        const request = {
            uri: fileUrl,
            title: 'mydocument',
            description: '',
            mimeType: '',
            visibleInDownloadsUi: true,
            //notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
            destinationInExternalFilesDir: {
                dirType: 'Downloads',
                subPath: 'MySong.mp4'
            }
        };
  
    Downloader.download(request)
                .then((location) => alert('File downloaded at:'+location))
                .catch((error) => alert('error', error));
    }
    

    return(
        <>
            <IonInput value={query} onIonChange={e => setQuery(e.target.value)}  placeholder="Escribe el nombre de la canción que deseas buscar"/>
            <IonButton onClick={search}>Buscar</IonButton>
            <IonLabel>{feedBack}</IonLabel>
            <IonLabel>{respuesta}</IonLabel>
            <IonList>
            {Object.keys(resultado).map(key =>(  
                /*resultado[key]['watch']*/
                <IonItem onClick={() => ultima()} /*onClick={fileWrite}*/ key={key}  value={key}>
                    <IonLabel>{resultado[key]['title']}</IonLabel>
                </IonItem>
            ))
            }
            </IonList>
        </>
    )

}

export default Busqueda; 