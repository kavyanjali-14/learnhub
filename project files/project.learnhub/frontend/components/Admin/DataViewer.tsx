import React, { useState, useEffect } from 'react';

interface DataItem {
  _id: string;
  [key: string]: any;
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: DataItem[] }>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  const collections = [
    'users', 'courses', 'assessments', 'workshops', 
    'discussions', 'progress', 'communications', 'profiles'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const promises = collections.map(async (collection) => {
        const response = await fetch(`http://localhost:5000/api/${collection}`);
        const data = await response.json();
        return { [collection]: data };
      });

      const results = await Promise.all(promises);
      const combinedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-xl font-semibold text-gray-600">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Data Viewer</h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {collections.map((collection) => (
          <button
            key={collection}
            onClick={() => setActiveTab(collection)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === collection
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {collection.charAt(0).toUpperCase() + collection.slice(1)} ({data[collection]?.length || 0})
          </button>
        ))}
      </div>

      {/* Data Display */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Collection
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          {data[activeTab] && data[activeTab].length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[activeTab][0]).map((key) => (
                    <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data[activeTab].map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50">
                    {Object.values(item).map((value, valueIndex) => (
                      <td key={valueIndex} className="px-4 py-3 text-sm text-gray-900">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No data found in {activeTab} collection
            </div>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6">
        <button
          onClick={fetchData}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default DataViewer; 