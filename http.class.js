export class Http {
    #options = {
        url: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    constructor(options){
        this.#options = options;
    }
    request(options){
        if(options){
            this.#options = options;
        }
        return new Promise((resolve, reject) => {
            fetch(this.#options.url, {
                method: this.#options.method,
                headers: this.#options.headers
            })
            .then((response) => response.json())
            .then((jsonVal) => {              
                resolve(jsonVal);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

