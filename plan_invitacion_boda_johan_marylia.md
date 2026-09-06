# Plan de desarrollo — Invitación web de boda

## Johan & Marylia

**Fecha:** 10 de octubre de 2026  
**Matrimonio religioso:** Santa Lucía, Lampa, Puno — 13:00 h  
**Recepción:** Juliaca — 17:00 h  

---

## 1. Objetivo del proyecto

Desarrollar una invitación digital de boda moderna, elegante y completamente adaptable a dispositivos móviles, destinada principalmente a familiares y amigos cercanos de Johan y Marylia.

La web será una experiencia **one-page**, donde el invitado recorrerá toda la invitación mediante scroll.

La prioridad del proyecto será:

> **Diseño visual > experiencia de usuario > rendimiento > funcionalidad.**

El objetivo no es construir una aplicación web compleja, sino crear una invitación digital que genere una buena impresión desde el primer momento y que transmita una experiencia cálida, elegante y especial.

La web debe sentirse como una invitación de boda moderna y premium, cuidando especialmente:

- Fotografías protagonistas.
- Tipografías elegantes.
- Animaciones suaves.
- Transiciones discretas.
- Buena composición visual.
- Espacios amplios.
- Colores armoniosos.
- Navegación natural.
- Excelente experiencia en celular.
- Carga rápida incluso utilizando datos móviles.

La meta principal del proyecto debe ser que los invitados piensen:

> **“Qué bonita está la invitación.”**

---

# 2. Tecnologías

La arquitectura será completamente estática.

## Frontend

### Astro

Astro será el framework principal.

Se utilizará para:

- Estructura de la web.
- Componentes.
- Generación estática del sitio.
- Organización del proyecto.
- Optimización de imágenes y recursos.
- Mantener el JavaScript enviado al navegador al mínimo necesario.

---

## Estilos

### Tailwind CSS

Se utilizará para:

- Responsive design.
- Layouts.
- Espaciados.
- Tipografía.
- Colores.
- Efectos.
- Adaptación móvil.
- Estados interactivos.

Cuando sea necesario se complementará con CSS personalizado para elementos visuales específicos.

---

## Lenguaje

### TypeScript

Se utilizará principalmente para pequeñas interacciones como:

- Cuenta regresiva.
- Galería.
- Efectos de scroll.
- Música opcional.
- Interacciones con botones.
- Animaciones basadas en el navegador.

---

## Animaciones

Se priorizarán:

- CSS.
- Intersection Observer.
- APIs nativas del navegador.

Solo si realmente mejora la experiencia podrá incorporarse una librería ligera de animaciones.

La regla general será:

> **Las animaciones deben complementar el diseño, nunca competir con él.**

---

## Repositorio

### GitHub

GitHub será utilizado para:

- Control de versiones.
- Repositorio del proyecto.
- Historial de cambios.
- Integración automática con el hosting.

---

## Hosting

### Cloudflare Pages

Flujo de despliegue:

```text
Desarrollo local
      ↓
GitHub
      ↓
git push
      ↓
Cloudflare Pages
      ↓
Publicación automática
```

No se necesitará:

- PHP.
- Laravel.
- MySQL.
- PostgreSQL.
- Supabase.
- VPS.
- Docker.
- Backend.
- Servidor propio.

La invitación será una web completamente estática.

---

# 3. Diseño como prioridad principal

El diseño será la parte más importante del proyecto.

Antes de desarrollar componentes en Astro debe definirse una dirección visual clara.

No se debe comenzar directamente con el código.

Primero se debe decidir:

- Estilo general.
- Paleta de colores.
- Tipografías.
- Tratamiento de fotografías.
- Ornamentos.
- Diseño de botones.
- Transiciones.
- Estilo de iconografía.
- Ritmo visual de las secciones.
- Espaciados.
- Composición del Hero.

La web debe verse bien incluso sin animaciones.

Las animaciones se agregarán posteriormente como una capa adicional de experiencia.

---

# 4. Dirección artística

## Paleta de colores

La paleta debe ser reducida y coherente con la decoración y estética real de la boda.

Como referencia podría utilizarse una combinación de:

- Marfil.
- Crema.
- Beige.
- Champagne.
- Verde oliva suave.
- Dorado discreto.
- Negro suave.

No es obligatorio utilizar estos colores.

La paleta definitiva debe elegirse buscando una estética:

- Elegante.
- Romántica.
- Sobria.
- Atemporal.

Se debe evitar saturar la invitación con demasiados colores.

