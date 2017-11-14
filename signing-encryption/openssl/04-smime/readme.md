
Generate the private and public key:

	openssl req -x509 -nodes -newkey rsa:2048 -keyout private-key.pem -out public-key.pem

Encrypt the file:

	openssl smime -encrypt -binary -aes-256-cbc -in file -out file.enc -outform DER public-key.pem

Decrypt the file:

	openssl smime -decrypt -in file.enc -binary -inform DEM -inkey private-key.pem -out file.dec
