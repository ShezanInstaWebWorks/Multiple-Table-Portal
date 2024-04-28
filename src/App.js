
import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';



function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
 useEffect(() => {
  setLoading(true);
    fetch("https://api.easy-pluginz.com/admin/v2/utils/extuserstats", {
      headers: {
        orgid: "6230848000000459057",
        connname: "easyaddressautocomplete",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        setData(info);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <HomePage data={data}/>
      
      
    </div>
  );
}

export default App;
