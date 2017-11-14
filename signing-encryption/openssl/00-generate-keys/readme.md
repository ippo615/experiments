
Generate the public/private keypair in (private.pem):

	openssl genrsa -aes256 -out private.pem 2048

Export the public portion:

	openssl rsa -in private.pem -outform PEM -pubout -out public.pem
