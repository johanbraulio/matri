# Estado actualizado — 15 de septiembre de 2026

- Portada: imagen botánica original.
- Historia: retrato `images/matri 8.jpeg`.
- Galería: cinco fotos de la pareja. El ramo y los anillos no están en ella.
- Cierre: `images/matri 4.jpg`.
- Ceremonia: Iglesia Inmaculada Concepción, Santa Lucía, 13:00; recepción: Salón de Eventos La Duquesa, Juliaca, 17:00. Los botones usan los enlaces confirmados por el usuario.
- Se retiraron los mensajes pendientes de historia y horarios.
- Música: `music/pista.mp3`, importada mediante Vite para respetar la ruta de GitHub Pages. Se intenta autoplay con volumen inicial de 40%; el control permite reproducir y pausar. Las restricciones del navegador pueden requerir pulsar Activar música.
- Imágenes originales intactas. Variantes de galería hasta 900 px, historia hasta 1200 px, portada/cierre y lightbox hasta 1600 px. AVIF/WebP. La reducción de resolución y compresión no es matemáticamente sin pérdida; se prioriza nitidez visual en los tamaños mostrados.
- HTML autónomo: `artifacts/Invitacion-Johan-y-Marylia.html`, incluye fotos, fuentes, scripts y audio. Aproximadamente 8,2 MB; se usa una versión WebP por imagen para evitar incorporar todas las variantes responsivas.
- Compilación correcta. Verificación offline en seis anchos, cinco fotos ampliables, navegación por teclado, reproducción/pausa y recuperación mediante botón ante un bloqueo simulado de autoplay.
- No se ha hecho commit, push ni despliegue de estas modificaciones.

Este documento reemplaza los estados provisionales anteriores de las fotos y la música.

## Edición con sobre — 16 de septiembre de 2026

- Foto `matri 9.jpg` actualizada en ambas versiones.
- Copia clásica conservada en `artifacts/versiones/Invitacion-Clasica-2026-09-15.html`, con sus fuentes en el ZIP de la misma carpeta.
- Variante independiente en `/sobre/`, con apertura animada, sello J&M, música al abrir y opción de abrir sin música. Incluye marcos, tarjetas de eventos y galería renovados.
- HTML autónomo nuevo: `artifacts/Invitacion-Johan-y-Marylia-Sobre.html`.
- Para regenerar: `npm run build` y `node scripts/export-html.mjs sobre/index.html Invitacion-Johan-y-Marylia-Sobre.html`.
- La versión congelada no se sobrescribe al compilar o exportar.
