const SendData = async (data, api) => {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error('Request failed');
        }

        // Convert response to JSON
        return await response.json(); // Return the data if request was successful
    } catch (error) {
        throw new Error('Failed to send data: ' + error.message);
    }
};

export default SendData;


