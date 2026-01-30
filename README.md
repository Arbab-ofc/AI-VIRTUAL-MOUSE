# AI-Based Virtual Mouse

AI-Based Virtual Mouse is a full-stack web application that lets users control their computer mouse using real-time hand gesture recognition through a webcam. The backend processes video frames with computer vision and machine learning, and the frontend delivers a modern SaaS-style dashboard for live visualization and control.

## Features
- Real-time hand tracking and gesture classification
- Virtual mouse controls: move, click, double-click, drag, and scroll
- Live camera feed with status overlays
- WebSocket-driven dashboard updates
- Adjustable sensitivity and pause/resume controls
- Responsive, vintage-inspired UI

## Tech Stack
**Frontend**
- React
- Tailwind CSS
- Vite
- WebSocket API

**Backend**
- FastAPI
- OpenCV
- MediaPipe
- PyAutoGUI

## Installation

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Configuration
The backend reads optional environment variables:
- `CAMERA_INDEX` (default: 0)
- `FRAME_WIDTH` (default: 640)
- `FRAME_HEIGHT` (default: 480)
- `TARGET_FPS` (default: 30)
- `SMOOTHING_FACTOR` (default: 0.5)
- `CLICK_COOLDOWN_MS` (default: 300)
- `DETECTION_CONFIDENCE` (default: 0.7)
- `TRACKING_CONFIDENCE` (default: 0.5)
- `FRONTEND_ORIGIN` (default: http://localhost:5173)

The frontend reads optional Vite environment variables:
- `VITE_API_BASE_URL` (default: http://localhost:8000)
- `VITE_WS_BASE_URL` (default: ws://localhost:8000)

## Usage

### Start Backend
```bash
cd backend
python run.py
```

### Start Frontend
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` to access the dashboard.

## Gesture Reference
- **Pointer**: Index finger extended — move cursor
- **Fist**: All fingers closed — idle
- **Open Palm**: All fingers extended — reset cursor
- **Left Click**: Quick index finger tap
- **Right Click**: Quick middle finger tap
- **Double Click**: Two quick index taps
- **Scroll**: Index + middle extended, move vertically
- **Drag**: Pinch thumb and index finger and move

## Troubleshooting
- **Camera not available**: Ensure no other app is using the camera and check browser permissions.
- **Hand not detected**: Improve lighting and keep your hand within the frame.
- **WebSocket disconnects**: Confirm backend is running and reachable.
- **MediaPipe model download**: On first run with Python 3.12, the backend will download the hand landmarker model to `backend/app/assets/hand_landmarker.task`. If you are offline, download it from the MediaPipe model registry and place it at that path.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

## License
MIT License.
