from kivy.uix.widget import Widget
from kivy.properties import ObjectProperty
from kivy.vector import Vector
from random import randint

class PongGame(Widget):
	ball = ObjectProperty(None)

	def serve_ball(self):
		self.ball.center = self.center
		self.ball.velocity = Vector(4, 0).rotate(randint(0, 360))

	def update(self, dt):
		self.ball.move()

		#bounce off top and bottom
		if (self.ball.y < 0) or (self.ball.top > self.height):
			self.ball.velocity_y *= -1

		#bounce off left and right
		if (self.ball.x < 0) or (self.ball.right > self.width):
			self.ball.velocity_x *= -1
