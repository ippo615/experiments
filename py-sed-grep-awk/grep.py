#!/usr/bin/env python
import sys
import re

def grep(matches,lines,**options):

	# Configure the regular expression options
	regexOptions = 0
	if 'ignore_case' in options:
		regexOptions = regexOptions | re.I

	# Create the array of regular expressions and counts
	regexMatches = []
	if 'multiple' in options or isinstance(matches,list):
		for match in matches:
			regexMatches.append( re.compile(match,regexOptions) )
	else:
		regexMatches.append( re.compile(matches,regexOptions) )

	# Start with no results and 0 counts:
	results = []
	count = 0

	for line in lines:

		# Look for matches in any of the regexes
		isMatched = False
		for regex in regexMatches:
			if re.search(regex,line) != None:
				isMatched = True
				reMatch = regex
				break;

		if isMatched:
			if not 'invert_match' in options:
				if 'only_matching' in options:
					for each in re.finditer(reMatch,line):
						results.append(each.group(0))
						count += 1
				else:
					results.append( line )
					count += 1
		else:
			if 'invert_match' in options:
				results.append(line)
				count += 1

	if 'count' in options:
		return count
	else:
		return results

def grep_simple(match,lines):
	reMatch = re.compile(match)
	out = []
	for line in lines:
		if re.search(reMatch,line) != None:
			out.append(line)
	return out	

# ---------------------------------------------------------------------- Main:
test = """When looking for some stuff in words
You ought to look trough it in thrids

For if you did it one by one
you simply never would get done

So give the task to grep, I say
to find the needle in hay"""

print grep('to',test.split('\n'),count=True)
print grep('.o',test.split('\n'),only_matching=True)
print grep('VE',test.split('\n'),ignore_case=True)
print grep('a',test.split('\n'),invert_match=True)
print grep('xxx',test.split('\n'))
print grep('[oe][nv]e',test.split('\n'))
print grep(['to','by','for','in'],test.split('\n'),multiple=True)

# Read each line, one at time from stdin
#for line in sys.stdin:
	# Manipulate the line
	# Write the data to stdout
	#print line.strip('\n')
