const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">403 Forbidden</h1>
      <p className="text-xl mb-8">
        You do not have permission to access this resource.
      </p>
      <a
        href="/"
        className="bg-white text-gray-900 font-bold py-2 px-4 rounded"
      >
        Go to Home Page
      </a>
    </div>
  );
};

export default ErrorPage;
