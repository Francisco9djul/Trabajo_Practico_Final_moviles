Trabajo_Practico_Final_moviles

Aplicación móvil desarrollada en React Native con Expo. Basado en los archivos proporcionados, el proyecto parece ser una aplicación de juego tipo Wordle con gestión de usuarios y un sistema de ranking, además de incluir funcionalidades de gestión de tareas.
Funcionalidades principales

    Gestión de Usuarios: Permite a los usuarios iniciar sesión y crear nuevas cuentas.

    Juego: Incluye una pantalla de juego (Gamescreen), sugiriendo una experiencia interactiva (posiblemente un juego de palabras como Wordle).

    Reglas del Juego: Una sección dedicada a explicar las reglas del juego (ReglasScreen).

    Ranking: Muestra una lista de los mejores jugadores o puntuaciones (RankingScreen).


Instalación y ejecución

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

    Clonar el repositorio:

    git clone https://github.com/Francisco9djul/Trabajo_Practico_Final_moviles.git
    cd Trabajo_Practico_Final_moviles

    Instalar dependencias:

    npm install

    Ejecutar la app:

    npx expo start

    Esto iniciará el servidor de desarrollo de Expo. Podrás escanear el código QR con la aplicación Expo Go en tu dispositivo móvil o usar un emulador/simulador para ver la aplicación en acción.

Requisitos previos

Asegúrate de tener lo siguiente instalado en tu sistema:

    Node.js (recomendado: v18 o superior)

    Expo Go app instalada en tu dispositivo móvil (disponible en App Store y Google Play Store).

## Variables de entorno

Para que la aplicación funcione correctamente, necesitás crear un archivo `.env` en la raíz del proyecto con las variables necesarias.

1. Copiá el archivo `.env.example` y renombralo a `.env`.

2. Cargale las credenciales de Firebase que se te proporcionaron por separado

3. Una vez configurado el archivo .env, podés iniciar la app con:
`npx expo start`