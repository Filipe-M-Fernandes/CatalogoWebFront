
import './App.css';
import ptBR from 'antd/lib/locale/pt_BR';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AtivarConta, Inicial, Login } from './pages';

function App() {
  return (
    <ConfigProvider locale={ptBR}>

      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Inicial />} />
          <Route path="*" element={<Inicial />} />
          <Route exact path="/ativar-novo-usuario" element={<AtivarConta/>} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
