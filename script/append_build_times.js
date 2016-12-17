#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const processTimingLines = require('../src/js/process_timing_lines');

const rootPath = path.join(__dirname, '..');
const inputPath = path.join(rootPath, 'temporary_build_data.txt');
const jsonPath = path.join(rootPath, 'sample_data.json');

const input = fs.readFileSync(inputPath);

const stages = processTimingLines.process(input.toString());

const output = {
  id: parseInt(process.env.TRAVIS_BUILD_NUMBER),
  stages: stages
};

const sampleData = fs.readFileSync(jsonPath).toString();
const result = JSON.parse(sampleData);
result.push(output);

fs.writeFileSync(jsonPath, JSON.stringify(result));