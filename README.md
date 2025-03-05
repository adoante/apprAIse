## Set up

First create a virtual environment

```bash
python -m venv .venv
```

Activate environment (Windows Powershell)

```bash
.\.venv\Scripts\Activate.ps1
```

Install requirements

```bash
pip install -r requirements
```

## Run app

Start up API

```bash
fastapi dev .\api\api.py
```

Open website

just open the `./index.html` file in dir `./frontend`
