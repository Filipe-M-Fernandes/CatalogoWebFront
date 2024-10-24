
import './App.css';
import ptBR from 'antd/lib/locale/pt_BR';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Login } from './pages';

function App() {
  return (
    <ConfigProvider locale={ptBR}>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
