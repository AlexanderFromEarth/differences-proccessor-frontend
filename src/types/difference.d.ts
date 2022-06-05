declare type DifferenceView = {
    id: number,
    previousName: string | null,
    previousCode: string | null,
    previousAmount: string | null,
    currentName: string | null,
    currentCode: string | null,
    currentAmount: string | null,
    budgetCode: string | null,
    budgetAmount: string | null,
    temporaryCode: string | null,
    temporaryAmount: string | null,
    hasDifference: string | null
}

declare type Differences = {
    fileHash: string,
    fileType: string,
    systemRows: number[],
    rows: {
        id: number,
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
    }[]
}
