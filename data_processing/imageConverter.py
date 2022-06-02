import os
from PIL import Image
from pathlib import Path

# https://stackoverflow.com/questions/10377998/how-can-i-iterate-over-files-in-a-given-directory 30.08.21
dirName = 'E:/demo_bilder/cs13/take0001/13cs131801'
directory = os.fsencode(dirName)
saveDir = 'E:/demo_converted/cs13_131801/'

# For displaying the process on the screen
i = 1

# Itterating over all recorded pictures
pathlist = Path(dirName).rglob('*.tga')
for path in pathlist:
    path_in_str = str(path)
    filename = path_in_str.split('13cs131801\\')[1]
    if filename.endswith('.tga'):
        print(filename + ' ' + str(i))
        # After each 20000 converted pictuers the folder had to be changed due to access problems
        # if i == 20000:
        #     saveDir = 'E:/demo_converted/cs11_188100/'
        # if i == 40000:
        #     saveDir = 'E:/demo_converted/cs11_228100/'
        # if i == 60000:
        #     saveDir = 'E:/demo_converted/cs11_130000/'
        i = i + 1
        # get the imageNumber
        imageNumber = filename.split('.')[0]
        image = Image.open(dirName + '/' + filename)
        # resize the picture
        imageWidth = 480
        imageHeight = 270
        image = image.resize((imageWidth, imageHeight))
        # rename the picture with the correct number
        imageNumber = int(imageNumber) + 131801 - 109
        # save the picture
        dir = saveDir + 'cs13_' + str(imageNumber) + '.png'
        image.save(dir, 'PNG')
