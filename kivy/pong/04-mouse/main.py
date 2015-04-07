__version__ = '0.0.1'

# https://github.com/kivy/kivy

# To build for android:
# cd to/this/directory
# buildozer init # and modify the *.spec file to suit your needs
# buildozer android debug # or 'release' 

from kivy.app import App
from kivy.clock import Clock

# Note: You need to import PongBall here (even though it is not
# explicitely uses otherwise it will raise an exception:
# kivy.factory.FactoryException: Unknown class <PongBall>
from pong_game import PongGame
from pong_ball import PongBall
from pong_paddle import PongPaddle

class PongApp(App):
	def build(self):
		game = PongGame()
		game.serve_ball()
		Clock.schedule_interval(game.update, 1.0 / 60.0)
		return game

if __name__ == '__main__':
	PongApp().run()
