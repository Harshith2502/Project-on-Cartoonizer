import cv2

# Load the image
img = cv2.imread('C:/Users/Harshith Nukarapu/Desktop/Mini project/cartoonize/image8.jpeg')

# Convert the image to grayscale
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Invert the grayscale image
inv_gray_img = 255 - gray_img

# Apply a Gaussian blur to the inverted image
blur_img = cv2.GaussianBlur(inv_gray_img, (21, 21), 0)

# Blend the grayscale image with the blurred image using the color dodge blend mode
sketch_img = cv2.divide(gray_img, 255 - blur_img, scale=256)

# Save the sketch image
cv2.imwrite('C:/Users/Harshith Nukarapu/Desktop/Mini project/cartoonize/outputsketch3.jpg', sketch_img)