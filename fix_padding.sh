#!/bin/bash
for file in src/pages/*.tsx; do
  sed -i -E 's/px-4 sm:px-[0-9]+ lg:px-[0-9]+/px-4 md:px-8/g' "$file"
  sed -i -E 's/max-w-\[1200px\]/max-w-7xl/g' "$file"
  sed -i -E 's/max-w-\[1400px\]/max-w-7xl/g' "$file"
  sed -i -E 's/max-w-\[1600px\]/max-w-7xl/g' "$file"
done
