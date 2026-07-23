#!/bin/bash
for file in $(grep -rl "clay-card\|neumorphic-card" src/); do
  # This might be tricky because there might be other paddings on the same line, or we can just replace ' p-[0-9]\+ '
  # Let's be more precise
  sed -i -E '/clay-card|neumorphic-card/s/ p-[0-9]+ / p-6 md:p-8 /g' "$file"
  sed -i -E '/clay-card|neumorphic-card/s/ p-[0-9]+\.[0-9]+ / p-6 md:p-8 /g' "$file"
  sed -i -E '/clay-card|neumorphic-card/s/ p-[0-9]+ sm:p-[0-9]+ / p-6 md:p-8 /g' "$file"
  sed -i -E '/clay-card|neumorphic-card/s/ p-[0-9]+ md:p-[0-9]+ / p-6 md:p-8 /g' "$file"
done
