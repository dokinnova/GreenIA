const Privacy = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Responsable del Tratamiento</h2>
        <p className="mb-4">
          [Nombre de la Empresa] es el responsable del tratamiento de los datos personales que nos facilite a través de esta web.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Finalidad del Tratamiento</h2>
        <p className="mb-4">
          Tratamos sus datos personales con las siguientes finalidades:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Gestionar su navegación a través del sitio web</li>
          <li>Atender sus consultas y solicitudes</li>
          <li>Gestionar los servicios solicitados</li>
          <li>Enviar comunicaciones comerciales, si ha dado su consentimiento</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Legitimación</h2>
        <p className="mb-4">
          La base legal para el tratamiento de sus datos es su consentimiento, que puede retirar en cualquier momento.
        </p>
      </div>
    </div>
  );
};

export default Privacy;