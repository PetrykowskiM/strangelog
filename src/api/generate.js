// @flow

import { readFileSync } from 'fs-extra';
import { create as createHandlebars } from 'handlebars';

import type { ConfigType, ChangelogType } from '../types';

import { stringifyVersion } from './utils';

const handlebarsInstance = createHandlebars();

handlebarsInstance.registerHelper('stringifyVersion', (version) => stringifyVersion(version));

export default function generate(
  { path, components }: ConfigType,
  changelog: ChangelogType
): string {
  const generateMarkdown = handlebarsInstance.compile(
    readFileSync('./templates/CHANGELOG.hbs').toString()
  );

  return generateMarkdown({
    changelog
  });
}
