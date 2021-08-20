export default async function fetchAPI(path, method="GET", data){
    const url = "http://localhost:5000"+path
    const result = await fetch(url, {
        method,
        headers : {
            'Content-Type' : "application/json",
            'authorziation' : localStorage.getItem('token') || '',
            "Access-Control-Allow-Origin": "*",
        },
        body : data ? JSON.stringify(data) : null
    })
    return result.json()
}