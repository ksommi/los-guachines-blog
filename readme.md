# Los Guachines - Página web

¡Bienvenidos al repositorio de Los Guachines!

## Sobre este proyecto

Este proyecto se basa en el template [Notion Blog](https://github.com/ijjk/notion-blog.git) disponible en la página de Vercel. Este template proporciona un proyecto base con estilos preestablecidos y la capacidad de postear páginas en un blog conectado a Notion.

### ¿Qué modificaciones se hicieron?

1. **Uso de la API de Notion:**  
   Aunque el template original utilizaba una configuración diferente para conectarse a Notion, analicé su implementación y consideré que era más compleja de lo necesario para mi gusto. Por eso, para las secciones agregadas, implementé mi propia solución utilizando la última versión de la API de Notion para generar todo el contenido nuevo.

2. **Nuevas funcionalidades:**
   - **Torneos y Tablas:** Información completa sobre los torneos en curso, clasificaciones, y resultados.
   - **Optimización:** Unifiqué datos de torneos y clubes en una sola sección para mejorar el rendimiento y reducir las llamadas a la API.

### ¿Por qué usar este template?

La idea inicial era algo mucho más simple: armar un blog para subir las "noticias" de la liga usando Notion como backend. Elegí este template porque me resolvía justo eso, y además venía con estilos predefinidos y listo para usar.  
Pero una vez que desplegué la página y la vi funcionando, me di cuenta de que se podía hacer mucho más. Así que el proyecto fue cambiando rumbo y creciendo: pasó de ser un simple blog a algo mucho más completo, con seguimiento de torneos, clubes y estadisticas.

## Tecnologías utilizadas

- **Next.js:** Framework base para la aplicación.
- **Notion API:** Para gestionar y sincronizar el contenido dinámico.
- **Vercel:** Plataforma de despliegue.

> **Aclaracion:** Este proyecto fue hecho principalmente como práctica y aprendizaje. El objetivo no es solo gestionar la liga, sino también explorar tecnologías como la API de Notion, Next.js y el despliegue en Vercel, aplicándolas a un caso concreto. Cualquier critica sera bien recibida.
