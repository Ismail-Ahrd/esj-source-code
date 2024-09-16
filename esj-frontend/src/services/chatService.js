import axios from "axios";



export const getMessages = async (token, senderId, recipientId, env) => {
    try {
        const response = await axios.get(`${env.SPRINGBOOT_API_URL}/messages/${senderId}/${recipientId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch fetch messages");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}