import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import store from './data/store';
import AddKitty from './routes/add-kitty';
import EditKitty from './routes/edit-kitty';
import Home from './routes/home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/kitty" />} />
          <Route path="/kitty" element={<Home />}>
            <Route path="/kitty/add" element={<AddKitty />} />
            <Route path="/kitty/edit/:id" element={<EditKitty />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
