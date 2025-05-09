import axios from 'axios';
import { useStorage } from '../hooks';

const { getUser, deleteUser } = useStorage()


//export const BASE_URL = "https://api.enumera.tech/";
//export const BASE_URL = "https://wilofo-api.enumera.tech/";
export const BASE_URL = "https://api.wilofo.com/";
//export const BASE_URL = "http://127.0.0.1:8080/";
const API_URL = `${BASE_URL}api/`;

const request = axios.create({
    baseURL: API_URL+"/",
    headers: {
        'Accept':'application/json',
        //'Authorization' : `Bearer ${user?.token}`,
        "Content-Type":"multipart/form-data"
    },
});

// Interceptor pour ajouter le token à chaque requête
/*request.interceptors.request.use(config => {
    const user = getUser();
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});*/

// Fonction pour vérifier l'authentification
/*const verifyAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}users`, {
            headers: {
                'Authorization': `Bearer ${getUser().token}`,
            },
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
};*/

// Interceptor pour gérer les erreurs de réponse
/*request.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            const isAuthenticated = await verifyAuth();
            if (!isAuthenticated) {
                // Si l'utilisateur n'est pas authentifié, déconnecter l'utilisateur
                deleteUser(); // Fonction pour supprimer les informations de l'utilisateur du stockage
                const pathname = window.location.pathname
                if(!pathname.includes("connexion") && !pathname.includes("authentification-a-2-facteurs"  && !pathname.includes("validation-du-code-a-2-facteurs"))){
                    window.location.href = '/connexion'; // Rediriger vers la page de connexion
                    console.log("include :" + !pathname.includes("validation-du-code-a-2-facteurs"))
                }
            }
        }
        return Promise.reject(error);
    }
);*/

export default request;
