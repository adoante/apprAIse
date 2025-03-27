from database.sql_helper import *

# Chipset Data
chipsets_data = [
	("Qualcomm Snapdragon 845", "Qualcomm", "845"),
	("Qualcomm Snapdragon 670", "Qualcomm", "670"),
	("Qualcomm Snapdragon 855", "Qualcomm", "855"),
	("Qualcomm Snapdragon 730G", "Qualcomm", "730G"),
	("Qualcomm Snapdragon 765G", "Qualcomm", "765G"),
	("Qualcomm Snapdragon 888", "Qualcomm", "888"),
	("Qualcomm Snapdragon 8 Gen 1", "Qualcomm", "8 Gen 1"),
	("Qualcomm Snapdragon 8 Gen 2", "Qualcomm", "8 Gen 2"),
	("Qualcomm Snapdragon 8 Gen 3", "Qualcomm", "8 Gen 3"),
	("Qualcomm 8 Elite", "Qualcomm", "8 Elite")
]

# Device Data
devices_data = [     
	("google pixel 3", "mobile", "Google", 1),
    ("google pixel 3a", "mobile", "Google", 2),
    ("google pixel 3a XL", "mobile", "Google", 2),
    ("google pixel 4", "mobile", "Google", 3),
    ("google pixel 4a", "mobile", "Google", 4),
    ("google pixel 5a 5G", "mobile", "Google", 5),
    ("Samsung Galaxy S21", "mobile", "Samsung", 6),
    ("Samsung Galaxy S21 Ultra", "mobile", "Samsung", 6),
    ("Samsung Galaxy S21+", "mobile", "Samsung", 6),
    ("Samsung Galaxy S22 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S22 Ultra 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S22+ 5G", "mobile", "Samsung", 7),
    ("Samsung Galaxy S23", "mobile", "Samsung", 8),
    ("Samsung Galaxy S23 Ultra", "mobile", "Samsung", 8),
    ("Samsung Galaxy S23+", "mobile", "Samsung", 8),
    ("Samsung Galaxy S24", "mobile", "Samsung", 9),
    ("Samsung Galaxy S24 Ultra", "mobile", "Samsung", 9),
    ("Samsung Galaxy S24+", "mobile", "Samsung", 9),
    ("Samsung Galaxy Tab S8", "tablet", "Samsung", 6),
    ("Snapdragon 8 Elite QRD", "mobile", "Qualcomm", 10),
    ("Xiaomi 12", "mobile", "Xiaomi", 7),
    ("Xiaomi 12 Pro", "mobile", "Xiaomi", 7)
]

library_data = [
	"tflite",
	"onnx"
]


# accuracy_top1,
# accuracy_top5,
# inference_time: float
# memory_usage: int
# npu_layers: int
# device_id,
# model_id,
# library_id

benchmark_data = [
	(77.12, 99.33, 3.40, 88, 79,"Samsung Galaxy S24", "wideresnet50", "tflite"),
	(79.94, 94.78, 7.09, 282, 1579,"Samsung Galaxy S24", "vit", "tflite"),
	(79.18, 94.5, 5.69, 154, 837,"Samsung Galaxy S24", "swin_tiny", "tflite"),
	(81.98, 95.88, 11.8, 258, 1563,"Samsung Galaxy S24", "swin_small", "tflite"),
	(81.9, 95.97, 14.5, 375, 1568,"Samsung Galaxy S24", "swin_base", "tflite"),
	(54.83, 78.11, 0.413, 18, 41,"Samsung Galaxy S24", "squeezenet1_1", "tflite"),
	(56.2, 78.47, 0.366, 21, 159, "Samsung Galaxy S24", "shufflenet_v2", "tflite"),
	(77.07, 93.24, 1.22, 41, 82, 'Samsung Galaxy S24', 'wideresnet50_quantized', 'tflite'),
	(54.65, 77.99, 0.163, 17, 43, 'Samsung Galaxy S24', 'squeezenet1_1_quantized', 'tflite'),
	(55.82, 78.06, 0.210, 18, 175, 'Samsung Galaxy S24', 'shufflenet_v2_quantized', 'tflite'),
	(79.87, 94.78, 0.657, 50, 82, 'Samsung Galaxy S24', 'resnext50_quantized', 'tflite'),
]

# model_name: str
# github_link: str
# hugging_face_link: str
# research_paper_link: str
# qai_hub_link: str
# model_end_point: str
# input_resolution: str
# parameters: str
# model_size: str

