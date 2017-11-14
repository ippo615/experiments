
To encrypt/decrypt manually (ie with a typed password):

	openssl enc -aes-256-cbc -in file.txt -out file.txt.enc
	openssl enc -aes-256-cbc -d -in file.txt.enc -out file.txt.dec

To encrypt/decrypt with public/private keypair:

	openssl rsautl -encrypt -inkey ../00-generate-keys/public.pem -pubin -in file.txt -out file.txt.enc
	openssl rsautl -decrypt -inkey ../00-generate-keys/private.pem -in file.txt.enc -out file.txt.dec
