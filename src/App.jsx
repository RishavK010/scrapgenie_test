import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/form'

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:3000/');
        if(!response.ok){
          throw new Error('no network response')
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  },[]);

  if(error) {
    return <p className='error'>Error: {error}</p>;
  }

  return (
    <div className = "container">
      <Form />
      <h1 className='title'>Read Blogs</h1>
      <h1 className='data-list-title'>Data Lists</h1>
      <ul className='data-list'>
        {data.map(item => (
          <li key={item.id} className='data-item'>
            <h2 className='data-title'>{item.title}</h2>
            <p className='data-description'>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
