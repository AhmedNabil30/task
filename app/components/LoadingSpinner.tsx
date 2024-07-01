const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative border-t-4 border-b-4 border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
