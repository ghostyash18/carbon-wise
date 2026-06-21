export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * A safe wrapper around the native fetch API.
 * Automatically throws an ApiError if the response is not ok,
 * and safely parses JSON without crashing if the response is HTML.
 */
export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error: any) {
    // Network error (e.g., DNS failure, CORS)
    throw new ApiError(error.message || "Network Error", 0);
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  let data: any = null;

  try {
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    console.error("Failed to parse response body", error);
    data = "Invalid response format";
  }

  if (!response.ok) {
    const errorMessage =
      (isJson && data?.error) ? data.error :
      (typeof data === "string" ? data : response.statusText);

    throw new ApiError(errorMessage || "An unexpected error occurred", response.status, data);
  }

  return data as T;
}
