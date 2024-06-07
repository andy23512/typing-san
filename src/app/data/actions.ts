import { Action } from '../models/action.models';

export const NUM_SHIFT_ACTION_CODES = [550, 551];
export const FN_SHIFT_ACTION_CODES = [552, 553];
export const SHIFT_ACTION_CODES = [513, 517];
export const ALT_GR_ACTION_CODE = 518;
export const ACTIONS: Action[] = [
  {
    codeId: 39,
    writingSystemKeyCode: 'Quote',
  },
  {
    codeId: 44,
    writingSystemKeyCode: 'Comma',
  },
  {
    codeId: 45,
    writingSystemKeyCode: 'Minus',
  },
  {
    codeId: 46,
    writingSystemKeyCode: 'Period',
  },
  {
    codeId: 47,
    writingSystemKeyCode: 'Slash',
  },
  {
    codeId: 48,
    writingSystemKeyCode: 'Digit0',
  },
  {
    codeId: 49,
    writingSystemKeyCode: 'Digit1',
  },
  {
    codeId: 50,
    writingSystemKeyCode: 'Digit2',
  },
  {
    codeId: 51,
    writingSystemKeyCode: 'Digit3',
  },
  {
    codeId: 52,
    writingSystemKeyCode: 'Digit4',
  },
  {
    codeId: 53,
    writingSystemKeyCode: 'Digit5',
  },
  {
    codeId: 54,
    writingSystemKeyCode: 'Digit6',
  },
  {
    codeId: 55,
    writingSystemKeyCode: 'Digit7',
  },
  {
    codeId: 56,
    writingSystemKeyCode: 'Digit8',
  },
  {
    codeId: 57,
    writingSystemKeyCode: 'Digit9',
  },
  {
    codeId: 59,
    writingSystemKeyCode: 'Semicolon',
  },
  {
    codeId: 61,
    writingSystemKeyCode: 'Equal',
  },
  {
    codeId: 91,
    writingSystemKeyCode: 'BracketLeft',
  },
  {
    codeId: 92,
    writingSystemKeyCode: 'Backslash',
  },
  {
    codeId: 93,
    writingSystemKeyCode: 'BracketRight',
  },
  {
    codeId: 96,
    writingSystemKeyCode: 'Backquote',
  },
  { codeId: 65, writingSystemKeyCode: 'KeyA', withShift: true },
  { codeId: 66, writingSystemKeyCode: 'KeyB', withShift: true },
  { codeId: 67, writingSystemKeyCode: 'KeyC', withShift: true },
  { codeId: 68, writingSystemKeyCode: 'KeyD', withShift: true },
  { codeId: 69, writingSystemKeyCode: 'KeyE', withShift: true },
  { codeId: 70, writingSystemKeyCode: 'KeyF', withShift: true },
  { codeId: 71, writingSystemKeyCode: 'KeyG', withShift: true },
  { codeId: 72, writingSystemKeyCode: 'KeyH', withShift: true },
  { codeId: 73, writingSystemKeyCode: 'KeyI', withShift: true },
  { codeId: 74, writingSystemKeyCode: 'KeyJ', withShift: true },
  { codeId: 75, writingSystemKeyCode: 'KeyK', withShift: true },
  { codeId: 76, writingSystemKeyCode: 'KeyL', withShift: true },
  { codeId: 77, writingSystemKeyCode: 'KeyM', withShift: true },
  { codeId: 78, writingSystemKeyCode: 'KeyN', withShift: true },
  { codeId: 79, writingSystemKeyCode: 'KeyO', withShift: true },
  { codeId: 80, writingSystemKeyCode: 'KeyP', withShift: true },
  { codeId: 81, writingSystemKeyCode: 'KeyQ', withShift: true },
  { codeId: 82, writingSystemKeyCode: 'KeyR', withShift: true },
  { codeId: 83, writingSystemKeyCode: 'KeyS', withShift: true },
  { codeId: 84, writingSystemKeyCode: 'KeyT', withShift: true },
  { codeId: 85, writingSystemKeyCode: 'KeyU', withShift: true },
  { codeId: 86, writingSystemKeyCode: 'KeyV', withShift: true },
  { codeId: 87, writingSystemKeyCode: 'KeyW', withShift: true },
  { codeId: 88, writingSystemKeyCode: 'KeyX', withShift: true },
  { codeId: 89, writingSystemKeyCode: 'KeyY', withShift: true },
  { codeId: 90, writingSystemKeyCode: 'KeyZ', withShift: true },
  {
    codeId: 97,
    writingSystemKeyCode: 'KeyA',
  },
  {
    codeId: 98,
    writingSystemKeyCode: 'KeyB',
  },
  {
    codeId: 99,
    writingSystemKeyCode: 'KeyC',
  },
  {
    codeId: 100,
    writingSystemKeyCode: 'KeyD',
  },
  {
    codeId: 101,
    writingSystemKeyCode: 'KeyE',
  },
  {
    codeId: 102,
    writingSystemKeyCode: 'KeyF',
  },
  {
    codeId: 103,
    writingSystemKeyCode: 'KeyG',
  },
  {
    codeId: 104,
    writingSystemKeyCode: 'KeyH',
  },
  {
    codeId: 105,
    writingSystemKeyCode: 'KeyI',
  },
  {
    codeId: 106,
    writingSystemKeyCode: 'KeyJ',
  },
  {
    codeId: 107,
    writingSystemKeyCode: 'KeyK',
  },
  {
    codeId: 108,
    writingSystemKeyCode: 'KeyL',
  },
  {
    codeId: 109,
    writingSystemKeyCode: 'KeyM',
  },
  {
    codeId: 110,
    writingSystemKeyCode: 'KeyN',
  },
  {
    codeId: 111,
    writingSystemKeyCode: 'KeyO',
  },
  {
    codeId: 112,
    writingSystemKeyCode: 'KeyP',
  },
  {
    codeId: 113,
    writingSystemKeyCode: 'KeyQ',
  },
  {
    codeId: 114,
    writingSystemKeyCode: 'KeyR',
  },
  {
    codeId: 115,
    writingSystemKeyCode: 'KeyS',
  },
  {
    codeId: 116,
    writingSystemKeyCode: 'KeyT',
  },
  {
    codeId: 117,
    writingSystemKeyCode: 'KeyU',
  },
  {
    codeId: 118,
    writingSystemKeyCode: 'KeyV',
  },
  {
    codeId: 119,
    writingSystemKeyCode: 'KeyW',
  },
  {
    codeId: 120,
    writingSystemKeyCode: 'KeyX',
  },
  {
    codeId: 121,
    writingSystemKeyCode: 'KeyY',
  },
  {
    codeId: 122,
    writingSystemKeyCode: 'KeyZ',
  },
];
