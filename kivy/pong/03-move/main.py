from kivy.app import App
from kivy.clock import Clock

# Note: You need to import PongBall here (even though it is not
# explicitely uses otherwise it will raise an exception:
# kivy.factory.FactoryException: Unknown class <PongBall>
from pong_game import PongGame
from pong_ball import PongBall

class PongApp(App):
	def build(self):
		game = PongGame()
		game.serve_ball()
		Clock.schedule_interval(game.update, 1.0 / 60.0)
		return game

if __name__ == '__main__':
	PongApp().run()
