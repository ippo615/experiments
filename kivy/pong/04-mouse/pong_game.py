from kivy.uix.widget import Widget
from kivy.properties import ObjectProperty
from kivy.vector import Vector
from random import randint

class PongGame(Widget):
	
	ball = ObjectProperty(None)
	player1 = ObjectProperty(None)
	player2 = ObjectProperty(None)

	def serve_ball(self, vel=(4, 0)):
		self.ball.center = self.center
		self.ball.velocity = vel

	def update(self, dt):
		self.ball.move()

		#bounce of paddles
		self.player1.bounce_ball(self.ball)
		self.player2.bounce_ball(self.ball)

		#bounce ball off bottom or top
		if (self.ball.y < self.y) or (self.ball.top > self.top):
			self.ball.velocity_y *= -1

		#went of to a side to score point?
		if self.ball.x < self.x:
			self.player2.score += 1
			self.serve_ball(vel=(4, 0))
		if self.ball.x > self.width:
			self.player1.score += 1
			self.serve_ball(vel=(-4, 0))

	def on_touch_move(self, touch):
		if touch.x < self.width / 3:
			self.player1.center_y = touch.y
		if touch.x > self.width - self.width / 3:
			self.player2.center_y = touch.y
			
