import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 md:mt-20">
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Sobre Nosotros</h3>
            <p className="text-sm">
              Somos tu mejor opción para encontrar el hogar de tus sueños. Con años de experiencia en el mercado inmobiliario.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal" className="hover:text-white transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contacto@ejemplo.com</li>
              <li>Teléfono: +34 900 000 000</li>
              <li>Dirección: Calle Ejemplo 123, 28000 Madrid</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-sm text-center">
          <p>&copy; {currentYear} Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;