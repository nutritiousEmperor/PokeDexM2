export class API
{
    static baseUrl = `https://pokeapi.co/api/v2`;

    static async query(url)
    {
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch(error)
        {
            console.error(error);
        }
    }
}