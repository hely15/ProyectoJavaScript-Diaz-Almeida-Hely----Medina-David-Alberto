# D&D Character Creator

## 📖 Descripción

D&D Character Creator es una aplicación web interactiva que permite a los usuarios crear, personalizar y gestionar personajes del universo de Dungeons & Dragons. Inspirada en el famoso juego de rol, esta plataforma permite definir características como raza, clase, estadísticas, equipo y habilidades para crear héroes personalizados.

## ✨ Características

- **Creación de personajes completos**: Nombre, raza, clase, género, estadísticas y más
- **Sistema de estadísticas**: Personaliza fuerza, destreza, constitución, inteligencia, sabiduría y carisma
- **Equipamiento**: Selección de armas, armaduras y accesorios
- **Habilidades**: Asigna habilidades especiales a tu personaje según su clase
- **Apariencia**: Define características físicas como color de pelo, ojos, altura y peso
- **Almacenamiento local**: Todos los personajes se guardan en el navegador para acceso rápido
- **Visualización de personajes**: Interfaz intuitiva para ver todos tus personajes creados
- **Edición y eliminación**: Gestiona tus personajes existentes

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Dungeons & Dragons 5e API
- LocalStorage para persistencia de datos

## 📁 Estructura del proyecto

```
/
├── css/                    # Hojas de estilo
├── storage/                # Imágenes y recursos
├── crearPersonaje.js       # Lógica de creación de personajes
├── estadisticas.js         # Gestión de estadísticas
├── html.js                 # Componentes HTML dinámicos
├── main.js                 # Script principal
├── mostrarPersonajes.js    # Visualización de personajes guardados
├── tabs.js                 # Navegación por pestañas
├── index.html              # Página principal
├── comoSeJuega.html        # Guía de juego
├── creaTuPersonaje.html    # Interfaz de creación
└── mostrarPersonajes.html  # Visualización de personajes
```

## 🚀 Instalación y uso

### Requisitos previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para acceder a la API de D&D)

### Instrucciones

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/hely15/ProyectoJavaScript-Diaz-Almeida-Hely----Medina-David-Alberto
   ```

2. Navega hasta la carpeta del proyecto:
   ```bash
   cd dnd-character-creator
   ```

3. Abre el archivo `index.html` en tu navegador o utiliza un servidor local:
   ```bash
   # Con Python
   python -m http.server
   # Con Node.js (requiere instalación de http-server)
   npx http-server
   ```

4. ¡Comienza a crear tus personajes de D&D!

## 🔄 Flujo de la aplicación

1. **Página de inicio**: Presenta la aplicación con acceso a la guía de juego
2. **Cómo se juega**: Información sobre las reglas básicas de D&D
3. **Crear personaje**: 
   - **Info**: Datos básicos del personaje (nombre, raza, clase, género)
   - **Estadísticas**: Asignación de puntos a las seis estadísticas principales
   - **Equipo**: Selección de arma, armadura y accesorios
   - **Habilidades**: Elección de poderes según la clase del personaje
   - **Apariencia**: Personalización de características físicas
4. **Ver personajes**: Lista de todos los personajes creados con opciones para ver detalles, editar o eliminar

## 📡 API utilizada

El proyecto hace uso de la API pública de Dungeons & Dragons 5e para obtener información sobre:

- Razas (humano, elfo, enano, etc.)
- Clases (guerrero, mago, ladrón, etc.)

En caso de que la API no esté disponible, el sistema cuenta con datos predeterminados para garantizar la funcionalidad.

### Endpoints principales

- `https://www.dnd5eapi.co/api/races` - Obtener lista de razas
- `https://www.dnd5eapi.co/api/classes` - Obtener lista de clases

## 💾 Almacenamiento de datos

La aplicación utiliza localStorage para guardar los personajes creados. Esto permite:

- Persistencia de datos entre sesiones
- No requiere inicio de sesión o base de datos externa
- Acceso rápido a la información

Las siguientes claves de localStorage son utilizadas:
- `dndCharacters`: Almacena el array de personajes creados
- `currentCharacter`: Guarda el personaje en proceso de creación
- `editCharacterId`: Identificador del personaje en edición

## 🖼️ Capturas de pantalla



## 🧪 Limitaciones conocidas

- Los datos se almacenan localmente en el navegador del usuario
- El límite de almacenamiento depende del navegador (generalmente 5-10MB)
- La información no se sincroniza entre dispositivos

## 🔮 Mejoras futuras

- Sincronización con cuenta de usuario
- Exportación de personajes en formato PDF
- Visualización avanzada con avatares personalizados
- Implementación de dados virtuales para jugar
- Modo campaña para gestionar grupos de personajes

## Drive Con mas Informacion de La Sustentacion 

https://drive.google.com/drive/folders/1SuImk4TrLm7kQ6QOcU4kRvBClRXR5t9v?usp=sharing
[https://drive.google.com/drive/folders/1SuImk4TrLm7kQ6QOcU4kRvBClRXR5t9v?usp=sharing]


## 📝 Contacto

Hely Santiago Diaz Almeida - David Alberto Medina [helydiaz65@gmail.com]

Link del proyecto: [https://github.com/hely15/ProyectoJavaScript-Diaz-Almeida-Hely----Medina-David-Alberto]
