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
function lib(){
	for f in $files; do
		# For now the first part of the file is the implementation and
		# the second part contains the tests/examples so
		sed -e '/^##.*\(example\|propert\)/Iq' "$f" |\
		grep '^	' |\
		sed -e 's_^\t__g'
	done;
}


COLOR_PASS='\E[0;32m'
COLOR_WARN='\E[0;33m'
COLOR_FAIL='\E[0;31m'


function test(){
	lib > "tmp/lib.js"
	for f in $files; do
		# Remov the old tests
		rm -f tmp/test*
		# For now the first part of the file is the implementation and
		# the second part contains the tests/examples so
		sed -n -e '/^##.*\(example\|propert\).*$/I,$p' "$f" |\
		# Instead of grepping for lines that are code `grep '^	' "$f"`
		# remove all lines that are not code, this preserves blank lines
		sed -e 's_^[^\t].*$__g' |\
		# Compress consequtive blank lines into 1
		uniq |\
		# Create 1 file per test, each test is separated by a blank
		# line. The files will be called tmp/test0, tmp/test1, ...
		awk '{print $0 > "tmp/test" NR}' RS='\n\n'

		# Run every test and output if it passed/failed and any output
		for t in tmp/test*; do
			if [ -f "$t" ]; then
				output=$(cat "tmp/lib.js" "$t" | nodejs 2>&1)

				if [[ $? -eq 0 ]]; then
					echo -ne ${COLOR_PASS}
					echo -ne "PASSED"
				else
					echo -ne ${COLOR_FAIL}
					echo -ne "FAILED"
				fi
				tput sgr0
				echo -ne " testing $t in $f"
				echo " -- $output"
			fi
		done;
	done;
}

function setup(){
	mkdir "tmp"
}
function clean(){
	rm -r "tmp"
}

#lib
setup 
test
clean
