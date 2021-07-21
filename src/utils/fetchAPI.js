export default async function fetchAPI(path, method, data){
    const url = "http://localhost:5000"+path
    const result = await fetch(url, {
        method : method || "GET",
        headers : {
            'Content-Type' : "application/json",
            'authorziation' : localStorage.getItem('token') || ''
        },
        body : JSON.stringify(data)
    })
    return result.json()
}