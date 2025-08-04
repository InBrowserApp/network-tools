import { describe, it, expect } from "vitest";
import { expandIpv6Address } from "../expand.js";

describe("expandIpv6Address", () => {
  describe("compressed addresses with ::", () => {
    it("should expand address with :: in the middle", () => {
      expect(expandIpv6Address("2001:db8::1")).toBe(
        "2001:0db8:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should expand address with :: at the beginning", () => {
      expect(expandIpv6Address("::1")).toBe(
        "0000:0000:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should expand address with :: at the end", () => {
      expect(expandIpv6Address("2001:db8::")).toBe(
        "2001:0db8:0000:0000:0000:0000:0000:0000",
      );
    });

    it("should expand loopback address", () => {
      expect(expandIpv6Address("::1")).toBe(
        "0000:0000:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should expand all-zeros address", () => {
      expect(expandIpv6Address("::")).toBe(
        "0000:0000:0000:0000:0000:0000:0000:0000",
      );
    });

    it("should expand address with multiple segments before ::", () => {
      expect(expandIpv6Address("2001:db8:85a3::8a2e")).toBe(
        "2001:0db8:85a3:0000:0000:0000:0000:8a2e",
      );
    });

    it("should expand address with multiple segments after ::", () => {
      expect(expandIpv6Address("2001::8a2e:370:7334")).toBe(
        "2001:0000:0000:0000:0000:8a2e:0370:7334",
      );
    });

    it("should expand compressed address with zone identifier", () => {
      expect(expandIpv6Address("fe80::1%lo0")).toBe(
        "fe80:0000:0000:0000:0000:0000:0000:0001",
      );
    });
  });

  describe("already expanded addresses", () => {
    it("should not modify fully expanded address", () => {
      const expanded = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
      expect(expandIpv6Address(expanded)).toBe(expanded);
    });

    it("should pad short hextets in expanded address", () => {
      expect(expandIpv6Address("2001:db8:85a3:0:0:8a2e:370:7334")).toBe(
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      );
    });

    it("should handle single digit hextets", () => {
      expect(expandIpv6Address("2001:db8:85a3:1:2:8a2e:370:7334")).toBe(
        "2001:0db8:85a3:0001:0002:8a2e:0370:7334",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle address with leading zeros", () => {
      expect(expandIpv6Address("0001:0002::0003")).toBe(
        "0001:0002:0000:0000:0000:0000:0000:0003",
      );
    });

    it("should handle mixed case hexadecimal", () => {
      expect(expandIpv6Address("2001:DB8::AbCd")).toBe(
        "2001:0DB8:0000:0000:0000:0000:0000:AbCd",
      );
    });

    it("should expand typical documentation example", () => {
      expect(expandIpv6Address("2001:db8::8a2e:370:7334")).toBe(
        "2001:0db8:0000:0000:0000:8a2e:0370:7334",
      );
    });

    it("should handle IPv6 with one segment before ::", () => {
      expect(expandIpv6Address("1::")).toBe(
        "0001:0000:0000:0000:0000:0000:0000:0000",
      );
    });

    it("should handle IPv6 with one segment after ::", () => {
      expect(expandIpv6Address("::1")).toBe(
        "0000:0000:0000:0000:0000:0000:0000:0001",
      );
    });
  });

  describe("zone identifiers", () => {
    it("should strip zone identifier from link-local address", () => {
      expect(expandIpv6Address("fe80::1%eth0")).toBe(
        "fe80:0000:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should strip zone identifier from loopback address", () => {
      expect(expandIpv6Address("::1%lo0")).toBe(
        "0000:0000:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should strip numeric zone identifier", () => {
      expect(expandIpv6Address("2001:db8::1%4")).toBe(
        "2001:0db8:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should strip complex zone identifier", () => {
      expect(expandIpv6Address("fe80::abcd:ef01%en0")).toBe(
        "fe80:0000:0000:0000:0000:0000:abcd:ef01",
      );
    });

    it("should handle address without zone identifier normally", () => {
      expect(expandIpv6Address("2001:db8::1")).toBe(
        "2001:0db8:0000:0000:0000:0000:0000:0001",
      );
    });
  });

  describe("real-world IPv6 addresses", () => {
    it("should expand Google DNS IPv6", () => {
      expect(expandIpv6Address("2001:4860:4860::8888")).toBe(
        "2001:4860:4860:0000:0000:0000:0000:8888",
      );
    });

    it("should expand Cloudflare DNS IPv6", () => {
      expect(expandIpv6Address("2606:4700:4700::1111")).toBe(
        "2606:4700:4700:0000:0000:0000:0000:1111",
      );
    });

    it("should expand link-local address", () => {
      expect(expandIpv6Address("fe80::1")).toBe(
        "fe80:0000:0000:0000:0000:0000:0000:0001",
      );
    });

    it("should expand unique local address", () => {
      expect(expandIpv6Address("fc00::1")).toBe(
        "fc00:0000:0000:0000:0000:0000:0000:0001",
      );
    });
  });
});
