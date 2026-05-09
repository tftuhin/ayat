#!/bin/bash

# Extract thumbnails from videos for use as poster images
# Requires: ffmpeg

VIDEO_DIR="static/Video"
IMAGE_DIR="static/images"
TIMESTAMP="00:00:02"  # Extract frame at 2 seconds

# Create images directory if it doesn't exist
mkdir -p "$IMAGE_DIR"

# Loop through all MP4 files
for video in "$VIDEO_DIR"/*.mp4; do
  if [ -f "$video" ]; then
    # Get video filename without extension
    filename=$(basename "$video" .mp4)
    output_image="$IMAGE_DIR/${filename}.png"

    # Skip if thumbnail already exists
    if [ -f "$output_image" ]; then
      echo "✓ Thumbnail exists: $output_image"
      continue
    fi

    # Extract frame using ffmpeg
    if command -v ffmpeg &> /dev/null; then
      echo "Extracting thumbnail: $filename"
      ffmpeg -i "$video" -ss "$TIMESTAMP" -vframes 1 -vf "scale=1200:-1" -q:v 2 "$output_image" 2>/dev/null
      if [ $? -eq 0 ]; then
        echo "✓ Created: $output_image"
      else
        echo "✗ Failed to extract: $filename"
      fi
    else
      echo "✗ ffmpeg not found. Install it to extract thumbnails."
      exit 1
    fi
  fi
done

echo "Thumbnail extraction complete!"
