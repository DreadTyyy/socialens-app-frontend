const BASE_URL = "http://localhost:3000";
const MODEL_URL = "http://127.0.0.1:5000";

const putAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
}

const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

type FetchType = (
    url: string, 
    options?: {
        headers?: Record<string, string>, 
        method?: string, 
        body?: string 
    }) => Promise<Response>;

const _fetchWithAuth: FetchType = async (url, options = {}) => {
    return await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`
        }
    });
} 

const register = async ({username, password, confirmationPassword}: {
    username: string; password: string; confirmationPassword: string
}) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({username, password, confirmationPassword}),
        });
        const responseJson = await response.json();
        if (response.status === 201) {
            return {error: false, message: "Success create new user"}
        }
        return {error: true, message: responseJson.message};
    } catch (error) {
        return {error: true, message: "An error occurred during registration. Please try again later.", detail: error}
    }
}

const login = async ({username, password}: {
    username: string; password: string;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        });
        const responseJson = await response.json();
        if (response.status === 200) {
            return {error: false, message: "Login success", accessToken: responseJson.accessToken}
        }   
        return {error: true, message: responseJson.message};
    } catch (error) {
        return {error: true, message: "An error occurred during login. Please try again later.", detail: error}
    }
}

const getAuthUser = async () => {
    try {
        const response = await _fetchWithAuth(`${BASE_URL}/api/auth/me`)
        const responseJson = await response.json();
        
        if (response.status === 200) {
            return { error: false, data: responseJson.result }
        }
        return { error: true, message: responseJson.message, data: null }
    } catch (error) {
        return {error: true, message: "An error occurred during get auth. Please try again later.", detail: error, data: null}
    }
}

const getDetailRestaurantSentiment = async ({userId, startDate, endDate}: {userId: number; startDate?: string; endDate?: string}) => {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        
        const response = await fetch(`${BASE_URL}/api/restaurants/restaurant/${userId}/sentimen?${params.toString()}`);
        const responseJson = await response.json();

        if (response.status === 200) {
            return { error: false, data: responseJson.result }
        }
        return { error: true, message: responseJson.message, data: null }
    } catch (error) {
        return {error: true, message: "An error occurred during get detail restaurant. Please try again later.", detail: error, data: null}
    }
}

const deleteRestaurant = async ({userId}: {userId: number}) => {
    try {
        const response = await _fetchWithAuth(`${BASE_URL}/api/restaurants/restaurant/${userId}`, {
            method: "DELETE",
        });
        const responseJson = await response.json();

        if (response.status === 200) {
            return { error: false, message: "Success delete restaurant" }
        }
        return { error: true, message: responseJson.message, data: null }
    } catch (error) {
        return {error: true, message: "An error occurred during delete restaurant. Please try again later.", detail: error, data: null}
    }
}

const createRestaurant = async ({userId, title, url_maps = ''}: {userId: number, title: string; url_maps?: string}) => {
    try {
        const response = await _fetchWithAuth(`${BASE_URL}/api/restaurants/restaurant/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, url_maps})
        });
        const responseJson = await response.json();

        if (response.status === 201) {
            return { error: false, message: "Create restaurant success" }
        }
        return { error: true, message: responseJson.message }
    } catch (error) {
        return {error: true, message: "An error occurred during create restaurant. Please try again later.", detail: error}
    }
}

const createReview = async ({restaurant_id, formData}: {restaurant_id: number, formData:FormData}) => {
    try {
        const response = await fetch(`${MODEL_URL}/api/model/predict/${restaurant_id}`, {
            method: "POST",
            body: formData
        });
        const responseJson = await response.json();

        if (response.status === 200) {
            return { error: false, message: "Success import reviews" }
        }
        return { error: true, message: responseJson.message }
    } catch (error) {
        alert(error)
        return {error: true, message: "An error occurred during create review. Please try again later.", detail: error}
    }
}

export {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAuthUser,
    getDetailRestaurantSentiment,
    deleteRestaurant,
    createReview,
    createRestaurant
}
