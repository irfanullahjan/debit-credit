/**
 * Fetches data from the server and returns a promise that resolves to json data.
 * This is a wrapper around the fetch function to be used with the SWR library.
 * @param input The url to fetch from.
 * @param init The init object to pass to the fetch function.
 * @returns A promise that resolves to the json data.
 */
export const fetcherJson = async (...params: Parameters<typeof fetch>) => {
  const res = await fetch(...params);

  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json();
};