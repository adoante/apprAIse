## Set up

### First create a virtual environment

```bash
python -m venv .venv
```

### Activate environment (Windows Powershell)

```bash
.\.venv\Scripts\Activate.ps1
```

### Install requirements

```bash
pip install -r requirements
```

## Run app

```bash
fastapi dev .\api\run_api.py
```

## Go to website

[ApprAIse (localhost)](http://127.0.0.1:8000)

## Setting up Docker, AWS EC2 and ECR

1. Create an ECR on AWS Console
    - Go to "View push commands"
	- Keep tab open will need later.
2. Create an EC2 on AWS Console
	- Keep everything the same for Free Tier
    - Download `*.pem` key.
	- Open BASH terminal
	- `chmod 400 *.pem`
3. Connect to EC2 using SSH
    - Go to instance and check SSH command by clicking on "Connect"
	- Enter CMD into BASH terminal
4. Update instance
    - `sudo yum update -y`
5. Install Docker
    - `sudo yum install -y docker`
6. Start Docker service
    - `sudo service docker start`
7. Add the ec2-user to the docker group
   - `sudo usermod -a -G docker ec2-user`
8. Reboot instance for above command to take effect
   - Use AWS console, "Instance State", "Reboot instance"
   - Connect to Instance again using SSH
9. Authenticate AWS CLI on local terminal
   - Download AWS CLI 
   - Create an IAM User with proper permission (I just did the admin all one)
   - Go to tab "Security credentials"
   - Scroll down and click "Create access key"
   - Download access keys to CSV
   - Open ANOTHER BASH terminal
   - `aws configure`
   - Using the downloaded CSV enter credentials
10. Authenticate local Docker with your ECR
   - See step 1 for this command
   - `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR ID>.dkr.ecr.us-east-1.amazonaws.com`
11. Build local docker image
   - See step 1 for this command
   - `docker build -t appraise .`
12. Tag the image
   - See step 1 for this command
   - `docker tag appraise:latest <YOUR ID>.dkr.ecr.us-east-1.amazonaws.com/appraise:latest`
13. Push to ECR
   - See step 1 for this command
   - `docker push <YOUR ID>.dkr.ecr.us-east-1.amazonaws.com/appraise:latest`
14. Authenticate EC2 with AWS CLI credentials
   - Back to the BASH terminal with the Instance SHH
   - `aws configure`
   - Using the downloaded CSV enter credentials
15. Pull image from ECR
   - Reload the ECR tab and click on "latest"
   - Copy URI
16. Authenticate Docker in the Instance SSH
   - See step 10 for command
16. Back to the terminal with the Instance SSH
   - docker pull <URI>
17. Get the <IMAGE_ID>
   - `docker images`
18. Go to your instance in the EC2 dashboard
   - click on it
   - go to the Security tab
   - click on your security group
   - click Edit inbound rules
   - add a new rule
   - select all traffic
   - add a new rule
   - port 80 with 0.0.0.0/0
   - add a new rule
   - port 433 with 0.0.0.0/0
19. Create Caddyfile
   - `vim Caddyfile`
   - type `domain.com {reverse_proxy appraise:8000}`
20. Run `docker_reset.sh`
   - Use this script on the EC2!
   - `chmod +x docker_reset.sh`
   - `./docker_reset.sh`
   - The script will prompt you for the <IMAGE_ID> 
21. That's it! Unless you ran into error. I can't help with that.