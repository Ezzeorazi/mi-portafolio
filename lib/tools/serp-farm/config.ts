/**
 * Configuración del módulo "Detector de granjas de contenido".
 *
 * Todo lo que define visibilidad y comportamiento de la herramienta vive acá, en un
 * solo lugar. Para hacerla pública: poner TOOL_IS_PUBLIC en true, quitar el noindex de
 * la page (ver comentario ahí), sacarla del exclude del sitemap y sumar el link al nav.
 */

/** Ruta de la herramienta. Es probable que se renombre; definida en un solo lugar. */
export const TOOL_ROUTE = '/detector-de-bots';

/** Endpoint de la API que encola el análisis. */
export const TOOL_API_ENDPOINT = '/api/tools/serp-farm/analyze';

/**
 * Flag maestro de visibilidad. En `false` la herramienta está oculta (noindex, fuera
 * del sitemap, sin link en el nav) pero funcional por URL directa. Cambiar a `true`
 * cuando se decida hacerla pública.
 */
export const TOOL_IS_PUBLIC = false;

/** Regiones soportadas (mapean a las de DuckDuckGo/ddgs en el worker). */
export const SERP_REGIONS = [
  { value: 'mx-es', label: 'México' },
  { value: 'ar-es', label: 'Argentina' },
  { value: 'wt-wt', label: 'Global' },
] as const;

export type SerpRegion = (typeof SERP_REGIONS)[number]['value'];

export const DEFAULT_REGION: SerpRegion = 'mx-es';

export const VALID_REGIONS: readonly string[] = SERP_REGIONS.map((r) => r.value);

/** Rate-limit: máximo de análisis por email y por IP en 24 h. Es gratis y será abusado. */
export const MAX_ANALYSES_PER_DAY = 3;

/** Límites de validación del keyword. */
export const KEYWORD_MIN_LENGTH = 2;
export const KEYWORD_MAX_LENGTH = 120;

/**
 * Repo de GitHub donde vive el worker. La API dispara su workflow (repository_dispatch)
 * al encolar un job, para que se procese al instante en vez de esperar al cron.
 */
export const GITHUB_REPO = 'Ezzeorazi/mi-portafolio';
/** Tipo de evento que escucha el workflow serp-farm-worker.yml. */
export const GITHUB_DISPATCH_EVENT = 'serp-farm-job';
