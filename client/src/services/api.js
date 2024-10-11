export const api = {
  url: 'http://localhost:8989',

  async get(endpoint) {
    console.log('GET', endpoint)
    const res = await fetch(`${this.url}/${endpoint}`)
    return await res.json()
  }
}
