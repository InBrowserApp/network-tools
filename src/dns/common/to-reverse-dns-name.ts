import { expandIpv6Address } from "../../ip/index.js";

/**
 * Converts an IPv4 or IPv6 address to its corresponding reverse DNS domain.
 *
 * For IPv4, returns the domain in the form: <reversed octets>.in-addr.arpa
 * For IPv6, returns the domain in the form: <reversed nibbles>.ip6.arpa
 *
 * @param ip - The IPv4 or IPv6 address as a string.
 * @returns The reverse DNS domain for the given IP address.
 *
 * @example
 * toReverseDnsName("192.0.2.1"); // "1.2.0.192.in-addr.arpa"
 * toReverseDnsName("2001:db8::1"); // "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa"
 */
export function toReverseDnsName(ip: string): string {
  let reverseDnsName = "";
  if (ip.includes(":")) {
    reverseDnsName = toIpv6Arpa(ip);
  } else {
    reverseDnsName = ip.split(".").reverse().join(".") + ".in-addr.arpa";
  }

  return reverseDnsName;
}

/**
 * Converts an IPv6 address to its reverse DNS domain in the .ip6.arpa format.
 *
 * @param ipv6 - The IPv6 address as a string.
 * @returns The reverse DNS domain for the IPv6 address.
 *
 * @example
 * toIpv6Arpa("2001:db8::1");
 * // "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa"
 */
function toIpv6Arpa(ipv6: string): string {
  // Step 1: Expand the IPv6 address to its full form
  const expandedIpv6 = expandIpv6Address(ipv6);
  // Step 2: Remove the colons
  const noColons = expandedIpv6.replace(/:/g, "");
  // Step 3: Reverse the order of the characters
  const reversed = noColons.split("").reverse().join("");
  // Step 4: Insert dots between every character
  const dotted = reversed.split("").join(".");
  // Step 5: Append .ip6.arpa to the end
  const arpaFormat = dotted + ".ip6.arpa";

  return arpaFormat;
}
