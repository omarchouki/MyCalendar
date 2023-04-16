export const createEvenetService = async (eventInfo) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
        });
        const data = await response.json();
        if(response.ok) {
            return data
        } else {
            throw new Error(response.statusText)
        }
    } catch (err) {
        console.error(err);
        throw new Error(err)
    }
}