---

# 5. Tipografía

La tipografía tendrá un papel central en el diseño.

Se pueden manejar tres niveles.

## Fuente decorativa

Para:

- `Johan & Marylia`
- Frases cortas.
- Detalles románticos.

Puede utilizarse una tipografía manuscrita o caligráfica.

---

## Fuente elegante

Para:

- Títulos.
- Fechas.
- Nombres de secciones.

Preferiblemente una serif elegante.

---

## Fuente de lectura

Para:

- Textos descriptivos.
- Direcciones.
- Horarios.
- Información práctica.

Debe ser clara y fácil de leer.

Ejemplo conceptual:

```text
Johan & Marylia
      ↓
Tipografía manuscrita

Nuestra historia
      ↓
Serif elegante

Nos conocimos en...
      ↓
Sans serif limpia
```

Se debe evitar utilizar tipografías manuscritas en textos largos.

---

# 6. Mobile First

La web se diseñará principalmente para teléfonos móviles.

La mayoría de invitados probablemente recibirá el enlace mediante WhatsApp y lo abrirá desde el celular.

Por lo tanto:

> **La versión móvil será considerada la versión principal de la invitación.**

Después se adaptará a:

- Tablet.
- Laptop.
- Desktop.

Referencia visual:

```text
┌─────────────────────────┐
│                         │
│          FOTO           │
│                         │
│     Johan & Marylia     │
│                         │
│       Nos casamos       │
│                         │
│     10 · 10 · 2026      │
│                         │
│      Santa Lucía        │
│                         │
│            ↓            │
└─────────────────────────┘
```

La versión móvil no debe simplemente funcionar.

Debe sentirse diseñada específicamente para móvil.

---

# 7. Estructura general de la invitación

La invitación estará compuesta por:

1. Hero / Portada.
2. Bienvenida.
3. Nuestra historia.
4. Cuenta regresiva.
5. El gran día.
6. Itinerario.
7. Galería.
8. Cierre.

Se omiten intencionalmente:

- Código de vestimenta.
- RSVP.
- Lista o información de regalos.
- Preguntas frecuentes.
- Subida de fotografías de invitados.

La invitación será principalmente visual, emocional e informativa.

---

# 8. Hero / Portada

Será la sección más importante visualmente.

Debe ocupar aproximadamente toda la primera pantalla.

Contenido:

- Fotografía principal de Johan y Marylia.
- Nombres de los novios.
- Texto `Nos casamos`.
- Fecha.
- Lugar.
- Indicador para continuar haciendo scroll.

Ejemplo:

```text
         Johan
           &
        Marylia

      NOS CASAMOS

     10 · 10 · 2026

      Santa Lucía

           ↓
```

La fotografía debe integrarse con:

- Overlays.
- Gradientes.
- Tipografía.
- Espaciados.
- Elementos decorativos discretos.

## Entrada inicial

La secuencia puede ser:

```text
Fotografía
    ↓
Johan & Marylia
    ↓
Nos casamos
    ↓
10 · 10 · 2026
    ↓
Indicador de scroll
```

Las animaciones deben ser suaves y lentas.

---

# 9. Bienvenida

Esta sección tendrá un enfoque emocional.

Debe incluir un mensaje breve dirigido a familiares y amigos cercanos.

Ejemplo de intención:

> Hay momentos que se vuelven aún más especiales cuando podemos compartirlos con las personas que queremos.

Debe mantenerse la idea principal:

> **El mejor regalo será compartir este día con ustedes.**

Esta sección puede acompañarse con:

- Una fotografía.
- Una ilustración floral.
- Algún detalle ornamental.
- Mucho espacio en blanco.

No debe convertirse en un bloque largo de texto.

---

# 10. Nuestra historia

Esta sección contará brevemente la historia de Johan y Marylia.

Se recomienda utilizar entre **3 y 5 momentos importantes**.

Ejemplo:

```text
Nos conocimos
      ↓
Nuestra primera aventura
      ↓
Un momento especial
      ↓
Dijimos que sí
      ↓
10 de octubre de 2026
Nos casamos
```

Cada momento puede contener:

- Año o fecha.
- Título corto.
- Una frase.
- Fotografía opcional.

La presentación puede realizarse como:

- Timeline vertical.
- Fotografías alternadas.
- Composición editorial.

Las animaciones podrán hacer que los elementos aparezcan a medida que el usuario hace scroll.

---

# 11. Cuenta regresiva

