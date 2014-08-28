files="
	sets.js
	contains.js
	add-member.js
	del-member.js
	cardinality.js
	equality.js
	copy.js
	union.js
	merge.js
"

for f in $files; do
	grep '^	' "$f"
done;

cat test.js
