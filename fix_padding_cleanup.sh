#!/bin/bash
for file in $(grep -rl "clay-card\|neumorphic-card" src/); do
  sed -i -E 's/p-6 md:p-8 md:p-8/p-6 md:p-8/g' "$file"
  sed -i -E 's/p-6 md:p-8 sm:p-[0-9]+/p-6 md:p-8/g' "$file"
done
