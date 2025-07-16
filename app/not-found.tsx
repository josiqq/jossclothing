export default function NotFound() {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
      <h2 className="text-xl font-bold">Página no encontrada</h2>
      <p className="my-2">
        La página que estás buscando no existe. Si crees que debería existir, por favor contacta
        con nosotros.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        onClick={() => window.location.reload()}
      >
        Volver a la página inicial
      </button>
    </div>
  );
}