#!/usr/bin/env python3
"""
Extract thumbnails from videos
Requires: opencv-python (pip install opencv-python)
"""

import os
import sys
from pathlib import Path

def extract_video_thumbnail(video_path, output_path, timestamp_ms=2000):
    """Extract a single frame from a video"""
    try:
        import cv2
    except ImportError:
        print("Error: opencv-python not installed")
        print("Install with: pip install opencv-python")
        return False

    try:
        cap = cv2.VideoCapture(str(video_path))

        # Set position to timestamp (in milliseconds)
        cap.set(cv2.CAP_PROP_POS_MSEC, timestamp_ms)

        ret, frame = cap.read()
        cap.release()

        if ret:
            # Resize to reasonable width while maintaining aspect ratio
            height, width = frame.shape[:2]
            new_width = 1200
            new_height = int(height * (new_width / width))
            frame = cv2.resize(frame, (new_width, new_height), interpolation=cv2.INTER_AREA)

            # Save as PNG
            cv2.imwrite(str(output_path), frame)
            return True
        return False
    except Exception as e:
        print(f"Error processing {video_path}: {e}")
        return False

def main():
    video_dir = Path("static/Video")
    image_dir = Path("static/images")

    if not video_dir.exists():
        print(f"Error: {video_dir} not found")
        sys.exit(1)

    image_dir.mkdir(parents=True, exist_ok=True)

    # Find all MP4 files
    videos = list(video_dir.glob("*.mp4"))
    if not videos:
        print("No videos found")
        return

    print(f"Found {len(videos)} video(s)")

    for video in sorted(videos):
        output = image_dir / f"{video.stem}.png"

        if output.exists():
            print(f"✓ Thumbnail exists: {output.name}")
            continue

        print(f"Extracting: {video.name}")
        if extract_video_thumbnail(video, output):
            print(f"✓ Created: {output.name}")
        else:
            print(f"✗ Failed: {video.name}")

    print("\nDone!")

if __name__ == "__main__":
    main()
