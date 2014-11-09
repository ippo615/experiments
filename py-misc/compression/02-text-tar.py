import tarfile

# This tries to add the files named 'foo', 'bar', and 'quux' to a
# new tar archive but those files don't exist so an error is raised.

with tarfile.open("sample.tar", "w") as tar:
	for name in ["foo", "bar", "quux"]:
		tar.add(name)
