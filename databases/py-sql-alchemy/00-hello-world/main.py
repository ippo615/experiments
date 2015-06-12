from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence

Base = declarative_base()
class Person(Base):
	__tablename__ = 'persons'
	
	id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
	name = Column(String)
	age = Column(Integer)

	def  __repr__(self):
		return '<Person (name=%s, age=%s)>' % (
			self.name,
			self.age,
		)

engine = create_engine('sqlite:///:memory:', echo=False)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

amy = Person( name='Amy', age=52 )
bob = Person( name='Bob', age=48 )
session.add( amy )
session.add( bob )

print session.query(Person).filter_by(name='Bob').first()
