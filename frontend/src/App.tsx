import { useEffect } from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { Layout } from './components/LayoutArea/Layout/Layout';
import { store } from './Redux/Store';
import { UserService } from './Services/UserService';
import { interceptor } from './Utils/Interceptor';

function App() {

    useEffect(() => {
        // Initialize services
        interceptor.create();
        new UserService();
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </Provider>
    )
}

export default App
