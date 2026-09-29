'use client';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

const experiencesEs = [
  {
    id: 1,
    company: 'Caliber 3d Printing',
    role: 'Técnico de impresión 3D, diseñador y desarrollador web',
    startDate: 'Enero 2025',
    endDateKey: 'exp_present',
    description:
      'Emprendimiento propio de impresión 3D en Playa del Carmen. Desarrollé la plataforma caliber3d.mx (Next.js, TypeScript, Supabase y Strapi) con catálogo y formulario de presupuesto, posicionada en Google para "impresión 3D Riviera Maya". Además: diseño de modelos, soporte técnico de impresión y contenido para redes sociales.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Strapi', 'SEO', 'Impresión 3D'],
  },
  {
    id: 2,
    company: 'Pixel Maker',
    role: 'Desarrollador de sitios web',
    startDate: 'Septiembre 2023',
    endDateKey: 'exp_present',
    description:
      'Gestión y ejecución de proyectos web end-to-end para clientes de la agencia, desde la conceptualización hasta el despliegue. Sitios institucionales y tiendas con Next.js, React y WordPress, diseño optimizado para SEO y administración de hosting y dominios. Desarrollé también el sitio de la agencia (pixelmaker.com.ar) con Next.js y Supabase.',
    technologies: ['Next.js', 'React', 'JavaScript', 'WordPress', 'SEO'],
  },
  {
    id: 3,
    company: 'Bolsa de Comercio de Rosario',
    role: 'Auxiliar administrativo y control de accesos',
    startDate: 'Noviembre 2024',
    endDate: 'Noviembre 2025',
    description:
      'Trabajo complementario mientras consolidaba Caliber 3D y mis proyectos web freelance. Confección de credenciales de acceso, captura y actualización de bases de datos de control de accesos, validación de pólizas y padrón de proveedores, y resguardo de documentación confidencial.',
    technologies: ['Control de accesos', 'Gestión documental', 'Excel'],
  },
  {
    id: 4,
    company: 'Desafío Latam',
    role: 'Desarrollador Front-end',
    startDate: 'Mayo 2023',
    endDate: 'Julio 2024',
    description:
      'Desarrollo de la interfaz de usuario de devsafio.com con Next.js y Tailwind CSS. Mejora de interactividad en el proyecto SQL Interactivo con JavaScript avanzado. Colaboración en equipo usando Figma, Jira y Discord.',
    technologies: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Jira'],
  },
  {
    id: 5,
    company: 'Pinturerías del Centro',
    role: 'Encargado administrativo y atención al cliente',
    startDate: 'Octubre 2020',
    endDate: 'Septiembre 2023',
    description:
      'Comercio de pinturas, materiales de construcción y acabados. Control de stock y conciliación de existencias, presupuestos y cotizaciones, facturación y control de pagos a proveedores, y coordinación del personal del local. Llevé además la tienda online sobre VTEX y el sitio en WordPress, aplicando SEO para aumentar el tráfico.',
    technologies: ['VTEX', 'WordPress', 'SEO', 'Excel', 'Meridiano Soft'],
  },
  {
    id: 6,
    company: 'Leiten Argentina',
    role: 'Administración de materiales y coordinación en obra',
    startDate: 'Mayo 2015',
    endDate: 'Septiembre 2020',
    description:
      'Administración y control de inventario de materiales, repuestos y equipos para maquinaria de construcción: requisiciones, entradas y salidas. Elaboración de presupuestos, conciliación con proveedores y facturación. Asignación y traslado de operarios y maquinaria a obra, y capacitación en uso seguro de equipos.',
    technologies: ['Tango Gestión', 'Excel', 'Control de inventario', 'PLC'],
  },
];

const experiencesEn = [
  {
    id: 1,
    company: 'Caliber 3d Printing',
    role: '3D Printing Technician, Designer and Web Developer',
    startDate: 'January 2025',
    endDateKey: 'exp_present',
    description:
      'My own 3D printing venture in Playa del Carmen. I built the caliber3d.mx platform (Next.js, TypeScript, Supabase and Strapi) with a catalog and quote form, ranking on Google for "3D printing Riviera Maya". Also: model design, printing technical support and social media content.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Strapi', 'SEO', '3D Printing'],
  },
  {
    id: 2,
    company: 'Pixel Maker',
    role: 'Web Developer',
    startDate: 'September 2023',
    endDateKey: 'exp_present',
    description:
      'End-to-end web project management and execution for agency clients, from concept to deployment. Business websites and stores with Next.js, React and WordPress, SEO-optimized design, hosting and domain administration. I also built the agency site (pixelmaker.com.ar) with Next.js and Supabase.',
    technologies: ['Next.js', 'React', 'JavaScript', 'WordPress', 'SEO'],
  },
  {
    id: 3,
    company: 'Bolsa de Comercio de Rosario',
    role: 'Administrative Assistant and Access Control',
    startDate: 'November 2024',
    endDate: 'November 2025',
    description:
      'Side job while consolidating Caliber 3D and my freelance web projects. Access credential issuing, data entry and upkeep of access-control databases, insurance policy and supplier registry validation, and safekeeping of confidential documentation.',
    technologies: ['Access Control', 'Document Management', 'Excel'],
  },
  {
    id: 4,
    company: 'Desafío Latam',
    role: 'Front-end Developer',
    startDate: 'May 2023',
    endDate: 'July 2024',
    description:
      'Development of the devsafio.com user interface with Next.js and Tailwind CSS. Improving interactivity in the Interactive SQL project with advanced JavaScript. Team collaboration using Figma, Jira and Discord.',
    technologies: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Jira'],
  },
  {
    id: 5,
    company: 'Pinturerías del Centro',
    role: 'Administrative Supervisor and Customer Service',
    startDate: 'October 2020',
    endDate: 'September 2023',
    description:
      'Paint, construction materials and finishes retailer. Stock control and inventory reconciliation, quotes and budgets, invoicing and supplier payment control, and store staff coordination. I also ran the online store on VTEX and the WordPress site, applying SEO to grow traffic.',
    technologies: ['VTEX', 'WordPress', 'SEO', 'Excel', 'Meridiano Soft'],
  },
  {
    id: 6,
    company: 'Leiten Argentina',
    role: 'Materials Administration and Site Coordination',
    startDate: 'May 2015',
    endDate: 'September 2020',
    description:
      'Administration and inventory control of materials, spare parts and equipment for construction machinery: requisitions, stock in and out. Budgeting, supplier reconciliation and invoicing. Assignment and transport of workers and machinery to sites, and training on safe equipment use.',
    technologies: ['Tango Gestión', 'Excel', 'Control de inventario', 'PLC'],
  },
];

export default function Experience() {
  const { t, language } = useTranslation();
  const experiences = language === 'es' ? experiencesEs : experiencesEn;

  return (
    <div>
      <ScrollReveal direction="left">
        <h2 className="text-2xl font-bold text-dark mb-8">{t('exp_heading')}</h2>
      </ScrollReveal>
      <div className="flex flex-col gap-6">
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.id} direction="flip" delay={i * 0.08}>
            <div className="bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300">
              <h3 className="text-yellow font-bold text-lg">
                {exp.role} — {exp.company}
              </h3>
              <p className="text-light/60 text-sm mt-1">
                {exp.startDate} — {(exp as { endDate?: string }).endDate ?? t('exp_present')}
              </p>
              <p className="text-light/80 text-sm mt-3 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-yellow/10 text-yellow border border-yellow/20 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
