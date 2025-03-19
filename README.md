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

### Make sure database exists (recommendation: init fresh *.db every time)

```bash
python -m database.database_init
```

### Start up API

```bash
fastapi dev .\api\run_api.py
```

### Open website

cd into dir .\frontend

```bash
python -m http.server -7800
```

Go to http://localhost:PORT
