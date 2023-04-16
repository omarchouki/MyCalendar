export const getEvenetsService = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/reservations', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if(response.ok) {
            const returnData = data.map(dispo => ({
                id: dispo.id,
                title: dispo.description,
                start: new Date(dispo.date).setHours(parseInt(dispo.start.slice(0,2)), parseInt(dispo.start.slice(-2))),
                end: new Date(dispo.date).setHours(parseInt(dispo.end.slice(0,2)), parseInt(dispo.end.slice(-2))),
                email: dispo.email,
              }))
            return returnData
        } else {
            throw new Error(response.statusText)
        }
    } catch (err) {
        console.error(err);
        throw new Error(err)
    }
}