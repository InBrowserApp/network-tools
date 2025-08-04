import { describe, it, expect } from "vitest";
import { DNSRecordTypes } from "../record-type.js";

describe("DNSRecordTypes", () => {
  describe("common record types", () => {
    it("should have correct mapping for A record", () => {
      expect(DNSRecordTypes[1]).toBe("A");
    });

    it("should have correct mapping for AAAA record", () => {
      expect(DNSRecordTypes[28]).toBe("AAAA");
    });

    it("should have correct mapping for CNAME record", () => {
      expect(DNSRecordTypes[5]).toBe("CNAME");
    });

    it("should have correct mapping for MX record", () => {
      expect(DNSRecordTypes[15]).toBe("MX");
    });

    it("should have correct mapping for NS record", () => {
      expect(DNSRecordTypes[2]).toBe("NS");
    });

    it("should have correct mapping for PTR record", () => {
      expect(DNSRecordTypes[12]).toBe("PTR");
    });

    it("should have correct mapping for SOA record", () => {
      expect(DNSRecordTypes[6]).toBe("SOA");
    });

    it("should have correct mapping for TXT record", () => {
      expect(DNSRecordTypes[16]).toBe("TXT");
    });
  });

  describe("security and DNSSEC record types", () => {
    it("should have correct mapping for DS record", () => {
      expect(DNSRecordTypes[43]).toBe("DS");
    });

    it("should have correct mapping for DNSKEY record", () => {
      expect(DNSRecordTypes[48]).toBe("DNSKEY");
    });

    it("should have correct mapping for RRSIG record", () => {
      expect(DNSRecordTypes[46]).toBe("RRSIG");
    });

    it("should have correct mapping for NSEC record", () => {
      expect(DNSRecordTypes[47]).toBe("NSEC");
    });

    it("should have correct mapping for NSEC3 record", () => {
      expect(DNSRecordTypes[50]).toBe("NSEC3");
    });
  });

  describe("modern record types", () => {
    it("should have correct mapping for SRV record", () => {
      expect(DNSRecordTypes[33]).toBe("SRV");
    });

    it("should have correct mapping for NAPTR record", () => {
      expect(DNSRecordTypes[35]).toBe("NAPTR");
    });

    it("should have correct mapping for TLSA record", () => {
      expect(DNSRecordTypes[52]).toBe("TLSA");
    });

    it("should have correct mapping for CAA record", () => {
      expect(DNSRecordTypes[257]).toBe("CAA");
    });

    it("should have correct mapping for SVCB record", () => {
      expect(DNSRecordTypes[64]).toBe("SVCB");
    });

    it("should have correct mapping for HTTPS record", () => {
      expect(DNSRecordTypes[65]).toBe("HTTPS");
    });
  });

  describe("special and query record types", () => {
    it("should have correct mapping for ANY record", () => {
      expect(DNSRecordTypes[255]).toBe("ANY");
    });

    it("should have correct mapping for TKEY record", () => {
      expect(DNSRecordTypes[249]).toBe("TKEY");
    });

    it("should have correct mapping for TSIG record", () => {
      expect(DNSRecordTypes[250]).toBe("TSIG");
    });
  });

  describe("data structure validation", () => {
    it("should be a valid object with numeric keys", () => {
      expect(typeof DNSRecordTypes).toBe("object");
      expect(DNSRecordTypes).not.toBeNull();

      // Check that all keys are numeric
      Object.keys(DNSRecordTypes).forEach((key) => {
        expect(Number.isInteger(Number(key))).toBe(true);
      });
    });

    it("should have string values for all record types", () => {
      Object.values(DNSRecordTypes).forEach((value) => {
        expect(typeof value).toBe("string");
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it("should contain expected number of record types", () => {
      const recordCount = Object.keys(DNSRecordTypes).length;
      expect(recordCount).toBeGreaterThan(30); // We have at least 30+ record types
    });

    it("should not have duplicate record type names", () => {
      const values = Object.values(DNSRecordTypes);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });
  });

  describe("lookup functionality", () => {
    it("should return undefined for non-existent record types", () => {
      expect(DNSRecordTypes[9999]).toBeUndefined();
      expect(DNSRecordTypes[-1]).toBeUndefined();
    });

    it("should handle zero as a key", () => {
      // Zero might not be defined, but should not throw
      expect(() => DNSRecordTypes[0]).not.toThrow();
    });

    it("should be readable as a lookup table", () => {
      // Test that we can use it as intended
      const recordType = 1; // A record
      const typeName = DNSRecordTypes[recordType];
      expect(typeName).toBe("A");
    });
  });
});
