import subprocess

if __name__ == '__main__':
	process = subprocess.Popen(
		['cat'],
		stdin=subprocess.PIPE,
		stdout = subprocess.PIPE
	)
	import time
	time.sleep( 2.0 )
	(out,err) = process.communicate('hello world')
	print out