Se incluirá una cuenta regresiva hasta el:

> **10 de octubre de 2026**

Formato sugerido:

```text
Faltan

  35        08        16        35

 DÍAS      HORAS     MINUTOS   SEGUNDOS
```

La cuenta regresiva podrá ubicarse:

- Después de Nuestra historia.
- Antes de El gran día.

Se implementará únicamente con TypeScript en el navegador.

---

# 12. El gran día

Esta sección contendrá la información práctica principal de la boda.

Debe mantener el mismo nivel de diseño que el resto de la invitación.

---

## Matrimonio religioso

**Fecha:** sábado 10 de octubre de 2026  
**Hora:** 13:00 h  
**Lugar:** Santa Lucía  
**Provincia:** Lampa  
**Departamento:** Puno  

Formato visual sugerido:

```text
MATRIMONIO RELIGIOSO

13:00 h

Santa Lucía
Lampa, Puno

[ Cómo llegar ]
```

El botón `Cómo llegar` podrá abrir Google Maps.

Cuando se tenga definida la iglesia o ubicación exacta se agregará la dirección correspondiente.

---

## Recepción

**Hora:** 17:00 h  
**Ciudad:** Juliaca, Puno  

Formato visual sugerido:

```text
RECEPCIÓN

17:00 h

Juliaca, Puno

[ Cómo llegar ]
```

Cuando se defina el local exacto se deberá agregar:

- Nombre del local.
- Dirección.
- Enlace de Google Maps.

---

## Diseño responsive

En desktop:

```text
┌──────────────────┐   ┌──────────────────┐
│    CEREMONIA     │   │    RECEPCIÓN     │
│      13:00       │   │      17:00       │
│   Santa Lucía    │   │     Juliaca      │
└──────────────────┘   └──────────────────┘
```

En móvil:

```text
Ceremonia
    ↓
Recepción
```

---

# 13. Itinerario

Se utilizará un timeline vertical.

Ejemplo inicial:

```text
      ⛪

    13:00 h
 Matrimonio religioso
   Santa Lucía
       │
       │
       ↓

  Traslado / fotografías
       │
       │
       ↓

     🥂

    17:00 h
    Recepción
     Juliaca
       │
       │
       ↓

      🍽️
      Cena
       │
       │
       ↓

      💃
   Celebración
```

Los horarios adicionales se ajustarán cuando se defina el programa final.

En el diseño final se recomienda utilizar iconografía elegante en lugar de emojis.

---

# 14. Galería

Será una de las secciones visualmente más importantes.

Se recomienda utilizar entre:

> **6 y 12 fotografías**

La galería puede utilizar:

- Masonry.
- Collage.
- Carrusel.
- Diseño editorial.
- Composiciones asimétricas.

Ejemplo:

```text
┌───────────────┬───────┐
│               │       │
│     FOTO      │ FOTO  │
│               │       │
├───────┬───────┴───────┤
│ FOTO  │               │
│       │     FOTO      │
└───────┴───────────────┘
```

Al pulsar una fotografía podrá abrirse:

- Lightbox.
- Vista ampliada.
- Galería navegable.

Las fotografías deberán optimizarse antes de publicarse.

Formatos preferidos:

- AVIF.
- WebP.

---

# 15. Cierre

La última sección debe cerrar la experiencia de forma emocional.

Se recomienda utilizar:

- Fotografía grande.
- Fondo de pantalla completa.
- Texto centrado.
- Poco contenido.

Ejemplo:

```text
Gracias por formar parte
de nuestra historia.

El mejor regalo será
compartir este día
con ustedes.

10 · 10 · 2026

Johan & Marylia
```

Debe sentirse como el cierre de una invitación física elegante.

---

# 16. Animaciones

Las animaciones deben ser elegantes y sutiles.

## Fade

```text
opacity: 0
    ↓
opacity: 1
```

---

## Slide suave

Los elementos pueden aparecer ligeramente desde abajo.

---

## Zoom lento

Especialmente para el Hero:

```text
scale(1)
    ↓
scale(1.05)
```

El efecto debe producirse lentamente.

---

## Scroll reveal

A medida que el usuario recorre la invitación:

```text
Texto
  ↓
Fotografía
  ↓
Timeline
  ↓
Galería
```

Los elementos pueden aparecer progresivamente.

---

## Parallax

Puede utilizarse de forma muy moderada en fotografías grandes.

No debe utilizarse si afecta:

- Rendimiento.
- Lectura.
- Experiencia móvil.

