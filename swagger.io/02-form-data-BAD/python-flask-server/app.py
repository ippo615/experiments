
import logging

import connexion

if __name__ == '__main__':

	logging.basicConfig(level=logging.INFO)

	app = connexion.App(
		__name__,
		8080,
		specification_dir='./swagger/'
	)
	app.add_api('swagger.yaml')
	app.run()
