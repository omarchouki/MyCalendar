export const deleteEvenetService = async (id) => {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    if(!username || !password) {
        alert('login first!!')
        return false
    }
    try {
        const response = await fetch(`http://127.0.0.1:5000/reservations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic "+ btoa(username+":"+password)
            }
        });
        const data = await response.json();
        if(response.ok) {
            return data
        }
    } catch (err) {
        console.error("catch ==> ",err.status);
        throw new Error(err)
    }
}