---

## Evitar

No utilizar:

- Rebotes.
- Animaciones muy rápidas.
- Efectos excesivos.
- Elementos que dificulten el scroll.
- Transiciones constantes.
- Efectos llamativos sin propósito.

---

# 17. Música

Puede dejarse preparada la posibilidad de incluir una canción significativa para Johan y Marylia.

No se recomienda reproducir música automáticamente.

Puede existir un pequeño botón flotante:

```text
♫
```

El invitado podrá decidir si desea activarla.

La música debe ser un complemento de la experiencia, no una obligación.

---

# 18. Responsive Design

Se deberá probar específicamente en:

- 360 px.
- 390 px.
- 430 px.
- 768 px.
- 1024 px.
- 1440 px o superior.

Prioridad:

```text
Móvil      ★★★★★
Tablet     ★★★★
Desktop    ★★★★
```

Se debe comprobar:

- Tamaño de textos.
- Altura del Hero.
- Espaciados.
- Fotografías.
- Botones.
- Animaciones.
- Galería.
- Timeline.
- Fluidez del scroll.

---

# 19. Rendimiento

Al tratarse de una web con muchas fotografías, el rendimiento debe cuidarse especialmente.

Se utilizará:

- AVIF.
- WebP.
- Lazy loading.
- Responsive images.
- Compresión de fotografías.
- Optimización de Astro.
- JavaScript mínimo.
- Fuentes optimizadas.
- Precarga únicamente de recursos críticos.

La primera pantalla debe cargar rápidamente incluso utilizando datos móviles.

---

# 20. Accesibilidad

Aunque el diseño sea la prioridad, la invitación debe mantener una buena accesibilidad.

Se deberá considerar:

- Contraste suficiente.
- Textos legibles.
- Tamaños mínimos adecuados.
- Botones fáciles de pulsar.
- Atributos `alt` en imágenes.
- Navegación mediante teclado.
- Estados de foco.
- `prefers-reduced-motion`.

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
    /* Reducir o eliminar animaciones */
}
```

Si el usuario tiene configurada una reducción de movimiento, la web deberá respetarla.

---

# 21. SEO y privacidad

No existe necesidad de posicionar la invitación en buscadores.

Por el contrario, es preferible que la invitación se distribuya únicamente mediante su enlace.

Se podrá utilizar:

```html
<meta name="robots" content="noindex, nofollow">
```

Esto ayuda a evitar que la invitación aparezca fácilmente en buscadores.

---

# 22. Arquitectura propuesta

```text
src/
│
├── components/
│   ├── Hero.astro
│   ├── Welcome.astro
│   ├── OurStory.astro
│   ├── Countdown.astro
│   ├── EventDetails.astro
│   ├── Timeline.astro
│   ├── Gallery.astro
│   ├── MusicControl.astro
│   └── Closing.astro
│
├── layouts/
│   └── MainLayout.astro
│
├── pages/
│   └── index.astro
│
├── styles/
│   └── global.css
│
└── scripts/
    ├── countdown.ts
    ├── animations.ts
    └── music.ts

public/
│
├── images/
│   ├── hero/
│   ├── story/
│   └── gallery/
│
├── icons/
└── music/
```

---

# 23. Fases del proyecto

## Fase 1 — Dirección artística

Esta será la fase más importante.

Antes de programar se deberá:

- Definir el estilo visual.
- Elegir paleta de colores.
- Elegir tipografías.
- Seleccionar fotografías.
- Definir tratamiento de imágenes.
- Establecer estilo de botones.
- Definir ornamentos.
- Determinar estilo de iconografía.
- Diseñar el Hero.
- Definir ritmo entre secciones.
- Crear un moodboard.

### Resultado esperado

Una dirección visual coherente que sirva de referencia para todo el desarrollo.

---

# 24. Fase 2 — Prototipo visual

Diseñar primero las secciones:

1. Hero.
2. Bienvenida.
3. Nuestra historia.
4. Cuenta regresiva.
5. El gran día.
6. Itinerario.
7. Galería.
8. Cierre.

En esta fase la prioridad será exclusivamente:

> **Composición + estética + experiencia móvil**

No se deben priorizar todavía animaciones ni detalles técnicos.

---

# 25. Fase 3 — Implementación con Astro

Convertir el diseño en componentes:

```astro
<Hero />
<Welcome />
<OurStory />
<Countdown />
<EventDetails />
<Timeline />
<Gallery />
<Closing />
```

El código deberá mantenerse:

- Simple.
- Legible.
- Modular.
- Fácil de modificar.

---

# 26. Fase 4 — Animaciones e interacciones

Una vez aprobado el diseño estático se agregarán:

- Entrada inicial.
- Scroll reveal.
- Transiciones.
- Cuenta regresiva.
- Galería ampliada.
- Música opcional.
- Microinteracciones.

Principio fundamental:

> **Primero debe verse excelente sin animaciones. Después se animará.**

---

# 27. Fase 5 — Optimización móvil

Se probará especialmente el flujo:

```text
WhatsApp
    ↓
