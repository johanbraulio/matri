# Johan & Marylia · Invitación de boda

Invitación estática en Astro, Tailwind CSS y TypeScript. Fecha: **10 de octubre de 2026**, ceremonia a las **13:00 h de Perú** en Santa Lucía, Lampa, Puno; recepción a las **17:00 h** en Juliaca.

## Desarrollo

Requiere Node.js 24. Instalar las versiones del lockfile:

```sh
npm ci
npm run dev
```

La terminal indica la URL local (normalmente `http://127.0.0.1:4321`). En Astro 7 el servidor puede ejecutarse en segundo plano: `npx astro dev status`, `npx astro dev logs` y `npx astro dev stop` permiten administrarlo.

```sh
npm run build
npm test
npm run preview
```

`build` ejecuta la comprobación de tipos y genera `dist/`, sin servidor ni base de datos. `test` verifica la cuenta regresiva y el cambio de día en la zona horaria de Perú.

## Personalizar contenido

Todo el contenido pendiente se configura en `src/data/wedding.ts`:

- `hero`, `story` y `closing`: fotografía independiente para portada, historia y cierre. Actualmente importan material de `images_test/`. Reemplazar por imágenes reales importadas, por ejemplo desde `src/assets/`.
- `testPhotos`: mantener `true` mientras se utilicen fotos de prueba; cambiar a `false` al incorporar las fotos de los novios y actualizar sus textos alternativos y pies de foto.
- `memories`: agregar 3–5 objetos `{ date, title, description }` con hechos reales. Mientras esté vacío, la sección muestra un mensaje de próxima publicación.
- `photos`: agregar 6–12 objetos `{ image, alt, caption }`. `image` debe ser una imagen importada. La galería se activa automáticamente y permite ampliar fotos, recorrerlas con flechas o deslizar en móvil, cerrar con Escape y volver al botón original.
- `events`: completar `venue`, `address` y `mapsUrl` de cada evento. Mantener `null` hasta confirmar; no se muestran enlaces de mapas que puedan conducir al lugar equivocado.
- `music`: opcional, `{ src: '/music/cancion.mp3', title: 'Título' }`. Colocar el archivo autorizado en `public/music/`. El control aparece solo al configurar una canción, nunca reproduce automáticamente.
- `motionEnabled`: `true` tras la aprobación del diseño. Activa la entrada de portada y la aparición al desplazar; respeta `prefers-reduced-motion`, incluso si la preferencia cambia con la página abierta.

Ejemplo para agregar fotos:

```ts
import recuerdo from '../assets/recuerdo.jpg';
// En wedding.photos:
photos: [{ image: recuerdo, alt: 'Descripción real de la fotografía', caption: 'Nuestro recuerdo' }],
```

Las cinco fotos actuales fueron proporcionadas exclusivamente para pruebas y no representan a Johan y Marylia. La imagen botánica original se conserva en `src/assets/`, pero ya no se muestra. La paleta y la composición aprobadas se mantienen independientes de estas fotografías.

`Photo.astro` acepta imágenes importadas en formatos compatibles con Astro (por ejemplo JPG/JPEG, PNG, WebP y AVIF) y calcula sus variantes según las dimensiones originales, sin ampliar los archivos generados. Las miniaturas y fondos usan recorte centrado con `object-fit: cover`; la vista ampliada muestra la fotografía completa con `contain`. Las imágenes definitivas pueden tener otras proporciones y tamaños; el recorte visible dependerá del marco y la nitidez de la resolución disponible.

## Dirección visual

Ver `docs/direccion-visual.md`: paleta, tipografías, moodboard de materiales, composición y contenido pendiente. Fuentes alojadas localmente mediante Fontsource; las imágenes se generan en AVIF y WebP, con tamaños responsivos y carga diferida salvo la portada.

## Verificación en navegador

`scripts/qa.mjs` utiliza Playwright. Con Playwright instalado en el entorno:

```sh
node scripts/qa.mjs
```

Puede indicarse su ruta mediante `PLAYWRIGHT_PACKAGE` y la URL mediante `QA_URL`. El navegador Chromium debe estar instalado para Playwright. La comprobación recorre 360, 390, 430, 768, 1024 y 1440 px; comprueba imágenes, desbordamientos, teclado, texto ampliado, movimiento reducido, funcionamiento sin JavaScript y estados de fecha. La galería se prueba con un fixture aislado que importa el módulo real; no agrega fotos ficticias al sitio. Genera capturas y un informe en `artifacts/` (excluido de Git).

## Publicar en GitHub Pages

El flujo `.github/workflows/deploy.yml` compila y publica automáticamente los pushes a `main`. Antes del primer despliegue, abrir `https://github.com/johanbraulio/matri/settings/pages` y seleccionar **GitHub Actions** en **Build and deployment → Source**.

Subir el workflow y los cambios de configuración. Seguir la ejecución en la pestaña **Actions**. Una vez completada correctamente, la invitación estará en `https://johanbraulio.github.io/matri/`.

La variable `GITHUB_PAGES=true` activa la ruta `/matri/` exclusivamente para este despliegue. El desarrollo local y las compilaciones normales conservan `/`. Para exportar un HTML autónomo ejecutar primero `npm run build` sin esa variable y después `node scripts/export-html.mjs`.

## Alternativa: publicar en Cloudflare Pages desde GitHub

1. Crear o elegir el repositorio de GitHub y subir este proyecto con `package-lock.json`, sin `node_modules/`, `.astro/` ni `dist/`.
2. En Cloudflare Pages, conectar ese repositorio y seleccionar la rama de producción.
3. Configurar comando de compilación **`npm run build`**, directorio de salida **`dist`** y variable **`NODE_VERSION=24`**.
4. Revisar la vista previa de Cloudflare antes de distribuir el enlace. Los siguientes pushes a la rama configurada se despliegan automáticamente.

No requiere adaptador de servidor, Worker, secretos ni base de datos. Se conserva el hosting Cloudflare Pages propuesto en el plan. No se ha creado un repositorio remoto ni se ha publicado el sitio: faltan destino y contenido personal definitivo.

`noindex` y `robots.txt` reducen la indexación; no son autenticación. Cualquier persona que tenga un enlace público podrá acceder.

## Estado

- Dirección artística y prototipo responsive implementados en las ocho secciones.
- Cuenta regresiva funcional y galería con cinco fotografías de prueba; mapas y música preparados para los datos reales.
- Diseño aprobado y animaciones de entrada/scroll activadas.
- Pendientes: fotos, hitos personales, iglesia, local de recepción, direcciones, programa definitivo y canción opcional.
- Publicación, Core Web Vitals en hosting y prueba en teléfonos reales pendientes de la versión final.
