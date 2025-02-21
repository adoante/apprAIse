from database.database_init import engine, Hero
from sqlmodel import Session, select

def get_hero(name: str):
	with Session(engine) as session:
		statement = select(Hero).where(Hero.name == name)
		hero = session.exec(statement).first()
		if (hero != None):
			return {
				"id": hero.id,
				"name": hero.name,
				"secret_name": hero.secret_name,
				"name": hero.name
			}
	return {
		"error": {
			"code": 404,
			"message": "Hero not found"
		}
	}