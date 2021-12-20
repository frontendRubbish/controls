import { readable, writable } from 'svelte/store';
import type { InputStatus } from './types/input.status';

const initialInputStatus: InputStatus = {
  up: false,
  right: false,
  down: false,
  left: false,
  buttonA: false,
  buttonB: false,
  buttonX: false,
  buttonY: false,
}

export const inputStatus = writable(initialInputStatus);

export const activeSection = writable(0);

export const delayShort = readable(200);