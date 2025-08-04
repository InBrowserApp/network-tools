import { describe, it, expect } from "vitest";
import { DNSRCODEs } from "../rcode.js";

describe("DNSRCODEs", () => {
  describe("standard response codes", () => {
    it("should have correct mapping for NoError (0)", () => {
      expect(DNSRCODEs[0]).toEqual({
        name: "NoError",
        description: "No Error",
      });
    });

    it("should have correct mapping for FormErr (1)", () => {
      expect(DNSRCODEs[1]).toEqual({
        name: "FormErr",
        description: "Format Error",
      });
    });

    it("should have correct mapping for ServFail (2)", () => {
      expect(DNSRCODEs[2]).toEqual({
        name: "ServFail",
        description: "Server Failure",
      });
    });

    it("should have correct mapping for NXDomain (3)", () => {
      expect(DNSRCODEs[3]).toEqual({
        name: "NXDomain",
        description: "Non-Existent Domain",
      });
    });

    it("should have correct mapping for NotImp (4)", () => {
      expect(DNSRCODEs[4]).toEqual({
        name: "NotImp",
        description: "Not Implemented",
      });
    });

    it("should have correct mapping for Refused (5)", () => {
      expect(DNSRCODEs[5]).toEqual({
        name: "Refused",
        description: "Query Refused",
      });
    });
  });

  describe("extended response codes", () => {
    it("should have correct mapping for YXDomain (6)", () => {
      expect(DNSRCODEs[6]).toEqual({
        name: "YXDomain",
        description: "Name Exists when it should not",
      });
    });

    it("should have correct mapping for YXRRSet (7)", () => {
      expect(DNSRCODEs[7]).toEqual({
        name: "YXRRSet",
        description: "RR Set Exists when it should not",
      });
    });

    it("should have correct mapping for NXRRSet (8)", () => {
      expect(DNSRCODEs[8]).toEqual({
        name: "NXRRSet",
        description: "RR Set that should exist does not",
      });
    });

    it("should have correct mapping for NotAuth (9)", () => {
      expect(DNSRCODEs[9]).toEqual({
        name: "NotAuth",
        description: "Server Not Authoritative for zone",
      });
    });

    it("should have correct mapping for NotZone (10)", () => {
      expect(DNSRCODEs[10]).toEqual({
        name: "NotZone",
        description: "Name not contained in zone",
      });
    });
  });

  describe("EDNS and security related codes", () => {
    it("should have correct mapping for BADVERS (16)", () => {
      expect(DNSRCODEs[16]).toEqual({
        name: "BADVERS",
        description: "Bad OPT Version",
      });
    });

    it("should have correct mapping for BADKEY (17)", () => {
      expect(DNSRCODEs[17]).toEqual({
        name: "BADKEY",
        description: "Key not recognized",
      });
    });

    it("should have correct mapping for BADTIME (18)", () => {
      expect(DNSRCODEs[18]).toEqual({
        name: "BADTIME",
        description: "Signature out of time window",
      });
    });

    it("should have correct mapping for BADMODE (19)", () => {
      expect(DNSRCODEs[19]).toEqual({
        name: "BADMODE",
        description: "Bad TKEY Mode",
      });
    });

    it("should have correct mapping for BADCOOKIE (23)", () => {
      expect(DNSRCODEs[23]).toEqual({
        name: "BADCOOKIE",
        description: "Bad/missing Server Cookie",
      });
    });
  });

  describe("data structure validation", () => {
    it("should be a valid object with numeric keys", () => {
      expect(typeof DNSRCODEs).toBe("object");
      expect(DNSRCODEs).not.toBeNull();

      // Check that all keys are numeric
      Object.keys(DNSRCODEs).forEach((key) => {
        expect(Number.isInteger(Number(key))).toBe(true);
      });
    });

    it("should have consistent object structure for all codes", () => {
      Object.values(DNSRCODEs).forEach((rcode) => {
        expect(rcode).toHaveProperty("name");
        expect(rcode).toHaveProperty("description");
        expect(typeof rcode.name).toBe("string");
        expect(typeof rcode.description).toBe("string");
        expect(rcode.name.length).toBeGreaterThan(0);
        expect(rcode.description.length).toBeGreaterThan(0);
      });
    });

    it("should contain expected standard response codes", () => {
      // Standard DNS response codes 0-5 should exist
      for (let i = 0; i <= 5; i++) {
        expect(DNSRCODEs[i]).toBeDefined();
        expect(DNSRCODEs[i]).toHaveProperty("name");
        expect(DNSRCODEs[i]).toHaveProperty("description");
      }
    });

    it("should not have duplicate response code names", () => {
      const names = Object.values(DNSRCODEs).map((rcode) => rcode.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe("lookup functionality", () => {
    it("should return undefined for non-existent response codes", () => {
      expect(DNSRCODEs[9999]).toBeUndefined();
      expect(DNSRCODEs[-1]).toBeUndefined();
    });

    it("should handle gaps in response code sequence", () => {
      // There are gaps between 11-15, and others
      expect(DNSRCODEs[12]).toBeUndefined();
      expect(DNSRCODEs[13]).toBeUndefined();
      expect(DNSRCODEs[14]).toBeUndefined();
      expect(DNSRCODEs[15]).toBeUndefined();
    });

    it("should be usable for error code lookup", () => {
      const rcode = 3; // NXDOMAIN
      const error = DNSRCODEs[rcode];
      expect(error.name).toBe("NXDomain");
      expect(error.description).toBe("Non-Existent Domain");
    });

    it("should provide meaningful error descriptions", () => {
      Object.values(DNSRCODEs).forEach((rcode) => {
        // Descriptions should be meaningful (more than just the name)
        expect(rcode.description).not.toBe(rcode.name);
        expect(rcode.description.length).toBeGreaterThan(rcode.name.length);
      });
    });
  });
});
