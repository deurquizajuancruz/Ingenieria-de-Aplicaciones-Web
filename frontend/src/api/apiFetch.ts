const API_URL = import.meta.env.VITE_API_URL;

type methodOperation = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const apiFetch = async<T>(path: string, method: methodOperation = 'GET', body?: unknown): Promise<T> => {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: method, headers: { 'Content-Type': 'application/json' },
            body: body !== undefined ? JSON.stringify(body) : undefined
        });
        if (!response.ok) {
            const error = await response.json().catch(() => null);
            const message = Array.isArray(error?.message)
                ? error.message.join('\n')
                : error?.message ?? 'Error inesperado';
            throw new ApiError(response.status, message);
        }
        return response.json();
    } catch (error) {
        throw new ApiError(500, 'Error de servidor');
    }
}