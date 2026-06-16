/**
 * lastmod real por post de blog (fecha de actualización si existe, si no la de publicación).
 * Refleja lo definido en data/posts.ts → mantener sincronizado al editar fechas allí.
 */
const BLOG_LASTMOD = {
  'entendiendo-las-promesas-en-javascript': '2026-05-31',
  'como-usar-grid-y-flexbox-en-css': '2026-06-01',
  'como-mejorar-el-rendimiento-en-nextjs-con-imagenes-optimizadas': '2026-06-02',
  'configurando-un-servidor-Express-en-Node': '2026-06-03',
  'introduccion-a-los-hooks-de-react': '2026-06-04',
  'flujo-de-trabajo-con-git': '2026-06-05',
  'como-aprender-desarrollo-web': '2026-06-06',
  'introduccion-a-javascript': '2026-06-07',
  'introduccion-a-material-ui': '2026-06-08',
  'html-fundamento-desarrollo-web': '2026-06-09',
  'que-es-docker': '2026-06-10',
  'dominando-react-hooks-avanzados': '2026-06-11',
  'el-nuevo-paradigma-de-las-apps': '2026-06-12',
  'ia-y-programacion': '2026-06-13',
  'machine-learning-para-empresas': '2026-06-14',
  'nimbus-crm-saas-mi-nuevo-proyecto': '2026-06-15',
  'claude-ia-guia-prompts-profesionales': '2026-04-27',
  'pagina-web-para-tu-negocio-latinoamerica-2026': '2026-05-04',
  'precio-pagina-web-mexico-2026': '2026-05-08',
  'claude-ia-guia-prompts-marketing-seo-diseno-parte-2': '2026-05-13',
  'caliber3d-plataforma-impresion-3d-mexico': '2026-05-18',
  'nextjs-vs-wordpress-cual-elegir-negocio-2026': '2026-05-21',
  '5-errores-seo-negocio-como-arreglarlos': '2026-05-26',
  'claude-ia-guia-prompts-negocios-emprendedores-parte-3': '2026-06-08',
  'herramienta-analisis-seo-gratis-como-funciona': '2026-06-15',
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://ezequiel-orazi.online',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: '/presupuestos' },
    ],
  },
  exclude: ['/presupuestos'],
  transform: async (config, path) => {
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const date = BLOG_LASTMOD[slug];
      const lastmod = date ? new Date(date).toISOString() : new Date().toISOString();
      return { loc: path, changefreq: 'monthly', priority: 0.9, lastmod };
    }
    if (path.startsWith('/proyectos/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() };
    }
    if (path === '/') {
      return { loc: path, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
  },
};

module.exports = config;
