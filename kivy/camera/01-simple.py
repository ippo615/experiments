from kivy.uix.camera import Camera

from kivy.app import App
from kivy.uix.widget import Widget

class CameraApp(App):

	def build(self):
		# I can only get the camera to work if I set the resolution
		return Camera(
			play=True,
			resolution=(640,480)
		)

if __name__ == '__main__':
	app = CameraApp()
	app.run()