Enlace
    ↓
Chrome / Safari
    ↓
Invitación
```

Se revisará:

- Primera impresión.
- Tiempo de carga.
- Legibilidad.
- Tamaño de elementos.
- Scroll.
- Fotografía del Hero.
- Timeline.
- Galería.
- Transiciones.

---

# 28. Fase 6 — Optimización final

Antes de publicar:

- Comprimir fotografías.
- Optimizar fuentes.
- Eliminar JavaScript innecesario.
- Verificar lazy loading.
- Revisar Core Web Vitals.
- Probar dispositivos reales.
- Revisar accesibilidad.
- Verificar enlaces de Google Maps.
- Comprobar fecha y horarios.

---

# 29. Fase 7 — Publicación

Flujo final:

```text
Repositorio GitHub
        ↓
Cloudflare Pages
        ↓
Deploy automático
```

Después podrá conectarse un dominio personalizado.

Ejemplos:

```text
johanymarylia.com
```

o

```text
johanymarlylia.com
```

o cualquier dominio disponible que se considere adecuado.

También se puede utilizar inicialmente el dominio gratuito proporcionado por Cloudflare Pages.

---

# 30. Orden de prioridad del proyecto

Durante todo el desarrollo se deberá respetar este orden:

```text
1. Diseño
       ↓
2. Experiencia móvil
       ↓
3. Fotografías
       ↓
4. Tipografía
       ↓
5. Animaciones
       ↓
6. Información
       ↓
7. Código
```

El código debe ser correcto y mantenible, pero no es el elemento que percibirá el invitado.

El valor principal estará en:

- La estética.
- La emoción.
- La composición.
- La experiencia.
- La calidad visual.

---

# 31. Experiencia final buscada

El recorrido ideal será:

```text
Fotografía impactante
        ↓
Johan & Marylia
        ↓
Nos casamos
        ↓
Mensaje emocional
        ↓
Nuestra historia
        ↓
Cuenta regresiva
        ↓
Matrimonio religioso
Santa Lucía — 13:00 h
        ↓
Recepción
Juliaca — 17:00 h
        ↓
Itinerario
        ↓
Galería
        ↓
Agradecimiento final
```

La invitación no debe sentirse como una aplicación web.

Debe sentirse como:

> **Una invitación de boda premium convertida en una experiencia digital.**

---

# 32. Datos confirmados

| Dato | Información |
|---|---|
| Novio | Johan |
| Novia | Marylia |
| Fecha | 10 de octubre de 2026 |
| Tipo de ceremonia | Matrimonio religioso |
| Lugar de ceremonia | Santa Lucía, Lampa, Puno |
| Hora de ceremonia | 13:00 h |
| Lugar de recepción | Juliaca, Puno |
| Hora de recepción | 17:00 h |
| Tipo de invitación | Web one-page |
| Público | Familia y amigos cercanos |
| RSVP | No |
| Dress code | No |
| Regalos | No se mostrará información; se mantendrá el mensaje de que su presencia es lo más importante |
| FAQ | No |
| Subida de fotos | No |
| Backend | No |
| Base de datos | No |
| Hosting propuesto | Cloudflare Pages |
| Repositorio | GitHub |
| Framework | Astro |
| CSS | Tailwind CSS |
| Lenguaje complementario | TypeScript |

---

## Información pendiente para completar más adelante

- Nombre exacto de la iglesia en Santa Lucía.
- Dirección o ubicación exacta de la ceremonia.
- Enlace de Google Maps de la ceremonia.
- Nombre del local de recepción en Juliaca.
- Dirección exacta de la recepción.
- Enlace de Google Maps de la recepción.
- Fotografías seleccionadas.
- Fechas y acontecimientos de la sección `Nuestra historia`.
- Paleta definitiva.
- Tipografías definitivas.
- Canción, si se decide utilizar música.
- Programa detallado para completar el itinerario.
