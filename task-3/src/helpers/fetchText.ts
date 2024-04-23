import { checkStatus } from './fetcher';

/**
 * Parses the text returned by a network request
 *
 * @param  {Response} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseText(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.text();
}

// NOTE: Since this is not a common use case, I preferred to implement the
// fetchText function separately.
/**
 * Requests a URL, returning a promise. Contrary to `helpers/fetcher` this
 * function return a plain string. Useful for invoking APIs which return XML
 * documents, for example.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {string}           The response data
 * @throws {AbortError | NotAllowedError | TypeError | InvalidJsonError | ResponseError}
 */
export async function fetchText(url: RequestInfo | URL, options?: RequestInit) {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseText(response);
}
