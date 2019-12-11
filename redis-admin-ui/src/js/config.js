export const DEFAULT_PORT=':8080'
export function getHost() {

}

export const HOST_PORT = () =>{
    return location.protocol + '//' + location.hostname + DEFAULT_PORT;
}