import { useState, useEffect } from 'react';
import { newsItems } from '../utils/newsData';
import { useParams } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

function HtmlRenderer({ content, onManifestoClick }: { content: string, onManifestoClick: () => void }) {
  // Add the global function to window object
  useEffect(() => {
    (window as any).openManifestoModal = onManifestoClick;
    return () => {
      delete (window as any).openManifestoModal;
    };
  }, [onManifestoClick]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

const SingleNews: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newsItem = newsItems.find(item => item.link === `/news/${id}`);

    console.log(`Rendering SingleNews for ID: ${id}`, newsItem);

    const handleManifestoClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <a href="/news" className="text-trump-blue hover:text-trump-red font-medium">
                        ← Back to News
                    </a>
                </div>

                {/* Article header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold  text-trump-maingreen mb-4 leading-tight">
                        {newsItem ? newsItem.title : 'Loading...'}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                        {/* <p className="text-trump-gray font-medium">{newsItem ? newsItem.date : 'Loading...'}</p> */}
                        <div className="flex space-x-3">
                            <a href="#">
                                <img
                                    src="https://ext.same-assets.com/697774200/1290627856.png"
                                    alt="Facebook"
                                    className="h-6 w-4"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://ext.same-assets.com/697774200/2180659290.png"
                                    alt="X"
                                    className="h-6 w-6"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Article body */}
                <div className="prose lg:prose-xl text-gray-800">
                    {newsItem ? (
                        <HtmlRenderer content={newsItem.content} onManifestoClick={handleManifestoClick} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div 
                        className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-20 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        
                        {/* Modal content - Remove padding to let SignupForm handle its own spacing */}
                        <div className="relative">
                            <SignupForm variant="modal" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleNews;
