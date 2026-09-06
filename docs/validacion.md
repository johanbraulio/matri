# Validación de la primera propuesta

Fecha: 5 de septiembre de 2026.

## Resultado

- `npm run build`: generación estática correcta, sin errores, advertencias ni sugerencias de TypeScript/Astro.
- `npm test`: 3 pruebas correctas (zona horaria, fin de cuenta regresiva, medianoche de Perú).
- Chromium automatizado: 360, 390, 430, 768, 1024 y 1440 px sin desbordamiento horizontal; fotografías cargadas y nombres visibles.
- Texto al 200% en móvil: sin desbordamiento horizontal.
- Navegación de secciones y enlace de salto mediante teclado: correctos.
- Fecha de boda y mensaje posterior: correctos.
- Preferencia de movimiento reducido: respetada.
- JavaScript deshabilitado: la información principal permanece visible y la cuenta regresiva tiene un texto alternativo.
- Galería con fixture aislado: apertura, navegación circular, Escape y restauración de foco correctos.
- Sin errores de JavaScript durante esas pruebas.
- Capturas de portada y página completa revisadas en 390 y 1440 px.

Las capturas y el informe reproducible están en `artifacts/`; no se incluyen en Git. La imagen principal utiliza AVIF (aproximadamente 33 kB en 1536 px) con alternativa WebP y fuentes locales. No se añaden bibliotecas de animación ni componentes hidratados de React.

## Pendiente antes de distribuir

1. Dirección visual aprobada el 5 de septiembre de 2026; animaciones activadas después de la aprobación.
2. Reemplazar la imagen decorativa por las fotografías reales y completar historia, sedes y programa.
3. Probar nuevamente galería y mapas con los contenidos definitivos; probar música si se configura.
4. Elegir repositorio GitHub y proyecto Cloudflare Pages para publicar.
5. Verificar Safari/iPhone, Android real y apertura desde WhatsApp; los tamaños simulados en Chromium no sustituyen teléfonos reales.
6. Medir Core Web Vitals en el alojamiento definitivo con las fotos finales.

La primera propuesta no está publicada en Internet. El servidor local permanece disponible para revisar el diseño.

## Actualización con fotografías de prueba

Se integraron las cinco imágenes de `images_test/`, con proporciones verticales y horizontales, sin modificar colores ni adaptar el diseño a su composición. Portada, historia y cierre tienen imágenes independientes; la galería incluye las cinco. La optimización usa las dimensiones originales y permite sustituir los archivos por otros formatos compatibles con Astro.

Nueva compilación: sin errores, advertencias ni sugerencias. Las pruebas de los seis anchos, texto al 200%, teclado y estados de fecha siguen pasando. También se verificaron las cinco fotos en el lightbox, visualización completa con `contain`, retorno del foco, animación de entrada, aparición al desplazar y desactivación inmediata por preferencia de movimiento reducido. Sin errores de JavaScript.
