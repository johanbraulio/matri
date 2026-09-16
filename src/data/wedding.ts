import walking from '../../images/matri 9.jpg';
import toast from '../../images/matri 2.jpeg';
import hats from '../../images/matri 3.jpeg';
import rings from '../../images/matri 4.jpg';
import botanical from '../assets/botanical.png';
import soundtrack from '../../music/pista-web.mp3?url';
import garden from '../../images/matri 5.jpeg';
import portrait from '../../images/matri 8.jpeg';
import type { ImageMetadata } from 'astro';

export interface Memory {
  date: string;
  title: string;
  description: string;
}
export interface Photograph {
  image: ImageMetadata;
  alt: string;
  caption: string;
  position?: string;
}
export interface WeddingEvent {
  title: string;
  time: string;
  city: string;
  region: string;
  venue: string | null;
  address: string | null;
  mapsUrl: string | null;
  icon: 'church' | 'glasses';
}

const ceremonyTime = '13:00';
const receptionTime = '17:00';
// Única fuente de contenido. Mantener null hasta confirmar los datos.
export const wedding = {
  names: ['Johan', 'Marylia'],
  date: `2026-10-10T${ceremonyTime}:00-05:00`,
  dateLabel: 'Sábado 10 de octubre de 2026',
  // Fotografías definitivas aportadas por Johan y Marylia.
  hero: { image: botanical, alt: 'Rosas marfil y ramas de olivo sobre seda' },
  story: { image: portrait, alt: 'Johan y Marylia juntos, con un ramo de flores' },
  closing: { image: rings, alt: 'Sus anillos y ramo de flores junto al lago' },
  testPhotos: false,
  // Diseño aprobado el 5 de septiembre de 2026.
  motionEnabled: true,
  music: { src: soundtrack, title: 'Nuestra canción' } as { src: string; title: string } | null,
  memories: [] as Memory[],
  photos: [
    { image: walking, alt: 'Johan y Marylia caminando juntos a la orilla del lago', caption: 'De tu mano' },
    { image: toast, alt: 'Johan y Marylia brindando frente al lago', caption: 'Por una vida juntos' },
    { image: hats, alt: 'Johan y Marylia con sombreros y lentes de sol entre las rocas', caption: 'La alegría de encontrarnos', position: 'center 15%' },
    { image: garden, alt: 'Johan sosteniendo a Marylia bajo un arco de vegetación', caption: 'Contigo, siempre' },
    { image: portrait, alt: 'Johan y Marylia sonriendo juntos con su ramo', caption: 'Nuestro lugar favorito', position: 'center 15%' },
  ] as Photograph[],
  events: [
    { title: 'Matrimonio religioso', time: ceremonyTime, city: 'Santa Lucía', region: 'Lampa, Puno', venue: 'Iglesia Inmaculada Concepción', address: null, mapsUrl: 'https://maps.app.goo.gl/hJcShWK1Vh9YRGgM6', icon: 'church' },
    { title: 'La recepción', time: receptionTime, city: 'Juliaca', region: 'Puno', venue: 'Salón de Eventos La Duquesa', address: null, mapsUrl: 'https://maps.app.goo.gl/WNpThYArYK4pNncp9', icon: 'glasses' },
  ] satisfies WeddingEvent[],
};
