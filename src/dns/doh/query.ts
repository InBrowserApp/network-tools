import type { DNSJSONResponse } from "./dns-json-types";

/**
 * Represents a DNS-over-HTTPS (DoH) query.
 *
 * @see https://developers.google.com/speed/public-dns/docs/doh/json
 */
export interface DNSQuery {
  /**
   * The domain name to be resolved.
   */
  name: string;
  /**
   * DNS record type (either empty or one of A, AAAA, CNAME, MX, NS, PTR, SOA, or TXT).
   */
  type?: string;
  /**
   * The CD (Checking Disabled) flag.
   * Use cd=1, or cd=true to disable DNSSEC validation;
   * use cd=0, cd=false, or no cd parameter to enable DNSSEC validation.
   */
  cd?: boolean;
  /**
   * The content type of the request body.
   * Currently only "application/dns-json" is supported.
   */
  ct?: string;
  /**
   * The DO (DNSSEC OK) flag.
   * Use do=1, or do=true to set the DO flag;
   * use do=0, do=false, or no do parameter to unset the DO flag.
   */
  do?: boolean;
  /**
   * The edns0-client-subnet option.
   * Format is an IP address with a subnet mask.
   * Examples: 1.2.3.4/24, 2001:700:300::/48.
   */
  edns_client_subnet?: string;
}

/**
 * Performs a DNS-over-HTTPS (DoH) query using the JSON API.
 *
 * @param server - The DoH server endpoint URL (e.g., "https://dns.google/resolve").
 * @param query - The DNSQuery object specifying the query parameters.
 * @returns A promise that resolves to a DNSJSONResponse object.
 * @throws If the HTTP response is not OK, throws an error with the HTTP status.
 *
 * @example
 * ```ts
 * const response = await queryDnsOverHttps("https://dns.google/resolve", { name: "example.com", type: "A" });
 * console.log(response.Answer);
 * ```
 */
export async function queryDnsOverHttps(
  server: string,
  query: DNSQuery,
): Promise<DNSJSONResponse> {
  const url = new URL(server);
  const searchParams: Record<string, string> = {
    name: query.name,
  };
  if (query.type) {
    searchParams.type = query.type;
  }
  if (query.cd) {
    searchParams.cd = query.cd ? "1" : "0";
  }
  if (query.ct) {
    searchParams.ct = query.ct;
  }
  if (query.do) {
    searchParams.do = query.do ? "1" : "0";
  }
  if (query.edns_client_subnet) {
    searchParams.edns_client_subnet = query.edns_client_subnet;
  }

  url.search = new URLSearchParams(searchParams).toString();

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/dns-json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const json = await response.json();
  return json;
}
