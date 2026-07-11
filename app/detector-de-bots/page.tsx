import type { Metadata } from 'next';
import SerpFarmTool from '@/components/SerpFarmTool';
import { TOOL_IS_PUBLIC } from '@/lib/tools/serp-farm/config';

// Herramienta oculta pero funcional: accesible solo por URL directa.
// Para hacerla pública: poner TOOL_IS_PUBLIC en true (quita el noindex de abajo),
// sacar la ruta del exclude en next-sitemap.config.js y sumar el link al nav.
export const metadata: Metadata = {
  title: 'Detector de granjas de contenido',
  description:
    'Analiza los resultados de búsqueda de un keyword y estima qué porcentaje son sitios de baja calidad o coordinados.',
  robots: TOOL_IS_PUBLIC ? undefined : { index: false, follow: false },
};

export default function DetectorDeBotsPage() {
  return <SerpFarmTool />;
}
