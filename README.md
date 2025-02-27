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

Two branches
- Master: Plain HTML and JS
- react-nextjs-chakraUI-frontend: Using react
  - Have to modify the ButtonAPI.jsx file's API Link to get different data (for right now)

## Set up `react-nextjs-chakraUI-frontend` branch

Follow everything before and then install [node.js](https://nodejs.org/en)

Install requirements inside dir `./react-nextjs-chakra`

```bash
npm install
```

## Run app

Start up API

```bash
fastapi dev .\api\api.py
```

For `master` branch
- just open the `./index.html` file in dir `./frontend`

For `react-nextjs-chakraUI-frontend` branch

```bash
npm run dev
```
