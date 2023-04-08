# import libraries and modules
import os
import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mp
import easygui
import tkinter as tk
from tkinter import filedialog
from tkinter import *
from PIL import ImageTk, Image
from flask import Flask, request, jsonify


# exception raised for display error (developer convenience)
if os.environ.get('DISPLAY','') == '':
    print('no display found. Using :0.0')
    os.environ.__setitem__('DISPLAY', ':0.0')
    mp.use('TkAgg')
 
# image file will be uploaded using javascript
       
# reading input file
def read_file(filename):
    image = cv2.imread(filename)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    """
        cv2.imshow('My Image',image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    """
    return image

# Generating Edge Mask of the image (to identify edges of the image and highlight them)
def edge_mask(image, line_size, blur_value):
    """Here we scale the input image and obtain its edge mask"""
    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # medaianBlur(source, dest, kernel size)
    gray_blur = cv2.medianBlur(gray_image, blur_value)
    
    # adaptiveThreshold(src,dst,maxValue,adaptiveMethod,thresholdType, blockSize, C)
    # adaptive methods : ADAPTIVE_THRESH_MEAN_C & ADAPTIVE_THRESH_GAUSSIAN_C
    # threshold type: variable of integer type representing the type of threshold to be used
    edges = cv2.adaptiveThreshold(gray_blur,255,cv2.ADAPTIVE_THRESH_MEAN_C,
                                  cv2.THRESH_BINARY, line_size, blur_value)
    
    return edges


# Reducing the Color Palette 
def color_quantization (image, k):
    """
        Color Quantization is the process of reducing the number of colors in an image while preserving its visual appearance.
        'K' value indicate the number of colors in the input image
    """    
    # Transform the image into 1D array of 32bit floating point numbers, then reshape it into 2D array
    data = np.float32(image).reshape((-1, 3))
    
    # np.float32() provides advantages in terms of memory usage, computation speed, and consistency across platforms compared to Python float
    # reshape((-1,3)), here -1 indicate size of that dimension should be automatically calculated based on size of input array & other specified dimension(3 here).
    # resultant data can be used as input to color quantization algorithm, to group similar colors and reduce no. of distinct colors
    
    # Determine criteria for termination of iterative algorithms
    # We use a combination of two criteria: max no. of iterations & min. change in parameters being optimized
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
    
    # cv2.TERM_CRITERIA_EPS - specifies that alorithm should stop iterating if the specified accuracy or tolerance is achieved
    # cv2.TERM_CRITERIA_MAX_ITER - specifies that algorithm should stop iterating if max. no. of iterations reached
     
    # Implementing K-Means
    ret, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    result = center[label.flatten()]
    result = result.reshape(image.shape)
    return result 



def cartoonize(filename):
    """ to cartoonify the input image"""
    original_image = read_file(filename)
    
    image = np.copy(original_image)
    
    # to confirm if the image is chosen
    if original_image is None:
        print("Can not find any image. Choose appropriate file")
        sys.exit()
        
    # Step 1: Generate Edge Mask of the image (to identify edges of the image and highlight them)
    edges_image = edge_mask(image, line_size=7, blur_value=3)
    
    # Step 2: Reduce the Color Palette 
    image = color_quantization(image, k=8)
    
    # Step 3: Apply Bilateral Filter to reduce noise while preserving edges
    # modified as per my convenience
    blurred = cv2.bilateralFilter(image, d=3, sigmaColor=250,sigmaSpace=250)
    
    # Step 4: Combine the edge mask with the color image using bitwise and operator to generate final cartoon image
    cartoon_image = cv2.bitwise_and(blurred, blurred, mask=edges_image)