model_data = [
	(
		"wideresnet50_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/wideresnet50_quantized",
		"https://huggingface.co/qualcomm/WideResNet50-Quantized",
		"https://arxiv.org/abs/1605.07146",
		"https://aihub.qualcomm.com/models/wideresnet50_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		68.9,
		66.6
	),
	(
		"wideresnet50",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/wideresnet50",
		"https://huggingface.co/qualcomm/WideResNet50",
		"https://arxiv.org/abs/1605.07146",
		"https://aihub.qualcomm.com/models/wideresnet50?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		68.8,
		263
	),
	(
		"vit",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/vit",
		"https://huggingface.co/qualcomm/VIT",
		"https://arxiv.org/abs/2010.11929",
		"https://aihub.qualcomm.com/models/vit?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		86.6,
		330
	),
	(
		"swin_tiny",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/swin_tiny",
		"https://huggingface.co/qualcomm/Swin-Tiny",
		"https://arxiv.org/abs/2103.14030",
		"https://aihub.qualcomm.com/models/swin_tiny?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		28.8,
		110
	),
	(
		"swin_small",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/swin_small",
		"https://huggingface.co/qualcomm/Swin-Small",
		"https://arxiv.org/abs/2103.14030",
		"https://aihub.qualcomm.com/models/swin_small?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		50.4,
		193
	),
	(
		"swin_base",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/swin_base",
		"https://huggingface.co/qualcomm/Swin-Base",
		"https://arxiv.org/abs/2103.14030",
		"https://aihub.qualcomm.com/models/swin_base?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		88.8,
		339,
	),
	(
		"squeezenet1_1_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/squeezenet1_1_quantized",
		"https://huggingface.co/qualcomm/SqueezeNet-1_1Quantized",
		"https://arxiv.org/abs/1602.07360",
		"https://aihub.qualcomm.com/models/squeezenet1_1_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		1.24,
		1.30,
	),
	(
		"squeezenet1_1",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/squeezenet1_1",
		"https://huggingface.co/qualcomm/SqueezeNet-1_1",
		"https://arxiv.org/abs/1602.07360",
		"https://aihub.qualcomm.com/models/squeezenet1_1?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		1.24,
		4.73,
	),
	(
		"shufflenet_v2_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/shufflenet_v2_quantized",
		"https://huggingface.co/qualcomm/Shufflenet-v2Quantized",
		"https://arxiv.org/abs/1807.11164",
		"https://aihub.qualcomm.com/models/shufflenet_v2_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		1.37,
		4.42,
	),
	(
		"shufflenet_v2",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/shufflenet_v2",
		"https://huggingface.co/qualcomm/Shufflenet-v2",
		"https://arxiv.org/abs/1807.11164",
		"https://aihub.qualcomm.com/models/shufflenet_v2?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		1.36,
		5.25,
	),
	(
		"resnext50_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/resnext50_quantized",
		"https://huggingface.co/qualcomm/ResNeXt50Quantized",
		"https://arxiv.org/abs/1611.05431",
		"https://aihub.qualcomm.com/models/resnext50_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		88.7,
		87.3,
	),
]

SQLModel.metadata.create_all(engine)

# Insert Data
with Session(engine) as session:
	#Add all of the chipsets to the database
	for chipset_name, chipset_manufacturer, chipset_version in chipsets_data:
		chipset = Chipset(chipset_name=chipset_name, manufacturer=chipset_manufacturer, version=chipset_version)
		session.add(chipset)

	#Add all of the devices to the database
	for device_name, device_industry, device_company, chipset_id in devices_data:
		device = Device(device_name= device_name, device_industry= device_industry, device_company= device_company, chipset_id= chipset_id)
		session.add(device)

	# Add libraries
	for library_name in library_data:
		library = Library(library_name=library_name)
		session.add(library)

	# Add models
	for model in model_data:
		ai_model = Model(model_name=model[0],
				   github_link=model[1],
				   hugging_face_link=model[2],
				   research_paper_link=model[3],
				   qai_hub_link=model[4],
				   model_end_point=model[5],
				   input_resolution=model[6],
				   parameters=model[7],
				   model_size=model[8])
		session.add(ai_model)

	# Add benchmarks
	for benchmark in benchmark_data:
		library = session.exec(select(Library).where(Library.library_name == benchmark[7])).first().library_id
		model = session.exec(select(Model).where(Model.model_name == benchmark[6])).first().model_id
		device = session.exec(select(Device).where(Device.device_name == benchmark[5])).first().device_id
		ai_benchmark = Benchmark(
			accuracy_top1=benchmark[0],
			accuracy_top5=benchmark[1],
			inference_time=benchmark[2],
			memory_usage=benchmark[3],
			npu_layers=benchmark[4],
			device_id=device,
			model_id=model,
			library_id=library)
		session.add(ai_benchmark)
		
	session.commit()