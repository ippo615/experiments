Goal: send a signed and encrypted file. We'll have 2 people for the
sake of argument: "factory" and "product."

APPARENTLY THIS DOESN'T WORK, IT COMPLAINS THE FILE IS TOO SMALL.

First, generate the public/private key for signing:

	openssl genrsa -des3 -out signature.private.pem 2048
	openssl rsa -in signature.private.pem -outform PEM -pubout -out signature.public.pem

Second, generate the public/private key for encrypting:

	openssl genrsa -des3 -out encryption.private.pem 2048
	openssl rsa -in encryption.private.pem -outform PEM -pubout -out encryption.public.pem

Distribute the public key to the product and keep the private key
at the factory.

Then sign the actual data to be sent:

	openssl dgst -sha256 -sign signature.private.pem -out data.sha256 data

And append it to the end of the original file (because I just want to
send 1 file):

	cat data data.sha256 > data.signed

Generate a symmetric key for encryption:

	openssl rand 256 > symmetric.key

Encrypt the data:

	openssl enc -aes-256-cbc -salt -in data.signed -out data.signed.enc -pass file:./symmetric.key

Encrypt the key:

	openssl rsautl -encrypt -inkey encryption.public.pem -pubin -in symmetric.key -out symmetric.key.enc

Append the things:

	cat data.signed.enc symmetric.key.enc > data.complete

