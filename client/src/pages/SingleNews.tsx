import type React from 'react';
import { newsItems } from '../utils/newsData';
import { useParams } from 'react-router-dom';

function HtmlRenderer({ content }) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

const SingleNews: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const newsItem = newsItems.find(item => item.link === `/news/${id}`);

    console.log(`Rendering SingleNews for ID: ${id}`, newsItem);

    function HtmlRenderer({ content }) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
    

  return (
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
          <p className="text-trump-gray font-medium">{newsItem ? newsItem.date : 'Loading...'}</p>
          <div className="flex space-x-3">
            <a
              href="#"
             
            >
                <img
                    src="https://ext.same-assets.com/697774200/1290627856.png"
                    alt="Facebook"
                    className="h-6 w-4"
                />
            </a>
            <a
              href="#"
            >
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
            <HtmlRenderer content={newsItem.content} />
            ) : (
            <p>Loading...</p>
            )}
        </div>

    </main>
  );
};

export default SingleNews;
