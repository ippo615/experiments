
import connexion

if __name__ == '__main__':
	app = connexion.App(
		__name__,
		8080,
		specification_dir='./swagger/'
	)
	app.add_api('hello-world.yaml')
	app.run()
