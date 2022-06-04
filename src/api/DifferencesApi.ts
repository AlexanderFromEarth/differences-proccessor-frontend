export class DifferencesApi {
    async upload(file: File): Promise<Difference[]> {
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

        const body: {
            previous: {
                name: string | null,
                code: string | null,
                amount: string | null,
            },
            current: {
                name: string | null,
                code: string | null,
                amount: string | null,
            },
            budget: {
                code: string | null,
                amount: string | null,
            },
            temporary: {
                code: string | null,
                amount: string | null,
            },
            hasDifference: boolean
        }[] = await response.json();

        return body.map(
            (
                {
                    previous,
                    current,
                    budget,
                    temporary,
                    hasDifference
                }
            ) => ({
                previousName: previous.name,
                previousCode: previous.code,
                previousAmount: previous.amount,
                currentName: current.name,
                currentCode: current.code,
                currentAmount: current.amount,
                budgetCode: budget.code,
                budgetAmount: budget.amount,
                temporaryCode: temporary.code,
                temporaryAmount: temporary.amount,
                hasDifference: !hasDifference ? '' : null
            })
        );
    }

    async download(differences: Difference[]) {
        await fetch(
            '/api/differences/export',
            {
                method: 'POST',
                body: JSON.stringify(differences)
            }
        );
    }
}
