
There are some things to note. First, the file is signed with the
private key. Second the sha256 signature is a separate file that has
to be distributed with the original file.

To sign the file:

	openssl dgst -sha256 -sign ../00-generate-keys/private.pem -out file.txt.sha256 file.txt

To verify:

	openssl dgst -sha256 -verify ../00-generate-keys/public.pem -signature file.txt.sha256 file.txt

