export class DifferencesApi {
    async upload(file: File): Promise<Differences> {
        const data = new FormData();
        data.append('file', file);

        const response = await fetch(
            '/api/differences',
            {
                method: 'POST',
                body: data
            }
        );

        if(response.status >= 400) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async download(differences: Differences) {
        await fetch(
            '/api/differences',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(differences)
            }
        );
    }
}
