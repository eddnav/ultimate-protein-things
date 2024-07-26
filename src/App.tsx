import React, { useEffect, useState } from 'react';
import './App.css';
import { Review } from './types/Review';

function App() {
  
  const [data, setData] = useState<Review[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/data.json');
          const result: [Review] = await response.json();
          setData(result);
      };
      fetchData();
  }, []);

  return (
    <div className="App">
      {
      data.map(
        review =>  review.product.name
      )
      }
    </div>
  );
}

export default App;
