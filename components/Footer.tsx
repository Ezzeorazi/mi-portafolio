import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-2xl">
          <a
            href="https://github.com/Ezzeorazi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-yellow hover:text-pink transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/ezze.o/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-yellow hover:text-pink transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/ezequiel-orazi32/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-yellow hover:text-pink transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="text-sm text-light/70">
          &copy; {year} Ezequiel Orazi. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
