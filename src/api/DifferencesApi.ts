export class DifferencesApi {
    async upload(file: File) {
        const response = await fetch(
            '/api/differences',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            }
        );

        if(response.status >= 400) {
            throw new Error(await response.text());
        }

        return response.json();
    }
}