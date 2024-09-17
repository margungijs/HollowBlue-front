const GetRequest = async (api) => {
    try {
        const response = await fetch(api);

        // Check if request was successful
        if (!response.ok) {
            throw new Error('Request failed');
        }

        // Convert response to JSON
        return await response.json(); // Return the data if request was successful
    } catch (error) {
        throw new Error('Failed to get data: ' + error.message);
    }
}

export default GetRequest;