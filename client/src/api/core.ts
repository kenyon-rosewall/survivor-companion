const BASE_URL = "http://localhost:5000"

async function doFetch(
  url: string,
  options: any = {},
  callback: (d: any) => void
) {
  fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      switch (response.status) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 205:
        case 206:
        case 304:
          return response.json()
        default:
          throw new Error(response.statusText)
      }
    })
    .then((data) => {
      callback(data.data)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

export async function get(url: string, callback: (d: any) => void) {
  doFetch(url, {}, callback)
}

export async function post(url: string, body: any, callback: (d: any) => void) {
  doFetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
    callback
  )
}
