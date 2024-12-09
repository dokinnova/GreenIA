const Legal = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Aviso Legal</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Información Legal</h2>
        <p className="mb-4">
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, le informamos que:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>La empresa titular de esta web es [Nombre de la Empresa]</li>
          <li>CIF: [Número de CIF]</li>
          <li>Domicilio social: [Dirección completa]</li>
          <li>Email de contacto: [email]</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Condiciones de Uso</h2>
        <p className="mb-4">
          El acceso y uso de esta página web está sujeto a las presentes condiciones de uso y a la legislación aplicable. Al acceder y utilizar esta web, usted acepta las presentes condiciones en su totalidad.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Propiedad Intelectual</h2>
        <p className="mb-4">
          Todos los contenidos de esta web (textos, fotografías, gráficos, imágenes, tecnología, software, links, contenidos audiovisuales o sonoros, diseño gráfico, código fuente, etc.) son propiedad intelectual de la empresa o de terceros.
        </p>
      </div>
    </div>
  );
};

export default Legal;