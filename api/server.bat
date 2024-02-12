@echo off
start cmd /k "cd predictAPI && uvicorn main:app --reload --port 8023"
npm run server