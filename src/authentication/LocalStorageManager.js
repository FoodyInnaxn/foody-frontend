export function SaveToken(token) {
    localStorage.setItem('jwt', token);
}

export function GetToken() {
    return localStorage.getItem('jwt');
}

export function DeleteToken() {
    localStorage.removeItem('jwt')
    localStorage.removeItem("userId")
    localStorage.removeItem('role')
}