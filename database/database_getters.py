from database.database_init import engine, Hero
from sqlmodel import Session, select

def get_hero(name: str):
	with Session(engine) as session:
		statement = select(Hero).where(Hero.name == name)
		hero = session.exec(statement).first()	
	return hero