#!/usr/bin/env python3
"""Create a simple test image for ImageBot testing."""

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("PIL not found, trying cv2...")
    import cv2
    import numpy as np
    
    # Create image with cv2
    img = np.zeros((200, 200, 3), dtype=np.uint8)
    img[:, :] = (255, 255, 255)  # White background
    
    # Draw a leaf-like shape (green ellipse)
    cv2.ellipse(img, (100, 100), (30, 60), 30, 0, 360, (39, 174, 96), -1)
    
    # Add disease spots (brown)
    cv2.circle(img, (90, 80), 8, (25, 25, 112), -1)
    cv2.circle(img, (110, 110), 6, (25, 25, 112), -1)
    
    # Save the image (cv2 uses BGR format)
    cv2.imwrite('c:/Users/Mujahid Islam/Desktop/test-crop.png', img)
    print("Test image created with cv2")
else:
    # Create image with PIL
    width, height = 200, 200
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw a leaf shape (green ellipse)
    draw.ellipse([70, 40, 130, 160], fill='#27ae60')
    
    # Add disease spots (brown)
    draw.ellipse([90, 80, 105, 95], fill='#8b4513')
    draw.ellipse([110, 110, 122, 122], fill='#8b4513')
    
    # Save the image
    img.save('c:/Users/Mujahid Islam/Desktop/test-crop.png')
    print("Test image created with PIL")
