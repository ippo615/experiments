
To sign `file.txt` with the default key and store the result into
`file.txt.signed` run:

	gpg --output file.txt.signed --clearsign file.txt

To verify the signature:

	gpg --verify file.txt.signed
