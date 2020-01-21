export function getJSON<T>(uri: string, method: string = "GET", body: Document | BodyInit | null = null): Promise<T> {
    var xhr = new XMLHttpRequest();
    xhr.open(method, uri);
    return new Promise((resolve, reject) => {
        xhr.onerror = (ev) => {
            reject(ev);
        }
        xhr.onload = (ev) => {
            resolve(JSON.parse(xhr.responseText) as T);
        }
        xhr.send(body);
    });
}
