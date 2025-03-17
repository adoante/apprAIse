from database.sql_helper import *

# You can uncomment the whole file to add dummy test data.
# You only need to run it once or you'll get an error b/c the
# dummy data was already added. You can also just uncomment the parts
# you need to test.


# with Session(engine) as session:
# 	user = User(
# 		user_id=0,
# 		user_name="testUser",
# 		first_name="test",
# 		last_name="user",
# 		email="test@user.com",
# 		password_hash="hashed-password",
# 		qai_hub_api_token="qai-api-token",
# 		customization_id=None)
# 	session.add(user)
# 	session.commit()
# print(get_user(0))

# with Session(engine) as session:
# 	customization = Customization(customization_id=0)
# 	session.add(customization)
# 	session.commit()
# print(get_customization(0))

# with Session(engine) as session:
# 	favorite = Favorite(favorites_id=0, user_id=0, model_id=0)
# 	session.add(favorite)
# 	session.commit()
# print(get_favorite(0))

# with Session(engine) as session:
# 	chipset = Chipset(chipset_id=0, name="chipset-name", manufacturer="man", version="1.0")
# 	session.add(chipset)
# 	session.commit()
# print(get_chipset(0))

# with Session(engine) as session:
# 	model = Model(
# 		model_id=0,
# 		name="name",
# 		github_link="link",
# 		hugging_face_link="link",
# 		research_paper_link="link",
# 		model_end_point="endpoint",
# 		input_resolution="ir",
# 		parameters='param',
# 		model_size="size"
# 	)
# 	session.add(model)
# 	session.commit()
# print(get_model(0))

# with Session(engine) as session:
# 	device = Device(
# 		device_id=0,
# 		device_name="name",
# 		device_industry="industry",
# 		device_company="company",
# 		chipset_id=0
# 	)
# 	session.add(device)
# 	session.commit()
# print(get_device(0))

# with Session(engine) as session:
# 	benchmark = Benchmark(
# 		benchmark_id=0,
# 		accuracy_top1=0.0,
#     	accuracy_top5=1.0,
# 		device_id=2,
# 		model_id=0,
# 		library_id=0
# 	)
# 	session.add(benchmark)
# 	session.commit()
# print(get_benchmark(0))

# with Session(engine) as session:
# 	benchmark = Benchmark(
# 		benchmark_id=1,
# 		accuracy_top1=1.0,
#     	accuracy_top5=0.0,
# 		device_id=1,
# 		model_id=0,
# 		library_id=1
# 	)
# 	session.add(benchmark)
# 	session.commit()
# print(get_benchmark(1))

# with Session(engine) as session:
# 	library = Library(
# 		library_id=0,
# 		library_name="library_0"
# 	)
# 	session.add(library)
# 	session.commit()
# print(get_library(0))

# with Session(engine) as session:
# 	library = Library(
# 		library_id=1,
# 		library_name="library_1"
# 	)
# 	session.add(library)
# 	session.commit()
# print(get_library(1))

# benchmarks = get_all_benchmarks()
# print(bool(benchmarks))