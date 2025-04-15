import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <iframe
        src="/document.pdf"
        className="w-full h-screen"
        title="PDF Viewer"
      />
    </div>
  );
}

export default App;