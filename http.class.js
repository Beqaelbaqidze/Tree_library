export class HttpClass {
  #options = {
    url: "",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(options) {
    this.#options = options;
  }

  request(options) {
    if (options) {
      this.#options = options;
    }
    return new Promise((resolve, reject) => {
      fetch(this.#options.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          reject(error);

          
        });
    });
  }
}
