export class ApiError extends Error {
	status: number;

	constructor(url: string, status: number) {
		super(`'${url} returned ${status}`);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}

		this.name = 'ApiError';
		this.status = status;
	}
}

export const fetchJson = async (url: string): Promise<any> => {
	const response: Response = await fetch(url);

	if (!response.ok) {
		throw new ApiError(url, response.status);
	}

	return await response.json();
}
