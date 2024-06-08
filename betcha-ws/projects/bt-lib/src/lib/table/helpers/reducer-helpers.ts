import { SortDetails } from "../models/sort-details.model";

export function setRecord<T>(record: Record<string, T>, key: string, value: T | null): Record<string, T> {
    if (value !== null) {
        return {
            ...record, 
            [key]: value
        }
    } else {
        const { [key]: value, ...result } = record;
        return result;
    }
}

export function calcNewSort(oldSort: SortDetails, column: string): SortDetails {
    if (column === oldSort.column) return {
        ...oldSort, 
        direction: (oldSort.direction === 'asc' ? 'desc' : 'asc')
    };

    if (column === '') return {
        column: '', 
        direction: ''
    }

    return {
        column, 
        direction: 'asc'
    }
}