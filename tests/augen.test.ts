import { describe, expect, it } from 'vitest';
import { sehGdb, blind, hochgradig } from '../src/lib/engine/augen';

/** Werte aus der MdE-Tabelle der DOG, VersMedV Teil B Nr. 4.3 (research/versmedv-2025-10-03.txt). */
describe('MdE-Tabelle der DOG', () => {
  it('beide Augen gleich', () => {
    expect(sehGdb(1.0, 1.0)).toBe(0);
    expect(sehGdb(0.5, 0.5)).toBe(10);
    expect(sehGdb(0.32, 0.32)).toBe(30);
    expect(sehGdb(0.2, 0.2)).toBe(50);
    expect(sehGdb(0.1, 0.1)).toBe(70);
    expect(sehGdb(0.05, 0.05)).toBe(100);
  });
  it('ein Auge gut, eines schlecht', () => {
    expect(sehGdb(1.0, 0)).toBe(25);
    expect(sehGdb(1.0, 0.1)).toBe(20);
    expect(sehGdb(0.5, 0.1)).toBe(30);
    expect(sehGdb(0.1, 0.05)).toBe(80);
    expect(sehGdb(0.4, 0.4)).toBe(20);
  });
  it('Blindheit und hochgradige Sehbehinderung', () => {
    expect(blind(0.02, 0)).toBe(true);
    expect(blind(0.05, 0.02)).toBe(false);
    expect(hochgradig(0.05, 0.02)).toBe(true);
    expect(hochgradig(0.08, 0.05)).toBe(false);
  });
});
