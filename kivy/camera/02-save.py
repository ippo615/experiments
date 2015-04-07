from kivy.uix.camera import Camera
from kivy.uix.button import Button
from kivy.uix.floatlayout import FloatLayout

from kivy.app import App
from kivy.uix.widget import Widget

class CameraApp(App):

	def build(self):
		layout = FloatLayout()

		cam = Camera(
			play=True,
			resolution=(640,480),
			size_hint=(1.0, 1.0),
			pos=(0, 0)
		)

		def save_camera_snapshot(*args):
			import time
			name = time.asctime()
			# This requires Kivy v1.9.0 (I'm using v1.7.2)
			cam.export_to_png( name )

		btnSave = Button(
			text = 'Save',
			size_hint = (1.0,0.1)
		)
		btnSave.bind( on_press = save_camera_snapshot )

		layout.add_widget( cam )
		layout.add_widget( btnSave )

		return layout

if __name__ == '__main__':
	app = CameraApp()
	app.run()

