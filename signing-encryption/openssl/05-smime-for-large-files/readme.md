
Generate the public and private keys:

	openssl req -x509 -nodes -newkey rsa:2048 -keyout private-key.pem -out public-key.pem

Create a random password for encrypting the file:

	openssl rand -base64 2048 > passwd.txt

Encrypt the data with the random password. Encrypt the random
password with the public key:

	openssl enc -aes-256-cbc -a -salt -in data -out data.crypt -pass file:passwd.txt
	openssl smime -encrypt -binary -in passwd.txt -out data.crypt.pass -aes256 public-key.pem

Decrypt the random password with the private key. Decrypt the data with
the random password:

	openssl smime -decrypt -binary -in data.crypt.pass -out passwd.tmp -aes256 -inkey private-key.pem
	openssl enc -d -aes-256-cbc -a -in data.crypt -out data.decrypt -pass file:passwd.tmp
