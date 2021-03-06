# Swing App 

_Aplicaci贸n hibrida de descarga local y remota de m煤sica._

## Comenzando 馃殌

_Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto. 

### Pre-requisitos 馃搵

_Android Studio_


### Instalaci贸n 馃敡

```
1. Ejecutar el siguiente comando: git clone url de este repositorio
2. Abrir el proyecto en cmd
3. Ejecutar npm install. 
4. Ejecutar con ionic serve o ionic capacitor run android 
4. Importante haber creado antes dispositivos virtuales para ver la app en ejecuci贸n o conectar un dispositivo f铆sico con la depuraci贸n USB Activada
```


## Despliegue 馃摝

```
1. Ejecutar ionic capacitor build android 
1. En android studio click en Build, luego en Generate signed bundle / apk
2. Seguir los pasos del asistente
```


## Funcionalidades 馃摉
1. B煤squeda de canciones
    ```
     const search = async () => {
        //const data = { title: query };
        if(query!=''){
        setFeedback(' Buscando...');
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
    ```
2. Descarga de canciones
    ```
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
                dirType: FilesystemDirectory.Documents,
                subPath: title + '.mp3'
            }
        };
  
    Downloader.download(request)
                .then((location) => alert('Canci贸n descargada exitosamente!'))
                .catch((error) => alert('error', error));
    }
    ```
3. Agregar a storage de firebase
    ```
    const addFavorites = async (watch, title, userId) => {
        
        const response = await fetch(`${baseUrl}/add_favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url:watch,
                name: title,
                userId: getCurrentUser().uid, 
            }),
        }).then(res=> res.json())
        .then(data => {alert(JSON.stringify(data)); add(data)});
    }

    const add = (data) => {
        const ref = firebase.firestore().collection('favorites');
        ref.add(data)
        .then(response => alert("A帽adido a favoritos :)", response))
        .catch((error) => {
            alert("Error adding document: ", error);
        });
    }
    ```

4. Reproducir canci贸n
    ```
    const playSong = (item) => {
    if (playerIndicator){
        playerIndicator.stop(); 
    }
    playerIndicator = new Howl({
        src: [item.path] ,
        html5: true,
        onplay: () => {
           setIsPlaying(true); 
           setActiveTrack(item);  
        },
        onend: () => {
            console.log('onend');
        }
      });
    playerIndicator.play();
    }
    ```
5. Editar y eliminar canci贸n
   ```
   const remove = (docId) => {
    const ref = firebase.firestore().collection('favorites').doc(docId);
    ref.delete();
    alert('Removido exitosamente');
    getFavorites(); 

    }

    const updateSong = (docId, path) => {
    const ref = firebase.firestore().collection('favorites').doc(docId);
    ref.update({favorites: [
        {'name': editedTitle,
          'path': path,
        }] })
    setEdit(false);
    getFavorites();
    }
   ```

## Preview
![Screenshot](Screenshot.jpeg)


## Video Demostrativo
https://youtu.be/MjAqAUIy9Is

## Video Explicativo
https://youtu.be/O18md32dnb4

## Responsabilidades
![Screenshot](tabla.png)


## Construido con 馃洜锔?

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Android Studio](https://developer.android.com/studio) - Entorno de desarrollo para aplicaciones nativas
* [Ionic Framework](https://ionicframework.com/) - Framework de desarrollo de aplicaciones hibridas. 


## Autores 鉁掞笍

* **Gabriela Garc铆a** - *Codificaci贸n, Investigaci贸n, Documentaci贸n* - [Gabiita](https://github.com/Gabiita)
* **Pablo Trujillo** - *Codificaci贸n, Investigaci贸n, Documentaci贸n* - [EzqTrujillo55](https://github.com/EzqTrujillo55)
* **Danny Gua帽una** - *Codificaci贸n, Investigaci贸n, Documentaci贸n* - [DannyGua](https://github.com/Dannygua/EjerciciosAS)
* **Wester Mendoza** - *Codificaci贸n, Investigaci贸n, Documentaci贸n* - [JoelMendoza1](https://github.com/JoelMendoza1)
