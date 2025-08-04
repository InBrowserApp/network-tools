import IPSB from "./providers/ip.sb.js";
import GEOJSIO from "./providers/geojs.io.js";
import Cloudflare from "./providers/cloudflare.js";
import IPIFY from "./providers/ipify.org.js";

/**
 * Type definition for a function that fetches an IP address.
 * @param options - Optional options, such as an AbortSignal.
 * @returns A promise that resolves to the IP address as a string.
 */
type getIPFunction = (options?: { signal: AbortSignal }) => Promise<string>;

/**
 * Interface representing an IP provider with optional IPv4 and IPv6 fetch functions and a name.
 */
interface GetMyIPProvider {
  ipv4?: getIPFunction;
  ipv6?: getIPFunction;
  name: string;
}

/**
 * An array of available IP providers implementing the GetMyIPProvider interface.
 * Providers may support IPv4, IPv6, or both.
 */
export const getMyIPProviders: GetMyIPProvider[] = [
  IPSB,
  GEOJSIO,
  Cloudflare,
  IPIFY,
];

/**
 * Fetches the public IPv4 address of the client using the fastest available provider.
 *
 * This function queries all available providers in parallel and returns the first successful result.
 * All other pending requests are aborted once a result is obtained.
 *
 * @returns A promise that resolves to the public IPv4 address as a string.
 * @throws If all providers fail to return a valid IPv4 address.
 *
 * @example
 * const ipv4 = await getMyIPv4();
 * console.log(ipv4); // e.g., "203.0.113.42"
 */
export const getMyIPv4 = async (): Promise<string> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const ipv4Functions = getMyIPProviders
    .filter((provider) => provider.ipv4)
    .map((provider) => provider.ipv4) as getIPFunction[];
  const response = await Promise.any(
    ipv4Functions.map((func) => func({ signal })),
  );
  controller.abort();
  return response;
};

/**
 * Fetches the public IPv6 address of the client using the fastest available provider.
 *
 * This function queries all available providers in parallel and returns the first successful result.
 * All other pending requests are aborted once a result is obtained.
 *
 * @returns A promise that resolves to the public IPv6 address as a string.
 * @throws If all providers fail to return a valid IPv6 address.
 *
 * @example
 * const ipv6 = await getMyIPv6();
 * console.log(ipv6); // e.g., "2001:db8::1"
 */
export const getMyIPv6 = async (): Promise<string> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const ipv6Functions = getMyIPProviders
    .filter((provider) => provider.ipv6)
    .map((provider) => provider.ipv6) as getIPFunction[];
  const response = await Promise.any(
    ipv6Functions.map((func) => func({ signal })),
  );
  controller.abort();
  return response;
};
