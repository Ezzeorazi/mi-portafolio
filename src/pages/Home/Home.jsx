import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.home}>
      <header className={styles.main}>
        <h1>Desarrollador Fullstack – Soluciones Web a Medida</h1>
        <div className={styles.imageContainer}>
          <img
            src="/image-perfil.jpeg"
            alt="Retrato de Ezequiel Orazi"
            className={styles.image}
          />
        </div>
      </header>

      <section id="servicios">
        <h2>Servicios</h2>
        <h3>Desarrollo y mantenimiento</h3>
        <p>
          Desarrollo plataformas a medida que reflejan la identidad de cada cliente. Como <strong>desarrollador web</strong> combino código limpio con estrategias SEO para que los proyectos crezcan desde el primer día. Ofrezco integración de APIs, paneles de administración amigables y optimización de carga para que cada visitante disfrute una experiencia fluida. Trabajo con frameworks modernos y metodologías ágiles para garantizar resultados medibles.
        </p>
        <h3>Optimización y consultoría</h3>
        <p>
          Mis <strong>soluciones digitales</strong> incluyen tiendas en línea, blogs profesionales y aplicaciones internas que ayudan a automatizar tareas repetitivas. Me ocupo del diseño adaptable, seguridad y mantenimiento continuo, brindando acompañamiento para que tu negocio se enfoque en lo importante. Además, asesoro en buenas prácticas de contenido y analítica para que cada mejora se traduzca en más visitas y conversiones. Cada entrega busca ser escalable y lista para nuevas funcionalidades.
        </p>
      </section>

      <section id="portafolio">
        <h2>Portafolio</h2>
        <h3>Proyectos recientes</h3>
        <img src="/pagePortafolio.jpg" alt="Proyectos recientes de sitios web desarrollados" width="600" height="400" />
        <p>
          Aquí muestro algunos <strong>sitios web</strong> y herramientas creadas para emprendedores y pymes. Cada trabajo fue diseñado con atención a la accesibilidad y la usabilidad, logrando interfaces claras y escalables. La imagen resume el estilo de mis proyectos más recientes, donde priorizo rendimiento y contenido de valor para aportar confianza desde el primer vistazo. Si querés ver más casos, no dudes en escribirme y te compartiré detalles técnicos.
        </p>
      </section>

      <section id="sobre-mi">
        <h2>Sobre mí</h2>
        <h3>Experiencia</h3>
        <p>
          Soy Ezequiel Orazi, programador de Rosario que disfruta transformar ideas en código. Como <strong>desarrollador web</strong> fullstack, valoro la comunicación constante para entregar productos que realmente resuelvan problemas. Me apasiona aprender nuevas tecnologías y compartir conocimientos en la comunidad, porque el intercambio nos ayuda a crecer.
        </p>
        <p>
          Trabajo con React, Node y bases de datos modernas, manteniendo un enfoque práctico. Busco herramientas que impulsen la productividad y permitan a mis clientes crecer en el mundo digital sin perder de vista la calidad del código y el diseño.
        </p>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <h3>Hablemos</h3>
        <p>
          Si querés conversar sobre tu próximo proyecto o necesitas una revisión de tu plataforma actual, podés escribirme y responderé a la brevedad. Estoy abierto a propuestas freelance y colaboraciones con equipos que busquen crear <strong>soluciones digitales</strong> de impacto.
        </p>
        <p>
          Seguime en <a href="https://www.linkedin.com/in/ezequiel-orazi32/" target="_blank" rel="noopener noreferrer">LinkedIn</a> o explorá mi código en <a href="https://github.com/EzzeOrazi" target="_blank" rel="noopener noreferrer">GitHub</a> para conocer más de mi trabajo.
        </p>
      </section>
    </main>
  );
};

export default Home;
