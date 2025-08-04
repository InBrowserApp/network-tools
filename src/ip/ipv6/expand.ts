/**
 * Expands a compressed IPv6 address to its full, uncompressed form.
 * Automatically strips zone identifiers (e.g., %eth0, %lo0) if present.
 *
 * @param address - The IPv6 address (possibly compressed, with optional zone identifier).
 * @returns The expanded IPv6 address with all hextets present and zero-padded.
 *
 * @example
 * expandIpv6Address("2001:db8::1"); // "2001:0db8:0000:0000:0000:0000:0000:0001"
 * expandIpv6Address("fe80::1%lo0"); // "fe80:0000:0000:0000:0000:0000:0000:0001"
 */
export function expandIpv6Address(address: string): string {
  // Remove zone identifier (e.g., %lo0) if present
  const cleanAddress = address.split("%")[0];

  let fullAddress = "";
  const segments = cleanAddress.split("::");
  if (segments.length === 2) {
    const segment1 = segments[0].split(":");
    const segment2 = segments[1].split(":");
    const missingZeroes = 8 - (segment1.length + segment2.length);
    fullAddress = segment1.join(":");
    for (let i = 0; i < missingZeroes; i++) {
      fullAddress += ":0000";
    }
    fullAddress += ":" + segment2.join(":");
  } else {
    fullAddress = cleanAddress;
  }
  const hextets = fullAddress.split(":");
  for (let i = 0; i < hextets.length; i++) {
    hextets[i] = ("0000" + hextets[i]).slice(-4);
  }
  return hextets.join(":");
}
