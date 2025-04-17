import qai_hub as hub

import os

config_dir = os.path.expanduser("~/.qai_hub/")
os.makedirs(config_dir, exist_ok=True)

# Set the environment variable
config_file_path = os.path.join(config_dir, "test.ini")
os.environ['QAIHUB_CLIENT_INI'] = config_file_path

# Define the configuration data to write
config_data = """
[api]
api_token = 1f13c1faaab2a15687c8768e4ca14f1331f74b68
api_url = https://app.aihub.qualcomm.com
web_url = https://app.aihub.qualcomm.com
verbose = True
"""

# Write the configuration data to the file
with open(config_file_path, 'w') as config_file:
    config_file.write(config_data)

print(f"Configuration written to {config_file_path}")



print(hub.get_devices())