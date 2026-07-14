import { describe, it, expect } from "vitest";
import { formatCurrency, formatCurrencyCompact, formatNumber } from "./format";

describe("formatCurrency", () => {
  it("formats Turkish Lira with locale grouping and two decimals", () => {
    const out = formatCurrency(12345.5);
    expect(out).toContain("12.345,50");
    expect(out).toContain("₺");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toContain("0,00");
  });

  it("formats negatives with grouping", () => {
    expect(formatCurrency(-1500)).toContain("1.500,00");
  });
});

describe("formatNumber", () => {
  it("groups thousands without decimals", () => {
    expect(formatNumber(12345)).toBe("12.345");
  });
});

describe("formatCurrencyCompact", () => {
  it("is a lira string shorter than the full format", () => {
    const out = formatCurrencyCompact(12345);
    expect(out).toContain("₺");
    expect(out.length).toBeLessThan(formatCurrency(12345).length);
  });
});
