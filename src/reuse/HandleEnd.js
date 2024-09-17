import SendData from "./SendData";

const HandleEnd = (result, data, gameComplete, win, score, mistakes, navigate) => {
    if (result === "exit") {
        SendData(data, "http://localhost/api/v1/Score/")
            .then(response => {
                console.log('Data sent successfully:', response);
                navigate();
            })
            .catch(error => {
                console.error('Error sending data:', error.message);
            });
    } else {
        gameComplete(false);
        win(false);
        score(0);
        mistakes(0);
        SendData(data, "http://localhost/api/v1/Score/")
            .then(response => {
                console.log('Data sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending data:', error.message);
            });
    }
}

export default HandleEnd;
