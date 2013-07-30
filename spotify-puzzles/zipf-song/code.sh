#!/bin/bash

# Read the first line into the number of elements and number to print
read n_songs n_selected

# Copy the input
lines=""
while read line; do
	lines=$(printf "%s\n%s" "$lines" "$line")
done

# Get rid of the leading blank line
lines=$(printf "%s" "$lines" | tail -n +2)

# Add 'original index numbers': NR=Number_Row, $0=string of the entire line
lines=$(printf "%s" "$lines" | awk '{printf "%5d %s\n", NR, $0}')

# Sort by the frequency lowest to highest (g=by number, k=which column? 2,
# r=reversed [high->low])
#sorted=$(printf "%s" "$lines" | sort --stable -grk 2)
sorted="$lines"

# Compute zipf scores
zipfed=$(printf "%s" "$sorted" | awk '{if(NR==1){base=$2} printf "%10g %s\n", base/NR, $0}')

# Compute quality ($3/$1 = frequency / zipf)
quality=$(printf "%s" "$zipfed" | awk '{printf "%10g %s\n", $3/$1, $0}')

# Reorder the columns and sort: quality, index, frequency, zipf, name
final=$(printf "%s" "$quality" | awk '{printf "%10g %5d %10d %10d %s\n", $1, $3, $4, $2, $5, $0}')
final=$(printf "%s" "$final" | sort --stable -grk 1)

#Print the top (however may specified)
echo "$final" | head -n "$n_selected" | awk '{printf "%s\n", $5}'
