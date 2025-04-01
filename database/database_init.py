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
	## Samsung Galaxy S24 (Family)

	# TFlite
	(77.07, 93.24, 1.37, 100, 82, "Samsung Galaxy S24", "wideresnet50_quantized", "tflite"),
	(77.12, 99.33, 3.64, 173, 79, "Samsung Galaxy S24", "wideresnet50", "tflite"),
	(79.94, 94.78, 9.05, 283, 1579, "Samsung Galaxy S24", "vit", "tflite"),
	(79.18, 94.5, 7.36, 162, 837, "Samsung Galaxy S24", "swin_tiny", "tflite"),
	(81.98, 95.88, 12.4, 264, 1563,  "Samsung Galaxy S24", "swin_small", "tflite"),
	(81.9, 95.97, 15.8, 377, 1568, "Samsung Galaxy S24", "swin_base", "tflite"),
	(54.65, 77.99, 0.144, 19, 43, "Samsung Galaxy S24", "squeezenet1_1_quantized", "tflite"),
	(54.83, 78.11, 0.424, 24, 41, "Samsung Galaxy S24", "squeezenet1_1", "tflite"),
	(55.82, 78.06, 0.229, 25, 175,  "Samsung Galaxy S24", "shufflenet_v2_quantized", "tflite"),
	(56.2, 78.47, 0.453, 29, 159, "Samsung Galaxy S24", "shufflenet_v2", "tflite"),
	(79.87, 94.78, 0.701, 54, 82, "Samsung Galaxy S24", "resnext50_quantized", "tflite"),
	(83.79, 96.54, 13.7, 271, 675, 'Samsung Galaxy S24', 'efficientvit_l2_cls', 'tflite'),
	(67.49, 88.0, 0.611, 39, 84, 'Samsung Galaxy S24', 'googlenet', 'tflite'),
	(67.28, 87.92, 0.199, 31, 86, 'Samsung Galaxy S24', 'googlenet_quantized', 'tflite'),
	(67.79, 87.77, 0.999, 93, 129, 'Samsung Galaxy S24', 'inception_v3', 'tflite'),
	(67.28, 87.92, 0.492, 55, 142,  'Samsung Galaxy S24', 'inception_v3_quantized', 'tflite'),
	(71.3, 89.89, 0.795, 46, 306, 'Samsung Galaxy S24', 'levit', 'tflite'),
	(64.61, 85.35, 0.485, 29, 71, 'Samsung Galaxy S24', 'mnasnet05', 'tflite'),
	(63.79, 85.61, 3.31, 46, 577, 'Samsung Galaxy S24', 'mobile_vit', 'tflite'),
	(69.2, 88.99, 0.572, 36, 71, 'Samsung Galaxy S24', 'mobilenet_v2', 'tflite'),
	(67.38, 87.87, 0.314, 31, 108, 'Samsung Galaxy S24', 'mobilenet_v2_quantized', 'tflite'),
	(71.63, 90.1, 0.649, 37, 128, 'Samsung Galaxy S24', 'mobilenet_v3_large', 'tflite'),
	(70.57, 89.44, .248, 30, 137, 'Samsung Galaxy S24', 'mobilenet_v3_large_quantized', 'tflite'),

	# ONNX
	(77.08, 93.25, 15.50, 466, 151, "Samsung Galaxy S24", "wideresnet50_quantized", "onnx"),
	(77.12, 93.34, 3.980, 36, 128, "Samsung Galaxy S24", "wideresnet50", "onnx"),
	(79.95, 94.77, 10.00, 73, 976, "Samsung Galaxy S24", "vit", "onnx"),
	(80.68, 95.37, 9.390, 89, 623, "Samsung Galaxy S24", "swin_tiny", "onnx"),
	(82.60, 96.23, 15.70, 138, 1145, "Samsung Galaxy S24", "swin_small", "onnx"),
	(83.04, 96.45, 20.40, 172, 1150, "Samsung Galaxy S24", "swin_base", "onnx"),
	(54.62, 77.93, 0.343, 24, 47, "Samsung Galaxy S24", "squeezenet1_1_quantized", "onnx"),
	(54.84, 78.12, 0.357, 27, 71, "Samsung Galaxy S24", "squeezenet1_1", "onnx"),
	(55.89, 78.07, 5.760, 191, 259,  "Samsung Galaxy S24", "shufflenet_v2_quantized", "onnx"),
	(56.22, 78.48, 0.625, 27, 223, "Samsung Galaxy S24", "shufflenet_v2", "onnx"),
	(79.92, 94.76, 1.520, 72, 147, "Samsung Galaxy S24", "resnext50_quantized", "onnx"),

	## Samsung Galaxy S23 (Family)

	# TFlite
	(77.07, 93.24, 1.76, 340, 82, 'Samsung Galaxy S23', 'wideresnet50_quantized', 'tflite'),
	(72.36, 87.72, 4.91, 1000, 79, 'Samsung Galaxy S23', 'wideresnet50', 'tflite'),
	(79.94, 94.77, 13.2, 11, 1579, 'Samsung Galaxy S23', 'vit', 'tflite'),
	(79.18, 94.5, 11.1, 16, 837, 'Samsung Galaxy S23', 'swin_tiny', 'tflite'),
	(81.98, 95.89, 18.5, 28, 1563, 'Samsung Galaxy S23', 'swin_small', 'tflite'),
	(81.91, 95.98, 22.4, 32, 1568, 'Samsung Galaxy S23', 'swin_base', 'tflite'),
	(54.65, 77.99, 0.198, 3, 43, 'Samsung Galaxy S23', 'squeezenet1_1_quantized', 'tflite'),
	(54.82, 78.11, 0.618, 17, 41, 'Samsung Galaxy S23', 'squeezenet1_1', 'tflite'),
	(55.82, 78.06, 0.313, 8, 175, 'Samsung Galaxy S23', 'shufflenet_v2_quantized', 'tflite'),
	(56.2, 78.47, 0.695, 27, 159, 'Samsung Galaxy S23', 'shufflenet_v2', 'tflite'),
	(79.87, 94.78, 0.910, 66, 82, 'Samsung Galaxy S23', 'resnext50_quantized', 'tflite'),

	# ONNX
	(77.09, 93.25, 18.6, 212, 151, 'Samsung Galaxy S23', 'wideresnet50_quantized', 'onnx'),
	(77.12, 93.34, 5.43, 297, 128, 'Samsung Galaxy S23', 'wideresnet50', 'onnx'),
	(3.39, 4.37, 14.3, 348, 976, 'Samsung Galaxy S23', 'vit', 'onnx'),
	(80.68, 95.38, 13.4, 131, 623, 'Samsung Galaxy S23', 'swin_tiny', 'onnx'),
	(82.59, 96.23, 22.9, 224, 1145, 'Samsung Galaxy S23', 'swin_small', 'onnx'),
	(83.04, 96.46, 29, 343, 1150, 'Samsung Galaxy S23', 'swin_base', 'onnx'),
	(54.62, 77.93, 0.481, 7, 47, 'Samsung Galaxy S23', 'squeezenet1_1_quantized', 'onnx'),
	(54.83, 78.12, 0.515, 10, 71, 'Samsung Galaxy S23', 'squeezenet1_1', 'onnx'),
	(55.89, 78.07, 7.56, 56, 259, 'Samsung Galaxy S23', 'shufflenet_v2_quantized', 'onnx'),
	(56.22, 78.48, 1.03, 13, 223, 'Samsung Galaxy S23', 'shufflenet_v2', 'onnx'),
	(79.92, 94.76, 2.24, 45, 147, 'Samsung Galaxy S23', 'resnext50_quantized', 'onnx'),
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
		66.6,
		"Images/tulip.PNG",
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
		263,
		"Images/tulip.PNG",
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
		330,
		"Images/jaguar.PNG",
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
		110,
		"Images/monkey.PNG",
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
		193,
		"Images/cow.PNG",
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
		"Images/otter.PNG",
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
		"Images/golf_cart.PNG",
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
		"Images/golf_cart.PNG",
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
		"Images/pencil.PNG",
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
		"Images/pencil.PNG",
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
		"Images/mouse.PNG",
	),
	(
		"efficientvit_l2_cls",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/efficientvit_l2_cls",
		"https://huggingface.co/qualcomm/EfficientViT-l2-cls",
		"https://arxiv.org/abs/2205.14756",
		"https://aihub.qualcomm.com/models/efficientvit_l2_cls?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		64,
		243,
		"Images/raven.PNG",
	),
	(
		"googlenet",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/googlenet",
		"https://huggingface.co/qualcomm/GoogLeN",
		"https://arxiv.org/abs/1409.4842",
		"https://aihub.qualcomm.com/models/googlenet?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		6.62,
		25.3,
		"Images/dolphin.PNG",
	),
	(
		"googlenet_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/googlenet_quantized",
		"https://huggingface.co/qualcomm/GoogLeNetQuantized",
		"https://arxiv.org/abs/1409.4842",
		"https://aihub.qualcomm.com/models/googlenet_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		6.62,
		6.55,
		"Images/dolphin.PNG",
	),
	(
		"inception_v3",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/inception_v3",
		"https://huggingface.co/qualcomm/Inception-v3",
		"https://arxiv.org/abs/1512.00567",
		"https://aihub.qualcomm.com/models/inception_v3?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		23.8,
		90.9,
		"Images/sheep.PNG",
	),
	(
		"inception_v3_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/inception_v3_quantized",
		"https://huggingface.co/qualcomm/Inception-v3-Quantized",
		"https://arxiv.org/abs/1512.00567",
		"https://aihub.qualcomm.com/models/inception_v3_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		23.9,
		23.3,
		"Images/sheep.PNG"
	),
	(
		"levit",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/levit",
		"https://huggingface.co/qualcomm/LeViT",
		"https://arxiv.org/abs/2104.01136",
		"https://aihub.qualcomm.com/models/levit?domain=Computer+Vision&useCase=Image+Classification",
		"LeViT-128S",
		"224x224",
		7.82,
		29.9,
		"Images/raven.PNG"
	),
	(
		"mnasnet05",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mnasnet05",
		"https://huggingface.co/qualcomm/MNASNet05",
		"https://arxiv.org/abs/1807.11626",
		"https://aihub.qualcomm.com/models/mnasnet05?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		2.21,
		8.45,
		"Images/zebra.PNG"
	),
	(
		"mobile_vit",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mobile_vit",
		"https://huggingface.co/qualcomm/Mobile_Vit",
		"https://arxiv.org/abs/2110.02178",
		"https://aihub.qualcomm.com/models/mobile_vit?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		0,
		0,
		"Images/Dove.PNG"
	),
	(
		"mobilenet_v2",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mobilenet_v2",
		"https://huggingface.co/qualcomm/MobileNet-v2",
		"https://arxiv.org/abs/1801.04381",
		"https://aihub.qualcomm.com/models/mobilenet_v2?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		3.49,
		13.3,
		"Images/raven.PNG"
	),
	(
		"mobilenet_v2_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mobilenet_v2_quantized",
		"https://huggingface.co/qualcomm/MobileNet-v2-Quantized",
		"https://arxiv.org/abs/1801.04381",
		"https://aihub.qualcomm.com/models/mobilenet_v2_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		3.49,
		3.42,
		"Images/raven.PNG"
	),
	(
		"mobilenet_v3_large",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mobilenet_v3_large",
		"https://huggingface.co/qualcomm/MobileNet-v3-Large",
		"https://arxiv.org/abs/1905.02244",
		"https://aihub.qualcomm.com/models/mobilenet_v3_large?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		5.47,
		20.9,
		"Images/train.PNG"
	),
	(
		"mobilenet_v3_large_quantized",
		"https://github.com/quic/ai-hub-models/tree/main/qai_hub_models/models/mobilenet_v3_large_quantized",
		"https://huggingface.co/qualcomm/MobileNet-v3-Large-Quantized",
		"https://arxiv.org/abs/1905.02244",
		"https://aihub.qualcomm.com/models/mobilenet_v3_large_quantized?domain=Computer+Vision&useCase=Image+Classification",
		"Imagenet",
		"224x224",
		5.47,
		5.79,
		"Images/train.PNG"
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
				   model_size=model[8],
				   model_img = model[9],)
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