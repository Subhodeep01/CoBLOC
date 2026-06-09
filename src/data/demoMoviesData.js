/**
 * Hardcoded demo data for Movies exploration.
 *
 * Three scenarios driven by the exact window patterns specified:
 *   S0: no reorder (natural pool sliding)
 *   S1: after clicking Reorder at window 1
 *   S2: after clicking Reorder at window 2 (with S1 already applied)
 *
 * Genre legend: L = light-hearted (ids 1-40), N = neutral (ids 71-100), D = dark-themed (ids 41-70)
 *
 * Pool for S0/S1 (positions 0-indexed):
 *   0:L(1) 1:L(2) 2:L(3) 3:L(4) 4:L(5) 5:N(71) 6:D(41) 7:D(42) 8:D(43) 9:N(72)
 *   10:N(73) 11:L(6) 12:D(44) 13:L(7) 14:L(8) 15:L(9) 16:N(74) 17:D(45) 18:L(10)
 *
 * Before reorder (S0), each window is a 10-item sliding slice:
 *   W1  ids[0..9]  = LLLLL NDDDN ✓
 *   W2  ids[1..10] = LLLLN DDDNN ✓
 *   ...
 *
 * S1 – W1 reordered to [1,2,3,71,41,4,5,42,43,72] = LLLND LLDDN, then slides naturally.
 *
 * S2 – W2 reordered to [2,3,71,41,4,5,6,72,42,7]  = LLNDL LLNDL,
 *      then pool switches to DEMO_POOL_S2 starting with ids [8,9,74,45,46,75,47,11,...].
 */

import allMovies from './mockMovies';

const byId = Object.fromEntries(allMovies.map(m => [m.id, m]));
const ids = (...arr) => arr.map(id => byId[id]);

// ── Pool for scenarios 0 and 1 ──────────────────────────────────────────────
// Genre sequence: L L L L L  N  D D D  N  N  L  D  L L L  N  D  L  [more...]
export const DEMO_POOL_S01 = ids(
  1, 2, 3, 4, 5,          // L L L L L
  71,                     // N
  41, 42, 43,             // D D D
  72,                     // N
  73,                     // N
  6,                      // L
  44,                     // D
  7, 8, 9,                // L L L
  74,                     // N
  45,                     // D
  10,                     // L
  // tail — fills pool for windows beyond 10
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  46, 47, 48, 49, 50,
  75, 76, 77, 78, 79,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  51, 52, 53, 54, 55,
  80, 81, 82, 83, 84,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
);

// ── W1 reordered (scenario 1) ───────────────────────────────────────────────
// Original W1 = [1,2,3,4,5,71,41,42,43,72] → rearranged as:
//   Block1: 1(L),2(L),3(L),71(N),41(D)   → LLLND ✓
//   Block2: 4(L),5(L),42(D),43(D),72(N)  → LLDDN ✓
export const DEMO_W1_REORDERED = ids(1, 2, 3, 71, 41, 4, 5, 42, 43, 72);

// ── W2 reordered (scenario 2, given S1 W1 already applied) ─────────────────
// W2 in S1 = [2,3,71,41,4,5,42,43,72,73] slide, but reorder pulls in L(6) and L(7):
//   Block1: 2(L),3(L),71(N),41(D),4(L)   → LLNDL ✓
//   Block2: 5(L),6(L),72(N),42(D),7(L)   → LLNDL ✓
export const DEMO_W2_REORDERED = ids(2, 3, 71, 41, 4, 5, 6, 72, 42, 7);

// ── Pool for scenario 2 ─────────────────────────────────────────────────────
// After W2 reorder, pool cursor resets; new arrivals needed for W3-W10:
//   W3 +L(8)  W4 +L(9)  W5 +N(74)  W6 +D(45)  W7 +D(46)
//   W8 +N(75) W9 +D(47) W10+L(11)
// Genre check:
//   W3 = DEMO_W2_REORDERED[1..9] + L  = L,N,D,L,L,L,N,D,L,L = LNDLL LNDLL ✓
//   W4 = LNDLL LNDLL[1..9] + L        = N,D,L,L,L,N,D,L,L,L = NDLLL NDLLL ✓
//   W5 + N                            = D,L,L,L,N,D,L,L,L,N = DLLLN DLLLN ✓
//   W6 + D                            = L,L,L,N,D,L,L,L,N,D = LLLND LLLND ✓
//   W7 + D                            = L,L,N,D,L,L,L,N,D,D = LLNDL LLNDD ✓
//   W8 + N                            = L,N,D,L,L,L,N,D,D,N = LNDLL LNDDN ✓
//   W9 + D                            = N,D,L,L,L,N,D,D,N,D = NDLLL NDDND ✓
//   W10+ L                            = D,L,L,L,N,D,D,N,D,L = DLLLN DDNDL ✓
export const DEMO_POOL_S2 = ids(
  8, 9,            // L L
  74,              // N
  45,              // D
  46,              // D
  75,              // N
  47,              // D
  11,              // L
  // tail
  12, 13, 14, 15, 16, 17, 18, 19, 20,
  48, 49, 50, 51, 52, 53, 54, 55,
  76, 77, 78, 79, 80,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
);
