# CarDetailing Pro - Sitio Web

## Estructura del Proyecto
El proyecto está organizado en las siguientes carpetas:
- `css/`: Contiene los estilos del sitio
- `js/`: Contiene los scripts de JavaScript
- `images/`: Debe contener las imágenes del sitio (incluyendo un `favicon.ico`)

## Dependencias Externas
Este sitio utiliza las siguientes bibliotecas externas cargadas a través de CDN:
- **Bootstrap 5.3.0 CSS & JS:** Para el framework de diseño y componentes.
- **Font Awesome 6.4.0 CSS:** Para los íconos.
Se requiere conexión a internet para que estos recursos se carguen correctamente.

## Imágenes Requeridas
Para el correcto funcionamiento del sitio, se necesitan las siguientes imágenes en la carpeta `images/`:

1.  **hero-bg.png**
    * Imagen de fondo para la sección hero
    * Tamaño recomendado: 1920x1080px
    * Debe mostrar un automóvil detallado con acabado brillante
2.  **gallery-bg.png**
    * Imagen de fondo para la sección de galería
    * Tamaño recomendado: 1920x1080px
    * Preferiblemente una imagen que muestre el proceso de detallado
3.  **Imágenes de trabajos (galería)**
    * trabajo1.png: Detallado completo exterior
    * trabajo2.png: Restauración de pintura
    * trabajo3.png: Limpieza de tapicería
    * trabajo4.png: Detallado de motor
    * trabajo5.png: Restauración de faros
    * trabajo6.png: Tratamiento cerámico
    * Tamaño recomendado para todas: 800x600px
4.  **favicon.ico** (Opcional pero recomendado)
    * Icono para la pestaña del navegador.

## Instrucciones de Implementación

1.  Crear la carpeta `images/` en la raíz del proyecto.
2.  Agregar las imágenes mencionadas anteriormente con los nombres especificados.
3.  Asegurarse de que las imágenes sean de alta calidad, estén optimizadas para la web (ej. comprimidas) y representen adecuadamente los servicios ofrecidos.
4.  Actualizar las URLs de placeholder en `index.html` (para Open Graph y Twitter Cards) con la URL real del sitio.
5.  Actualizar las URLs de redes sociales y el número de WhatsApp en `js/script.js` en el objeto `socials`.

## Características del Sitio

- Diseño parallax con scroll suave
- Navegación fija en la parte superior adaptable al scroll
- Secciones animadas con fade-in al hacer scroll
- Galería de trabajos realizados con zoom de imágenes accesible
- Formulario de contacto funcional (actualmente con feedback en el frontend, requiere backend para envío real)
- Diseño completamente responsive
- Mejoras de accesibilidad (ARIA, manejo de foco, etiquetas para formularios)

## Posibles Mejoras Futuras
- Implementación de un backend para el formulario de contacto.
- Optimización avanzada de rendimiento (ej. debounce/throttle para eventos de scroll).
- Pruebas de compatibilidad en más navegadores y dispositivos.
- Implementación de un sistema de carga de imágenes más robusto o un CDN para imágenes.
- Auditoría completa de accesibilidad con herramientas especializadas.
- Uso de fuentes web locales para mejorar rendimiento y evitar dependencias externas (si se usan fuentes específicas).
