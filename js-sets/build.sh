files="
	sets.js
	merge.js
"

for f in $files; do
	grep '^	' "$f"
done;

cat test.js
