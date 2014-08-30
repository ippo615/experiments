files="
	src/sets.js
	src/contains.js
	src/add-member.js
	src/del-member.js
	src/cardinality.js
	src/equality.js
	src/copy.js
	src/union.js
	src/merge.js
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

function text(){
	# Concatinate each file with a blank lin inbetween
	for f in $files; do
		cat "${f}"
		echo
	done;
}

COLOR_PASS='\E[0;32m'
COLOR_WARN='\E[0;33m'
COLOR_FAIL='\E[0;31m'


function make_test(){
	lib > "tmp/lib.js"
	# Remove the old tests
	rm -f tmp/test*
	# Make tests for each source file
	for f in $files; do
		name=$(echo "$f" | sed -e 's|/|_|g' )
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
		awk "{print \$0 > \"tmp/test_$name\" NR}" RS='\n\n'
	done;
}

function make_perf(){
	make_test
	# TODO: add performance tracking to test code
}

function run_test(){
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
			echo -ne " testing $t "
			echo " -- $output"
		fi
	done;
}

function setup(){
	mkdir "tmp"
}
function clean(){
	rm -r "tmp"
}

setup
#text > tmp/output.md
#lib > tmp/lib.js
make_test
run_test
clean
