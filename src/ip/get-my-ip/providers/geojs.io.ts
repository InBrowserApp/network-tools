import { isIPv4, isIPv6 } from "is-ip";

/**
 * The name of the IP provider.
 * @public
 */
export const name = "GeoJS";

/**
 * Fetches the public IPv4 address of the client using GeoJS.
 *
 * @param options - Optional fetch options.
 * @returns The public IPv4 address as a string.
 * @throws If the response does not contain a valid IPv4 address.
 * @example
 * const ipv4 = await getMyIPv4();
 * console.log(ipv4); // e.g., "203.0.113.42"
 */
export async function getMyIPv4(options?: RequestInit): Promise<string> {
  const api = "https://ipv4.geojs.io/v1/ip.json";
  const response = await fetch(api, options);
  const data = await response.json();
  const ip = data.ip;
  if (!isIPv4(ip)) {
    throw new Error(`Invalid IPv4: ${ip}`);
  }

  return ip;
}

/**
 * Fetches the public IPv6 address of the client using GeoJS.
 *
 * @param options - Optional fetch options.
 * @returns The public IPv6 address as a string.
 * @throws If the response does not contain a valid IPv6 address.
 * @example
 * const ipv6 = await getMyIPv6();
 * console.log(ipv6); // e.g., "2001:db8::1"
 */
export async function getMyIPv6(options?: RequestInit): Promise<string> {
  const api = "https://ipv6.geojs.io/v1/ip.json";
  const response = await fetch(api, options);
  const data = await response.json();
  const ip = data.ip;
  if (!isIPv6(ip)) {
    throw new Error(`Invalid IPv4: ${ip}`);
  }

  return ip;
}

/**
 * An object containing methods to fetch the public IPv4 and IPv6 addresses using GeoJS.
 * @public
 */
export const getMyIP = {
  ipv4: getMyIPv4,
  ipv6: getMyIPv6,
  name: name,
};

export default getMyIP;
