// @flow

import { removeSync, mkdirsSync } from 'fs-extra';

import { connectChangelog } from '../../../src/api';
import { getOwnTestPath } from '../../factories/fileSystem';

const testPath = getOwnTestPath();

describe('getPossibleNextVersions', () => {

  beforeEach(() => {
    removeSync(testPath);
  });

  afterEach(() => {
    removeSync(testPath);
  });

  function setup() {
    return connectChangelog({
      path: testPath,
      components: {
        comp1: 'Comp 1',
        comp2: 'Comp 2'
      }
    });
  }

  describe('when called with no version directories', () => {

    it('returns only 1.0', () => {
      const { getPossibleNextVersions } = setup();

      expect(getPossibleNextVersions()).toEqual(null);
    });

  });

  describe('when called with only "next" version directory', () => {

    it('returns only 1.0', () => {
      const { getPossibleNextVersions } = setup();

      expect(getPossibleNextVersions()).toEqual(null);
    });

  });

  describe('when called with a "1.0" version directory', () => {

    it('returns only 1.1 and 2.0 as possible next versions', () => {
      const { getPossibleNextVersions } = setup();

      mkdirsSync(`${testPath}/1.0`);

      expect(getPossibleNextVersions()).toEqual([{
        major: 1,
        minor: 1
      }, {
        major: 2,
        minor: 0
      }]);
    });

  });

});