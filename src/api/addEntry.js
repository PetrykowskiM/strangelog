// @flow

import { outputFileSync } from 'fs-extra';
import jsYaml from 'js-yaml';

import type { ConfigType, EntryType } from '../types';

export default function addEntry(
  { path, components }: ConfigType,
  entry: EntryType
): void {

  if (!Object.keys(components).includes(entry.component)) {
    throw new Error(`Unknown component "${entry.component}"`);
  }

  const dateTime = new Date().toISOString();

  outputFileSync(
    `${path}/next/${dateTime}_${entry.kind}_${entry.component}.yml`,
    jsYaml.safeDump({
      dateTime,
      ...entry
    })
  );
}
