#!/bin/bash
for file in $(grep -rl "clay-card\|neumorphic-card" src/); do
  # Replace standalone p-6 with p-6 md:p-8 where not already followed by md:p-8
  sed -i -E '/clay-card|neumorphic-card/ {
    s/ p-6 / p-6 md:p-8 /g
    s/ p-6"/ p-6 md:p-8"/g
    s/"p-6 /"p-6 md:p-8 /g
    s/ p-6`/ p-6 md:p-8`/g
    s/`p-6 /`p-6 md:p-8 /g
    s/ md:p-8 md:p-8 / md:p-8 /g
    s/ md:p-8 md:p-8"/ md:p-8"/g
    s/ md:p-8 md:p-8`/ md:p-8`/g
  }' "$file"
done
