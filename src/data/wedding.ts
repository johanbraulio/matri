import test1 from '../../images_test/imgtest1.jpeg';
import test2 from '../../images_test/imgtest2.jpeg';
import test3 from '../../images_test/imgtest3.jpeg';
import test4 from '../../images_test/imgtest4.jpeg';
import test5 from '../../images_test/imgtest5.jpeg';
import botanical from '../assets/botanical.png';
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

// Única fuente de contenido. Mantener null hasta confirmar los datos.
export const wedding = {
  names: ['Johan', 'Marylia'],
  date: '2026-10-10T13:00:00-05:00',
  dateLabel: 'Sábado 10 de octubre de 2026',
  // Material de prueba aportado por el usuario; no representa a los novios.
  hero: { image: botanical, alt: 'Rosas marfil y ramas de olivo sobre seda, imagen decorativa provisional' },
  story: { image: test2, alt: 'Fotografía de prueba: una pareja abrazada al atardecer' },
  closing: { image: test5, alt: 'Fotografía de prueba: ramo en la playa con una pareja al fondo' },
  testPhotos: true,
  // Diseño aprobado el 5 de septiembre de 2026.
  motionEnabled: true,
  music: null as { src: string; title: string } | null,
  memories: [] as Memory[],
  photos: [
    { image: test1, alt: 'Fotografía de prueba: pareja de la mano frente al mar', caption: 'Fotografía de prueba · 01' },
    { image: test2, alt: 'Fotografía de prueba: abrazo al atardecer en la playa', caption: 'Fotografía de prueba · 02' },
    { image: test3, alt: 'Fotografía de prueba: pareja caminando junto a las olas', caption: 'Fotografía de prueba · 03' },
    { image: test4, alt: 'Fotografía de prueba: propuesta de matrimonio en la playa', caption: 'Fotografía de prueba · 04' },
    { image: test5, alt: 'Fotografía de prueba: ramo de flores con una pareja al fondo', caption: 'Fotografía de prueba · 05' },
  ] as Photograph[],
  events: [
    { title: 'Matrimonio religioso', time: '13:00', city: 'Santa Lucía', region: 'Lampa, Puno', venue: null, address: null, mapsUrl: null, icon: 'church' },
    { title: 'La recepción', time: '17:00', city: 'Juliaca', region: 'Puno', venue: null, address: null, mapsUrl: null, icon: 'glasses' },
  ] satisfies WeddingEvent[],
};
