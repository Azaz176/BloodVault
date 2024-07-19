import axios from 'axios';
export const axiosInstance = async (method, endpoint, payload) => {
  try {
    const response = await axios({
      method,
      url: endpoint,
      data: payload,
    });
    return response.data; // Ensure the response data is returned
  } catch (error) {
    console.error('Axios error:', error.response || error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Unknown error',
    };
  }
};
