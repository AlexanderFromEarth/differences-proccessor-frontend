export class DifferencesApi {
    async upload(file: File): Promise<Differences> {
        const data = new FormData();
        data.append('file', file);

        const response = await fetch(
            '/api/differences/upload',
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

    async download(differences: Differences): Promise<{blob: Blob, filename: string}> {
        const response = await fetch(
            '/api/differences/download',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(differences)
            }
        );

        if(response.status >= 400) {
            throw new Error(await response.text());
        }

        const filename = response.headers.get('Content-Disposition')?.match(/filename\*=UTF-8''([\w%\-.]+)(?:; ?|$)/i);

        return {
            blob: await response.blob(),
            filename: filename && filename[1] ? filename[1] : ''
        };
    }
}
